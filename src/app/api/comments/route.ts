import pool from "@/service/database";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, id, customer_id, comment_text, product_id } = body;

    const pg = await pool.connect();

    if (!action) {
      return NextResponse.json(
        { message: "Action is required", status: 400 },
        { status: 400 }
      );
    }

    if (action === "findProductComments") {
      const response = await pg.query(
        `SELECT * FROM public.comments WHERE product_id = $1`,
        [product_id]
      );
      return NextResponse.json(
        {
          message: "Comments fetched successfully",
          data: response.rows,
        },
        { status: 200 }
      );
    } else if (action === "findCustomerComments") {
      const response = await pg.query(
        `SELECT * FROM public.comments WHERE customer_id = $1`,
        [customer_id]
      );
      return NextResponse.json(
        {
          message: "Customer comments fetched successfully",
          data: response.rows,
        },
        { status: 200 }
      );
    } else if (action === "findComment") {
      const response = await pg.query(
        `SELECT * FROM public.comments WHERE id = $1`,
        [id]
      );
      if (!response.rows.length) {
        return NextResponse.json(
          { message: "Comment not found", status: 404 },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Comment fetched successfully", data: response.rows[0] },
        { status: 200 }
      );
    } else if (action === "createComment") {
      const response = await pg.query(
        `INSERT INTO public.comments (customer_id, comment_text, product_id) 
         VALUES ($1, $2, $3) RETURNING *`,
        [customer_id, comment_text, product_id]
      );
      return NextResponse.json(
        {
          message: "Comment created successfully",
          data: response.rows[0],
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Unknown action", status: 400 },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error || "Unknown error",
      },
      { status: 500 }
    );
  }
}
