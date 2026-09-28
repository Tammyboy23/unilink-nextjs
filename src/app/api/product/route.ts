import { NextResponse } from "next/server";

export async function GET(){
    const products = [
        { id: 1, title: "Calculus Textbook", price: 25 },
        { id: 2, title: "TI-84 Calculator", price: 60 },
    ];

    return NextResponse.json(products)
}