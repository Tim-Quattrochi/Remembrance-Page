import { useState } from "react";
import { PostCard } from "../..";
import { toast } from "react-toastify";
import "./postFeed.css";

const PostFeed = ({ posts, likes, handleLike }) => {
  const [displayedPosts, setDisplayedPosts] = useState(6);

  const handleMoreClick = () => {
    if (displayedPosts >= posts.length) {
      toast.info("No more posts to show");
    } else {
      setDisplayedPosts(displayedPosts + 4);
    }
  };

  return (
    <div id="posts-container">
      {posts &&
        posts.slice(0, displayedPosts).map((post, index) => {
          return (
            <PostCard
              post={post}
              index={index}
              likes={likes}
              handleLike={handleLike}
              key={post._id}
            />
          );
        })}

      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "Segoe UI",
            fontWeight: "bold",
            fontSize: "24px",
            textDecoration: "underline",
            color: "#161616",
            cursor: "pointer",
          }}
          onClick={handleMoreClick}
        >
          See More
        </p>
      </div>
    </div>
  );
};

export default PostFeed;
