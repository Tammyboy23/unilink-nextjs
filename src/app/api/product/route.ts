import { NextResponse } from "next/server";
import pool from "../lib/db";

export async function GET(){

    try {
    const { rows } = await pool.query("SELECT * FROM products");
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
    try{
    const body = await request.json();
    const  {} = body;
    }catch(error: any){
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
    
}

