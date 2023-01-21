import { useState } from "react";
import {
  Card,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { formatDate } from "../utils.js/date";
import { FaHeart } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { toast } from "react-toastify";
import ScrollToTop from "../components/ScrollToTop";

export const PostFeed = ({ posts, likes, handleLike, user }) => {
  const [displayedPosts, setDisplayedPosts] = useState(2);

  const handleMoreClick = () => {
    if (displayedPosts >= posts.length) {
      toast.info("No more posts to show right now.");
    } else {
      setDisplayedPosts(displayedPosts + 4);
    }
  };

  return (
    <Container style={{ maxWidth: "800px" }}>
      <div className="row">
        {posts &&
          posts.slice(0, displayedPosts).map((post, index) => (
            <div className="col-sm-3" key={post._id}>
              <Card
                bg="none"
                key={post._id}
                className="mb-3"
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "#CCF1E1" : "white",
                }}
              >
                <Card.Body
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "Regular",
                    color: "rgba(0,0,0,0.7)",
                  }}
                >
                  {post.content}
                </Card.Body>
                <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "Regular",
                      color: "rgba(0,0,0,0.4)",
                      fontSize: "16px",
                    }}
                  >
                    {post.user.name}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#A8A8A8",
                      fontFamily: "Montserrat",
                      fontWeight: "Regular",
                    }}
                  >
                    {formatDate(post.createdAt)}
                  </div>
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
                                {like.name}
                                {i !== post.likes.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))
                          ) : (
                            <div>No hearts yet</div>
                          )}
                        </Tooltip>
                      }
                    >
                      <div>
                        {likes[post._id] ? (
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
                </Card.Footer>
              </Card>
            </div>
          ))}
      </div>
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
      <ScrollToTop />
    </Container>
  );
};
