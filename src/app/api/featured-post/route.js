import { NextResponse } from "next/server";
import LOGGER from "@/utils/logger";
import Post from "@/schema/Post";
// GET SINGLE POST
export const GET = async (req, { params }) => {

  try {
    const post = await Post.findOne({ where: { featured: true } });
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    LOGGER.error("Error occured while fetching post", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
