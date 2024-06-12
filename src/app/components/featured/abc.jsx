"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import axios from "axios";
import { BASE_URL_CLIENT, noCacheHeader } from "@/utils/constant";
import Link from "next/link";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const SwipeableTextMobileStepperHelper = ({images}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        margin: "8px",
        marginTop: "60px",
        flexGrow: 1,
        backgroundColor: "#fff",
        borderRadius: "1rem",
        padding: "2rem",
      }}
    >
      <AutoPlaySwipeableViews
        axis={"x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images?.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Link href={`${BASE_URL_CLIENT}/posts/${step.slug}`}>
                <Box
                  component="img"
                  sx={{
                    display: "block",
                    overflow: "hidden",
                    margin: "auto",
                    width: "100%",
                    height: "230px",
                    maxWidth: "500px",
                  }}
                  src={step.coverImage}
                  alt={step.title}
                />
              </Link>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>

      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "center",
          pl: 2,
          bgcolor: "background.default",
          textAlign: "center",
          padding: "1rem 0rem",
          textTransform: "none",
        }}
      >
        <Link href={`${BASE_URL_CLIENT}/posts/${images[activeStep]?.slug}`}>
          <Typography style={{ fontSize: "1.3rem" }}>
            {images[activeStep]?.title}
          </Typography>
        </Link>
      </Paper>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Box>
  );
};
