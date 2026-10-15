import { NextResponse } from "next/server";
import pool from "../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {productId, rating} = body

    // if (!Number.isFinite(productId) || productId <= 0) {
    //   return NextResponse.json(
    //     { message: "A valid product ID is required." },
    //     { status: 400 }
    //   );
    // }

    // if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    //   return NextResponse.json(
    //     { message: "Rating must be between 1 and 5." },
    //     { status: 400 }
    //   );
    // }


     const {rows} = await pool.query("SELECT * FROM products WHERE id = $1",[productId])
     const product = rows[0]
     const total_rating = product.total_rating
     const no_rating = product.no_rating
     const new_total_rating = total_rating + rating
     const new_no_rating = no_rating + 1
    
    await pool.query("UPDATE products SET total_rating = $1, no_rating = $2 WHERE id = $3",[Number(new_total_rating), Number(new_no_rating), Number( productId)])
    return NextResponse.json(
      { message: "Rating submitted successfully.", productId, rating , new_total_rating, new_no_rating},
      { status: 200 }
    );
  } catch(error: unknown) {
    return NextResponse.json(
      { message: error },
      { status: 500 }
    );
  }
}