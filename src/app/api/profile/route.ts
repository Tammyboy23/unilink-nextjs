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
    }catch(error: any){
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}

export async function PATCH(request: Request){
    try{
    const body = await request.json()
    const {displayname, profile_pic, id} = body;
    await pool.query("UPDATE users SET displayname = $1, profile_pic = $2 WHERE id = $3",[displayname, profile_pic, id])
    }catch(error: any){
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}