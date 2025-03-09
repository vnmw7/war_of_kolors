import { auth } from "../../../../lib/auth";
import supabase from "../../../../lib/db/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // const { potionnName, quantity } = body;
    // Get user session server-side
    const session = await auth();
    const user_id = session?.user?.user_id;

    console.log("Session user_id: " + user_id);
    if (!user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("User " + user_id);
    const { data: user, error: ownerError } = await supabase
      .from("users_tbl")
      .select("id")
      .eq("user_id", user_id)
      .limit(1)
      .single();

    if (ownerError) {
      return NextResponse.json({ error: ownerError.message }, { status: 500 });
    }

    // fetch current inventory
    console.log("Searching for potions with owner_id: " + user.id);
    const { data: potions, error } = await supabase
      .from("potions_tbl")
      .select("*")
      .eq("owner_id", user.id)
      .limit(1)
      .single();

    if (!potions) {
      return NextResponse.json({ error: "No potions found" }, { status: 404 });
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Potions: ", potions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get inventory" },
      { status: 500 },
    );
  }
}
