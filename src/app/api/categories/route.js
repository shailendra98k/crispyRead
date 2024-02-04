import { categoryList } from "@/utils/constant";
import { NextResponse } from "next/server";
import { logger } from "../../../../logger";

export const GET = async () => {
  logger.info(`GET api/categories`);
  try {
    const categories = categoryList;
    logger.info(`Received categories: ${categories}`);
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    logger.error(`Error occured while fetching categories : ${err}`);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
