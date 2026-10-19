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
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error || "Something went wrong" },
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
    const { title, description, image, category, price, phone } = body;
    const trimmedPhone = String(phone ?? "").trim();

    if (
      !title ||
      !description ||
      !image ||
      !category ||
      price === undefined ||
      price === null ||
      !trimmedPhone ||
      Number(price) <= 0 ||
      trimmedPhone.replace(/\D/g, "").length < 7
    ) {
      return NextResponse.json(
        { message: "Fill in all details with a valid price and phone number" },
        { status: 400 }
      );
    }

    await pool.query(
      "INSERT INTO products(title, description, img, category, school, price, user_id, phone) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
      [title, description, image, category, user?.school, Number(price), id, trimmedPhone]
    );

    return NextResponse.json(
      { message: "Product Created" },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err || "Something went wrong" },
      { status: 500 }
    );
  }
}


export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    const userId = Number(user?.userID);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const productId = Number(body?.productId);
    const title = String(body?.title ?? "").trim();
    const description = String(body?.description ?? "").trim();
    const image = String(body?.image ?? "").trim();
    const category = String(body?.category ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const price = Number(body?.price);

    if (
      !Number.isInteger(productId) ||
      productId <= 0 ||
      !title ||
      !description ||
      !image ||
      !category ||
      !phone ||
      phone.replace(/\D/g, "").length < 7 ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      return NextResponse.json(
        { message: "Provide complete listing details with a valid price and phone number." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "UPDATE products SET title = $1, description = $2, img = $3, category = $4, price = $5, phone = $6 WHERE id = $7 AND user_id = $8 RETURNING id",
      [title, description, image, category, price, phone, productId, userId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "Listing not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Listing updated successfully." });
  } catch (error: unknown) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Something went wrong while updating the listing." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    const userId = Number(user?.userID);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const productId = Number(body?.productId);

    if (!Number.isInteger(productId) || productId <= 0) {
      return NextResponse.json(
        { message: "A valid product ID is required." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 AND user_id = $2 RETURNING id",
      [productId, userId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "Listing not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Listing deleted successfully." });
  } catch (error: unknown) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Something went wrong while deleting the listing." },
      { status: 500 }
    );
  }
}