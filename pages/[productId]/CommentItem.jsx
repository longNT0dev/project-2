import React from "react";
import Rating from "@mui/material/Rating";

export default function CommentItem({ comment, rating }) {
  // const [v]
  return (
    <div style={{ display: "flex", columnGap:"8px" }}>
      <img src="../avatar.jpg" alt="avatar" />
      <div style={{ display: "flex", flexDirection: "column"}}>
        <Rating name="rating" value={rating} />
        <span>{comment}</span>
      </div>
    </div>
  );
}
