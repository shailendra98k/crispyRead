import { categoryList } from "@/utils/constant";
import LOGGER from "@/utils/logger";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = categoryList;

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    LOGGER.error("Error occured while fetching categories", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
