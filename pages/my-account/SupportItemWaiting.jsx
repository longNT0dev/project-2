import React, { useState } from 'react'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";


const TruncateTypo = styled(Typography)({
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "WebkitLineClamp": "2",
    "WebkitBoxOrient": "vertical",
    "visibility": "visible",
    letterSpacing: "0.6px"
  });


export default function SupportItemWaiting({src,id,sendId,description,reason}) {

    const [loaded, setLoaded] = useState(false);
    const [isValidSrc, setIsValidSrc] = useState(true);

    return (
        <Grid
      item
      container
      id={id}
      sx={{
        border: "none",
        boxShadow: "5px 8px 5px 1px rgba(239,226,226,0.75)",
        transitionDelay: "0.05s",
        height: "auto",
      }}
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

      <Grid item container direction="column" mt={3}>
        <TruncateTypo px={2}>Sản phẩm:{description}</TruncateTypo>
        <TruncateTypo px={2}>Lí do: {reason}</TruncateTypo>
      </Grid>

      <Grid>
        
      </Grid>
    </Grid>
    )
}
