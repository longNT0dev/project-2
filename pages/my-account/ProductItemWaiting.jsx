import React, { useState } from "react";
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

export default function ProductItem({
  src,
  id,
  description,
  price,
  quantity,
  status
}) {
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
        cursor: "pointer",
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

      <Grid item container direction="column">
        <TruncateTypo px={2}>{description}</TruncateTypo>
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
        {
          {
            '1': <TruncateTypo px={2} sx={{color:'green',textAlign:'center'}}>Đã duyệt</TruncateTypo>,
            '-1': <TruncateTypo px={2} sx={{color:'red',textAlign:'center'}}>Từ chối</TruncateTypo>,
            '0':  <TruncateTypo px={2} sx={{color:'#b9b91f',textAlign:'center'}}>Đang đợi duyệt</TruncateTypo>
          }[status]
        }
       
      </Grid>
    </Grid>
  );
}


