import { NextResponse } from "next/server";
import pool from "../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request){
    try{
    const body = await request.json()
    const {email, username, school, password} = body

    if(!email && !password){
        return NextResponse.json(
            {error: "Email & Password is required"},
            {status: 401}
        )
    }
    const existed = await pool.query("SELECT * FROM users WHERE email = $1",[email])
    if (existed.rows.length > 0){
        return NextResponse.json(
            {error: "Account Already Exists "},
            {status: 401}
        )
    }
    const hashed = await bcrypt.hash(password, 10)
    await pool.query(
        "INSERT INTO users (email, username, school, password) VALUES($1, $2, $3, $4)",[email, username, school, hashed]
    )
    return NextResponse.json(
        {message: "Account Created"},
        {status: 201}
    )
    }
    catch(error: any){
        return NextResponse.json(
            {error: error.message},
            {status: 401}
        )
    }

}