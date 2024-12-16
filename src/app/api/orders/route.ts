import pool from "@/service/database";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, id, customer_id, order_id } = body;

    const pg = await pool.connect();

    if (!action) {
      return NextResponse.json(
        { message: "Action is required", status: 400 },
        { status: 400 }
      );
    }

    if (action === "findOrderExist") {
      const response = await pg.query(
        `SELECT * FROM public.orders WHERE id = $1`,
        [order_id]
      );
      if (!response.rows.length) {
        return NextResponse.json(
          { message: "Order not found", status: 404 },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Order found", data: response.rows[0] },
        { status: 200 }
      );
    } else if (action === "findByOrders") {
      const response = await pg.query(
        `SELECT * FROM public.orders WHERE customer_id = $1`,
        [customer_id]
      );
      if (!response.rows.length) {
        return NextResponse.json(
          { message: "No orders found for this customer", status: 404 },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Orders fetched successfully", data: response.rows },
        { status: 200 }
      );
    } else if (action === "createOrder") {
      const response = await pg.query(
        `INSERT INTO public.orders (customer_id) VALUES ($1) RETURNING *`,
        [customer_id]
      );
      return NextResponse.json(
        { message: "Order created successfully", data: response.rows[0] },
        { status: 201 }
      );
    } else if (action === "deleteOrder") {
      await pg.query(`DELETE FROM public.orders WHERE id = $1`, [id]);
      return NextResponse.json(
        { message: "Order deleted successfully" },
        { status: 200 }
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
