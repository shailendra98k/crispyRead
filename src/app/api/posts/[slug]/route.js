import { NextResponse } from "next/server";
import LOGGER from "@/utils/logger";
import Post from "@/schema/Post";
// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await Post.findOne({ where: { slug: slug } });
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    LOGGER.error("Error occured while fetching post", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
