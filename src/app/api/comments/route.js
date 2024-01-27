import { NextResponse } from "next/server";
import LOGGER from "@/utils/logger";

// GET ALL COMMENTS OF A POST
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const postSlug = searchParams.get("postSlug");

  try {
    const comments = []

    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A COMMENT
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const comment = {}

    return new NextResponse(JSON.stringify(comment, { status: 200 }));
  } catch (err) {
    LOGGER.error("Error occured while fetching comments", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
