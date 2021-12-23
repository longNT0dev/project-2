import React from "react";
import CommentItem from "./CommentItem";

export default function CommentList({ comments }) {

  return (
    <div style={{width:'100%',display: 'flex',flexDirection: 'column',rowGap:'12px'}}>
      {comments &&
        comments.map((e) => {
          return <CommentItem comment={e.comment} rating={e.rating} />;
        })}
    </div>
  );
}
