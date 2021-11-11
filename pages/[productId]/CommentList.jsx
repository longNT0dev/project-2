import React from 'react'
import CommentItem from './CommentItem'

export default function CommentList({comments}) {
    return (
        <div>
           {comments && comments.map((e) => {
               return <CommentItem />
           }) }
        </div>
    )
}
