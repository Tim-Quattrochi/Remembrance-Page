import React, { useState } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { useProvideAuth } from "../../../hooks/useAuthProvider";
import { formatDate } from "../../../utils.js/date";
import "./postCard.css";

const PostCard = ({ post, handleLike, likes, index }) => {
  const {
    state: { user },
  } = useProvideAuth();

  const [likedState, setLikedState] = useState(
    post.likes.some((like) => like?.name === user?.name)
  );

  return (
    <div key={post._id}>
      <div className="user-name">{post.user.name}</div>
      <Card
        bg="none"
        key={post._id}
        className="mb-2"
        style={{
          backgroundColor: index % 2 === 0 ? "#CCF1E1" : "white",
        }}
      >
        <Card.Body className="card-body">
          <Card.Text>{post.content}</Card.Text>
        </Card.Body>

        {post.likes && post.likes.length >= 0 && (
          <OverlayTrigger
            key={`overlay-${post._id}`}
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-${post._id}`}>
                {post.likes.length > 0 ? (
                  post.likes.map((like, i) => (
                    <span key={i}>
                      {" "}
                      Loved by {like.name}
                      {i !== post.likes.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <div>No hearts yet</div>
                )}
              </Tooltip>
            }
          >
            <div className="heart">
              {likedState || likes[post._id] ? (
                <FaHeart
                  className="mr-2 text-danger"
                  onClick={() => handleLike(post._id)}
                />
              ) : (
                <FcLikePlaceholder
                  className="mr-2"
                  onClick={() => handleLike(post._id)}
                />
              )}
              {post.likes.length}
            </div>
          </OverlayTrigger>
        )}
      </Card>
      <div className="date">{formatDate(post.createdAt)}</div>
    </div>
  );
};

export default PostCard;
