import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "../../lib/db";
import jwt from "jsonwebtoken";

export async function POST(request: Request){
    try{
    const body = await request.json()
    const {email, password} = body

    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1",[email])
    if(rows.length == 0 ){
        return NextResponse.json(
            {message: "Account doesnt exist"},
            {status: 401}
        )
    };

    const user = rows[0]
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        return NextResponse.json(
            {message: "Incorrect Password"},
            {status: 401}
        )
    }
    return NextResponse.json(
        {userID: user.id},
        {status: 200}
    )



    }catch(error: any){
        return NextResponse.json(
            {error: error.message},
            {status: 501}
        )
    }
}