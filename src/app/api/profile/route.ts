import { NextResponse } from "next/server";
import pool from "../lib/db";
import { getCurrentUser } from "../lib/auth";

export const dynamic = "force-dynamic"; // <-- add this

export async function GET(){
    try{
        const user = await getCurrentUser()
        const userId = Number(user?.userID)
        const {rows} = await pool.query("SELECT * FROM users WHERE id = $1",[userId])

        return NextResponse.json(rows[0])
    }catch(error: unknown){
        return NextResponse.json(
            {error: error},
            {status: 500}
        )
    }
}

export async function PATCH(request: Request){
    try{
    const body = await request.json()
    const {displayname, profile_pic, phone, id} = body;
    await pool.query("UPDATE users SET displayname = $1, profile_pic = $2, phone = $3 WHERE id = $4",[displayname, profile_pic, phone, id])
    return NextResponse.json(
        {message: "Update Successful"},
        {status: 200}
    )
    }catch(error: unknown){
        return NextResponse.json(
            {error: error},
            {status: 500}
        )
    }
}