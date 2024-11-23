/* eslint-disable react/prop-types */
import { Post } from "./Post.jsx"
import "../styles/PostingPanel.css"

export function PostingPanel ( {content} ) {
    return(
        <div className="postingPanel">
            {content.map( post =>
                <Post 
                    key = {post.id}
                    userName = {post.userName}
                />
            )}
        </div>
    )
}