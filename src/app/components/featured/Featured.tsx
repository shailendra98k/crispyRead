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
import { BASE_URL_CLIENT } from "@/utils/constant";
import Link from "next/link";
const AutoPlaySwipeableViews = autoPlay(
  SwipeableViews
) as React.ComponentType<any>;

export const Featured = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const maxSteps = posts.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleChangeIndex = (index) => {
    setCurrentIndex(index);
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
        index={currentIndex}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
      >
        {posts?.map((post: any, index: number) => (
          <div key={post.label}>
            {Math.abs(currentIndex - index) <= 2 ? (
              <Link href={`/posts/${post.id}/${post.slug}`}>
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
                  src={post.coverImage}
                  alt={post.title}
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
        <Link href={`${BASE_URL_CLIENT}/posts/${posts[currentIndex]?.slug}`}>
          <Typography style={{ fontSize: "1.3rem" }}>
            {posts[currentIndex]?.title}
          </Typography>
        </Link>
      </Paper>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={currentIndex}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={currentIndex === maxSteps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={currentIndex === 0}
          >
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Box>
  );
};
