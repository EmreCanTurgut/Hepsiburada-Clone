import pool from "@/service/database";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, customer_id, comment_id } = body;

    const pg = await pool.connect();

    if (!action) {
      return NextResponse.json(
        { message: "Action is required", status: 400 },
        { status: 400 }
      );
    }

    if (action === "postLike") {
      const response = await pg.query(
        `INSERT INTO public.likes (customer_id, comment_id) VALUES ($1, $2) RETURNING *`,
        [customer_id, comment_id]
      );
      return NextResponse.json(
        { message: "Like added successfully", data: response.rows[0] },
        { status: 201 }
      );
    } else if (action === "deleteLike") {
      await pg.query(
        `DELETE FROM public.likes WHERE customer_id = $1 AND comment_id = $2`,
        [customer_id, comment_id]
      );
      return NextResponse.json(
        { message: "Like removed successfully" },
        { status: 200 }
      );
    } else if (action === "countLikes") {
      const response = await pg.query(
        `SELECT COUNT(*) AS like_count FROM public.likes WHERE comment_id = $1`,
        [comment_id]
      );
      return NextResponse.json(
        { message: "Like count fetched successfully", data: response.rows[0] },
        { status: 200 }
      );
    } else if (action === "getMaxLikedComment") {
      const response = await pg.query(
        `SELECT C.*, COUNT(L.id) AS like_count
         FROM public.comments C
         LEFT JOIN public.likes L ON C.id = L.comment_id
         GROUP BY C.id
         ORDER BY like_count DESC
         LIMIT 1`
      );
      if (!response.rows.length) {
        return NextResponse.json(
          { message: "No comments found", status: 404 },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          message: "Most liked comment fetched successfully",
          data: response.rows[0],
        },
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
