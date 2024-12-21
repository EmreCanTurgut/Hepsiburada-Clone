import pool from '@/service/database';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, name, email, password, newPassword, phone, userId } =
            body;

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
        } else if (action === 'delete') {
            const response = await pg.query(
                `DELETE FROM public.customer WHERE id = $1 RETURNING *`,
                [userId]
            );
            return NextResponse.json(
                { message: 'User deleted successfully', data: response.rows },
                { status: 200 }
            );
        } else if (action === 'findByEmail') {
            const response = await pg.query(
                `SELECT * FROM public.customer WHERE email = $1`,
                [email]
            );
            return NextResponse.json(
                { message: 'User found', data: response.rows },
                { status: 200 }
            );
        } else if (action === 'updatePasswd') {
            const result = await pg.query(
                `UPDATE public.customer
         SET password = $1
         WHERE email = $2 AND password = $3
         RETURNING *`,
                [newPassword, email, password]
            );
            return NextResponse.json(
                { message: 'Password updated successfully', data: result.rows },
                { status: 200 }
            );
        } else if (action === 'login') {
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

            return NextResponse.json(
                { message: 'Login successful', data: user },
                { status: 200 }
            );
        } else if (action === 'update') {
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
        } else {
            return NextResponse.json(
                { message: 'Unknown action', status: 400 },
                { status: 400 }
            );
        }
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
