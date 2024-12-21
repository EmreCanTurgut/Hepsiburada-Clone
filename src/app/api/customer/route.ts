import pool from '@/service/database';
import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

function getUserIdFromToken(req: NextRequest): {
    valid: boolean;
    userId?: number;
    message?: string;
} {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { valid: false, message: 'No token provided' };
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
        return { valid: true, userId: decoded.id };
    } catch (error) {
        return { valid: false, message: 'Invalid or expired token' };
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, name, email, password, newPassword, phone } = body;

        const pg = await pool.connect();

        if (!action) {
            return NextResponse.json(
                { message: 'Action is required', status: 400 },
                { status: 400 }
            );
        }

        if (action === 'register') {
            const response = await pg.query(
                `INSERT INTO public.customer (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *`,
                [name, email, password, phone]
            );
            return NextResponse.json(
                {
                    message: 'User registered successfully',
                    data: response.rows,
                },
                { status: 201 }
            );
        }

        if (action === 'login') {
            const response = await pg.query(
                `SELECT * FROM public.customer WHERE email = $1 AND password = $2`,
                [email, password]
            );

            if (response.rows.length === 0) {
                return NextResponse.json(
                    { message: 'Invalid email or password', status: 401 },
                    { status: 401 }
                );
            }

            const user = response.rows[0];
            delete user.password;

            const token = jwt.sign(
                { id: user.id, email: user.email },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            return NextResponse.json({
                message: 'Login successful',
                data: user,
                token,
                status: 200,
            });
        }

        const tokenValidation = getUserIdFromToken(req);
        if (!tokenValidation.valid) {
            return NextResponse.json(
                { message: tokenValidation.message, status: 401 },
                { status: 401 }
            );
        }

        const userId = tokenValidation.userId;

        if (action === 'update') {
            const response = await pg.query(
                `UPDATE public.customer
                 SET name = COALESCE($1, name),
                     email = COALESCE($2, email),
                     phone = COALESCE($3, phone)
                 WHERE id = $4
                 RETURNING *`,
                [name, email, phone, userId]
            );

            if (response.rows.length === 0) {
                return NextResponse.json(
                    { message: 'User not found', status: 404 },
                    { status: 404 }
                );
            }

            return NextResponse.json(
                { message: 'User updated successfully', data: response.rows },
                { status: 200 }
            );
        }

        if (action === 'delete') {
            const response = await pg.query(
                `DELETE FROM public.customer WHERE id = $1 RETURNING *`,
                [userId]
            );
            return NextResponse.json(
                { message: 'User deleted successfully', data: response.rows },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: 'Unknown action', status: 400 },
            { status: 400 }
        );
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            {
                message: 'Something went wrong',
                error: error || 'Unknown error',
            },
            { status: 500 }
        );
    }
}
