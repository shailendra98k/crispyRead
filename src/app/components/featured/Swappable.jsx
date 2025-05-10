"use client";
import axios from "axios";
import {
  BASE_URL_CLIENT,
  CRISPY_READ_CORE_BASE_URL,
  noCacheHeader,
} from "@/utils/constant";
import { SwipeableTextMobileStepperHelper } from "./abc";
import { useAppContext } from "@/app/providers/AppContextProvider";

const SwipeableTextMobileStepper = () => {
  const images = [];

  const data = [];

  return <SwipeableTextMobileStepperHelper images={data} />;
};

export default SwipeableTextMobileStepper;
