import React from "react";
import Rating from '@mui/material/Rating';


export default function CommentItem() {
    // const [v]
  return (
    <div style={{display:'flex',justifyContent: 'start'}}>
      <img src="../avatar.jpg" alt="avatar" /><span>NTL</span>
      <Rating
        name="rating"
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
      />
    </div>
  );
}
