import React from "react";
import Image from "next/image";
import avatar from "../../public/Avatar.jpg";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
export default function ProductItem({ src, description, price, quantity }) {
  return (
    <Grid
      item
      container
      sx={{
        border: "none",
        boxShadow: '5px 8px 5px 1px rgba(239,226,226,0.75)',
        cursor: "pointer",
        transitionDelay: "0.05s",
        height:'320px',
        "&:hover": { border: "1px solid red", transitionDelay: "0.05s" },
      }}
    >
      <Grid item container justifyContent="center">
        <Image
          layout="fixed"
          src={avatar}
          alt={description}
          width={180}
          height={188}
        />
      </Grid>

      <Grid item container direction="column" sx={{borderTop:'1px solid black'}}>
        <Typography px={5} sx={{height:'auto',wordBreak:'break-word'}}>{description}</Typography>
        <Grid container item>
          <Grid textAlign="center" item xs={6} color="red">
            {" "}
            <u>đ</u>
            {price}
          </Grid>
          <Grid textAlign="center" item xs={6}>
            Còn lại: {quantity}
          </Grid>
        </Grid>
        <Grid item></Grid>
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
