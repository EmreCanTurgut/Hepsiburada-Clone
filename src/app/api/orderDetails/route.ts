import pool from "@/service/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, order_id, product_id, quantity, price } = body;

    const pg = await pool.connect();

    if (!action) {
      return NextResponse.json(
        { message: "Action is required", status: 400 },
        { status: 400 }
      );
    }

    if (action === "findOrderDetails") {
      const response = await pg.query(
        `SELECT * FROM public.order_details WHERE order_id = $1`,
        [order_id]
      );
      return NextResponse.json(
        {
          message: "Order details fetched successfully",
          data: response.rows,
        },
        { status: 200 }
      );
    } else if (action === "addProduct") {
      const productInfo = await pg.query(
        `SELECT p.price, dc.discount_rate, p.product_name
         FROM public.products p
         LEFT JOIN public.discount_codes dc ON p.code_id = dc.code_id
         WHERE p.id = $1`,
        [product_id]
      );

      let {
        price: basePrice,
        discount_rate: discountRate,
        product_name,
      } = productInfo.rows[0];

      if (discountRate) {
        basePrice = basePrice * (1 - discountRate);
      }

      const response = await pg.query(
        `INSERT INTO public.order_details (order_id, product_id, quantity, price, product_name)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (order_id, product_id)
         DO UPDATE SET
           quantity = public.order_details.quantity + $3,
           price = public.order_details.price + $4
         RETURNING *`,
        [order_id, product_id, quantity, basePrice, product_name]
      );

      return NextResponse.json(
        { message: "Product added to cart", data: response.rows[0] },
        { status: 201 }
      );
    } else if (action === "updateCart") {
      const existingOrderDetail = await pg.query(
        `SELECT * FROM public.order_details WHERE order_id = $1 AND product_id = $2`,
        [order_id, product_id]
      );

      if (existingOrderDetail.rows.length > 0) {
        await pg.query(
          `UPDATE public.order_details
           SET quantity = quantity + $1,
               price = price * quantity
           WHERE order_id = $2 AND product_id = $3`,
          [quantity, order_id, product_id]
        );
      } else {
        await pg.query(
          `INSERT INTO public.order_details (order_id, product_id, quantity, price)
           VALUES ($1, $2, $3, $4)`,
          [order_id, product_id, quantity, price]
        );
      }

      return NextResponse.json(
        { message: "Cart updated successfully" },
        { status: 200 }
      );
    } else if (action === "deleteOrderDetails") {
      await pg.query(`DELETE FROM public.order_details WHERE order_id = $1`, [
        order_id,
      ]);
      return NextResponse.json(
        { message: "Order details deleted successfully" },
        { status: 200 }
      );
    } else if (action === "deleteProductFromCart") {
      const response = await pg.query(
        `UPDATE public.order_details
         SET quantity = quantity - 1
         WHERE product_id = $1 AND quantity > 1
         RETURNING *`,
        [product_id]
      );

      if (!response.rows.length) {
        await pg.query(
          `DELETE FROM public.order_details
           WHERE product_id = $1 AND quantity = 1`,
          [product_id]
        );
      }

      return NextResponse.json(
        {
          message: "Product removed from cart",
          data: response.rows[0] || null,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Unknown action", status: 400 },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
