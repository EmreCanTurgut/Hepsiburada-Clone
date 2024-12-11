import pool from '@/service/database';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, surname } = body;

        const pg = await pool.connect();
        // const response = await pg.query("select * from public.user")
        const response = await pg.query(
            'INSERT INTO public.user (id,name, surname,location,money,job) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [8,name, surname, 'location', 0, 'job']
        );

        console.log(response.rows);

        if (!name || !surname) {
            return NextResponse.json(
                { message: 'Name and surname are required', status: 400 },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                message: 'User registered successfully',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error in registration:', error);
        return NextResponse.json(
            {
                message: 'Something went wrong',
                error: error || 'Unknown error',
            },
            { status: 500 }
        
        );
    }
}
