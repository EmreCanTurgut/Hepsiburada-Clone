import pool from '@/service/database';
import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

function getCustomerIdFromToken(req: NextRequest): {
    valid: boolean;
    customerId?: number;
    message?: string;
} {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { valid: false, message: 'No token provided' };
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
        return { valid: true, customerId: decoded.id };
    } catch (error) {
        return { valid: false, message: 'Invalid or expired token' };
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, cart_id, product_id, quantity, coupon_code } = body;

        const pg = await pool.connect();

        if (!action) {
            return NextResponse.json(
                { message: 'Action is required', status: 400 },
                { status: 400 }
            );
        }

        const tokenValidation = getCustomerIdFromToken(req);
        if (!tokenValidation.valid) {
            return NextResponse.json(
                { message: tokenValidation.message, status: 401 },
                { status: 401 }
            );
        }
        const customer_id = tokenValidation.customerId;

        if (action === 'addToCart') {
            const response = await pg.query(
                `INSERT INTO public.cart (cart_id, product_id, quantity, customer_id)
                 VALUES ($1, $2, $3, $4) RETURNING *`,
                [cart_id, product_id, quantity, customer_id]
            );
            return NextResponse.json(
                { message: 'Product added to cart', data: response.rows[0] },
                { status: 201 }
            );
        } else if (action === 'viewCart') {
            const response = await pg.query(
                `SELECT * FROM public.cart WHERE customer_id = $1`,
                [customer_id]
            );
            if (!response.rows.length) {
                return NextResponse.json(
                    { message: 'Cart is empty', status: 404 },
                    { status: 404 }
                );
            }

            let total = response.rows.reduce(
                (sum, item) => sum + item.quantity * item.price,
                0
            );
            let discount = 0;

            if (coupon_code === 'SEPETTE100') {
                discount = 100;
                total = Math.max(0, total - discount);
            }

            if (coupon_code === 'SEPETTE50') {
                discount = 50;
                total = Math.max(0, total - discount);
            }

            return NextResponse.json(
                {
                    message: 'Cart fetched successfully',
                    data: response.rows,
                    total: total,
                    discount: discount,
                },
                { status: 200 }
            );
        } else if (action === 'updateCart') {
            const response = await pg.query(
                `UPDATE public.cart SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *`,
                [quantity, cart_id, product_id]
            );
            return NextResponse.json(
                {
                    message: 'Cart updated successfully',
                    data: response.rows[0],
                },
                { status: 200 }
            );
        } else if (action === 'removeFromCart') {
            await pg.query(
                `DELETE FROM public.cart WHERE cart_id = $1 AND product_id = $2`,
                [cart_id, product_id]
            );
            return NextResponse.json(
                { message: 'Product removed from cart' },
                { status: 200 }
            );
        } else if (action === 'clearCart') {
            await pg.query(`DELETE FROM public.cart WHERE customer_id = $1`, [
                customer_id,
            ]);
            return NextResponse.json(
                { message: 'Cart cleared successfully' },
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
