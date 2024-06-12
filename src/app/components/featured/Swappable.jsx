import axios from "axios";
import {
  BASE_URL_CLIENT,
  CRISPY_READ_CORE_BASE_URL,
  noCacheHeader,
} from "@/utils/constant";
import { SwipeableTextMobileStepperHelper } from "./abc";

const getData = async () => {
  const url = `${CRISPY_READ_CORE_BASE_URL}/api/posts/featured`;
  const res = await axios.get(url, {
    headers: noCacheHeader,
  });

  if (res.status !== 200) {
    throw new Error("Failed");
  }
  return res.data;
};

const SwipeableTextMobileStepper = async () => {
  const images = [];

  const data = await getData();

  return <SwipeableTextMobileStepperHelper images={data} />;
};

export default SwipeableTextMobileStepper;
