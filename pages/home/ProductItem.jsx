import React, { useState } from "react";
import Image from "next/image";
import avatar from "../../public/Avatar.jpg";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

const TruncateTypo = styled("Typography")({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  "-webkit-line-clamp": "2",
  "-webkit-box-orient": "vertical",
  "visibility": "visible",
  letterSpacing: "0.6px"
});

export default function ProductItem({
  src,
  id,
  description,
  price,
  quantity,
  onClick,
}) {
  const [loaded, setLoaded] = useState(false);
  const [isValidSrc, setIsValidSrc] = useState(true);
  // const classes = useStyles();

  return (
    <Grid
      item
      container
      id={id}
      sx={{
        border: "none",
        boxShadow: "5px 8px 5px 1px rgba(239,226,226,0.75)",
        cursor: "pointer",
        transitionDelay: "0.05s",
        height: "auto",
      }}
      onClick={onClick}
    >
      <Grid
        item
        container
        justifyContent="center"
        sx={{ backgroundColor: "rgb(0,0,0,0.5)", height: "188px" }}
      >
        {isValidSrc ? (
          <img
            style={{ width: "100%", height: "100%" }}
            src={loaded ? src : "../beforeload.svg"}
            alt={description}
            onLoad={() => {
              setLoaded(true);
            }}
            onError={() => setIsValidSrc(false)}
          />
        ) : (
          <div
            style={{
              backgroundImage: "linear-gradient(90deg, #ccc, #999, #ccc)",
              color: "#fff",
            }}
          >
            {description}
          </div>
        )}
      </Grid>

      <Grid item container direction="column">
        <TruncateTypo px={2}>{description}</TruncateTypo>

        {/* <Typography

        style={classes.multiLineEllipsis}
        sx={{
          height: "auto",
          wordBreak: "break-word",
        }}
        >
          
        </Typography> */}
        <Grid container item mb={4} mt={2}>
          <Grid textAlign="start" item xs={6} color="red" px={2}>
            {" "}
            <u>đ</u>
            {price}
          </Grid>
          <Grid textAlign="center" item xs={6}>
            Còn lại: {quantity}
          </Grid>
        </Grid>
        {/* <Grid item></Grid> */}
      </Grid>
    </Grid>
  );
}

/*
Sum 
_page1 [
    {}

]


*/
