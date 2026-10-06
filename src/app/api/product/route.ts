import { NextResponse } from "next/server";
import pool from "../lib/db";
import { getCurrentUser } from "../lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const query = userId
      ? "SELECT * FROM products WHERE user_id = $1 ORDER BY id DESC"
      : "SELECT * FROM products ORDER BY id DESC";
    const params = userId ? [userId] : [];

    const { rows } = await pool.query(query, params);
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
    type Profile = {
        id: string;
        created_at: string;
        username: string;
        school: string;
        email: string;
        password: string;
        profile_pic: string;
        displayname: string;
};
  try {
    const info = await getCurrentUser();
    const id = Number(info?.userID);

    if (!id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    const body = await request.json();
    const { title, description, image, category, price } = body;

    if (
      !title ||
      !description ||
      !image ||
      !category ||
      price === undefined ||
      price === null ||
      Number(price) <= 0
    ) {
      return NextResponse.json(
        { message: "Fill in all details with a valid price" },
        { status: 400 }
      );
    }

    await pool.query(
      "INSERT INTO products(title, description, img, category, school, price, user_id) VALUES($1, $2, $3, $4, $5, $6, $7)",
      [title, description, image, category, user?.school, Number(price), id]
    );

    return NextResponse.json(
      { message: "Product Created" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
