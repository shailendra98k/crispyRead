import { NextResponse } from "next/server";
import LOGGER from "@/utils/logger";
import Post from "@/schema/Post";
import { POST_PER_PAGE } from "@/utils/constant";
import { logger } from "../../../../logger";
import { Condiment } from "next/font/google";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams?.get("page");
  const category = searchParams?.get("category")?.toLowerCase();
  logger.info(`GET api/posts/?page=${page}&categoty=${category}`);

  const whereClause = !!category
    ? { category: category, published: true }
    : { published: true };

  try {
    const posts = await Post.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
      limit: POST_PER_PAGE,
      offset: (page - 1) * POST_PER_PAGE,
    });

    const count = await Post.count({ where: whereClause });
    const postsArray = posts.map((post) => post.get({ plain: true }));
    logger.info(`Received ${count} posts`);
    return new NextResponse(JSON.stringify({ a: postsArray, b: count }), {
      status: 200,
    });
  } catch (err) {
    logger.error(`Error occured while fetching all posts : ${err}`);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A POST
export const POST = async (req) => {
  // const session = await getAuthSession();

  // if (!session) {
  //   return new NextResponse(
  //     JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
  //   );
  // }

  try {
    const body = await req.json();
    const post = await Post.create(body);
    return new NextResponse(JSON.stringify(post, { status: 201 }));
  } catch (err) {
    LOGGER.error("Error occured while fetching posts", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A PATCH
export const PATCH = async (req) => {
  try {
    const body = await req.text();
    const data = JSON.parse(body);
    await Post.update(data, { where: { id: data.id } });
    const post = await Post.findOne({ where: { id: data.id } });
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    LOGGER.error("Error occured while fetching posts", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
