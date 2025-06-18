import { auth, signOut } from "@/auth";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await signOut();
    return redirect("/login");
}