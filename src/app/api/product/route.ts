import pool from '@/service/database';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            action,
            id,
            product_name,
            price,
            product_image,
            category,
            discount,
        } = body;

        const pg = await pool.connect();

        if (!action) {
            return NextResponse.json(
                { message: 'Action is required', status: 400 },
                { status: 400 }
            );
        }

        if (action === 'create') {
            const response = await pg.query(
                `INSERT INTO public.products (product_name, price, product_image, category, discount) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [product_name, price, product_image, category, discount]
            );
            return NextResponse.json(
                {
                    message: 'Product created successfully',
                    data: response.rows,
                },
                { status: 201 }
            );
        } else if (action === 'getProductDetails') {
            const response = await pg.query(
                `SELECT * FROM public.products WHERE id = $1`,
                [id]
            );
            if (!response.rows.length) {
                return NextResponse.json(
                    { message: 'Product not found', status: 404 },
                    { status: 404 }
                );
            }
            return NextResponse.json(
                {
                    message: 'Product details fetched successfully',
                    data: response.rows[0],
                },
                { status: 200 }
            );
        } else if (action === 'findByCategories') {
            const response = await pg.query(
                `SELECT * FROM public.products WHERE category_id = $1`,
                [category]
            );
            return NextResponse.json(
                {
                    message: 'Products by category fetched successfully',
                    data: response.rows,
                },
                { status: 200 }
            );
        } else if (action === 'findByDiscountedProducts') {
            const response = await pg.query(
                `SELECT * FROM public.products WHERE code_id IS NOT NULL`
            );
            return NextResponse.json(
                {
                    message: 'Discounted products fetched successfully',
                    data: response.rows,
                },
                { status: 200 }
            );
        } else if (action === 'getProducts') {
            const response = await pg.query('SELECT * FROM public.products');
            return NextResponse.json({
                message: 'post fetched succesfully',
                data: response.rows,
            });
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
