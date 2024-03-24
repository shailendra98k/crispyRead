import { NextResponse } from "next/server";
import Post from "@/schema/Post";
import { logger } from "../../../../logger";
// GET SINGLE POST
export const GET = async (req, { params }) => {
  try {
    logger.info(`GET api/featured-post`);
    const posts = await Post.findAll({ where: { featured: true } });

    logger.info(`Received featured post : ${posts}`);
    return new NextResponse(posts, { status: 200 });
  } catch (err) {
    logger.error(`Error occured while fetching post:  ${err}`);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
