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

// UPDATE SINGLE POST
export const PATCH = async (req, { params }) => {
  const { slug } = params;
  const body = await req.json();

  try {
    await Post.update(body, { where: { slug: slug } });
    const post = await Post.findOne({ where: { slug: slug } });
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    logger.error(`Error occured while updating post by slug :  ${err}`);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
