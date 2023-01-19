import {
  Card,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { formatDate } from "../utils.js/date";
import { FaHeart } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";

export const PostFeed = ({ posts, likes, handleLike, user }) => {
  return (
    <Container style={{ maxWidth: "800px" }}>
      {posts &&
        posts.map((post) => (
          <Card bg="light" key={post._id} className="mb-3">
            <Card.Body>
              <Card.Title>{post.content}</Card.Title>
            </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
              <div>Author: {post.user.name}</div>
              <div>{formatDate(post.createdAt)}</div>

              {post.likes && post.likes.length >= 0 && (
                <OverlayTrigger
                  key={post._id}
                  placement="bottom"
                  overlay={
                    <Tooltip id={`tooltip-${post._id}`}>
                      {post.likes.length > 0 ? (
                        post.likes.map((like, i) => (
                          <span key={i}>
                            {" "}
                            {like.name}
                            {i !== post.likes.length - 1 ? ", " : ""}
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
        ))}
    </Container>
  );
};
