import { collection, doc, getDoc } from "firebase/firestore";
import db from "@/firebase";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    try {
        const docRef = doc(collection(db, "users"), userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return NextResponse.json(docSnap.data().flashcards || []);
        } else {
            return NextResponse.json(
                { error: "No flashcards found" },
                { status: 404 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to retrieve flashcards" },
            { status: 500 }
        );
    }
}
