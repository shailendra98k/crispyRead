import { NextResponse } from "next/server";
import Post from "@/schema/Post";
import { logger } from "../../../../../logger";
// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;
  logger.info(`GET api/posts/${slug}`);

  try {
    const post = await Post.findOne({ where: { slug: slug } });
    logger.info(`Received post by slug : ${post.slug}`);

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    logger.error(`Error occured while fetching post by slug :  ${err}`);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
