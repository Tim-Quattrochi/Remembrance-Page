import React, { useState, useEffect } from "react";
import instance from "../hooks/useAxios";
import {
  Form,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { HiOutlinePuzzlePiece } from "react-icons/hi";
import { useProvideAuth } from "../hooks/useAuth";
import { formatDate } from "../utils.js/date";

function CreatePost() {
  const {
    state: { user },
  } = useProvideAuth();

  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [likedState, setLikedState] = useState();
  const [userNow, setUserNow] = useState("");

  useEffect(() => {
    setUserNow(user);
  }, [user]);

  // Fetch all posts from the server
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const allPosts = await instance.get("posts");
        console.log(allPosts);
        setPosts(allPosts.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post("posts", { content });
      console.log(res.data);

      setPosts([res.data, ...posts]);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const { data } = await instance.post(`posts/like/${postId}`);
      setLikes({
        ...likes,
        [postId]: true,
      });
      // update the posts state by using the updated post object from the API
      const { user, ...updatedPost } = data;
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return { ...post, ...updatedPost, user: post.user };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="text-center"
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Make a post for the guest-book..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Post
        </Button>
      </Form>
      {posts &&
        posts.map((post) => (
          <Card key={post._id}>
            <Card.Body>
              <Card.Title>{post.content}</Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Author: {post.user.name}{" "}
                  {formatDate(post.createdAt)}
                </ListGroupItem>
                {post.likes && post.likes.length > 0 && (
                  <OverlayTrigger
                    key={post._id}
                    placement="auto"
                    overlay={
                      <Tooltip id={`tooltip-${post._id}`}>
                        {post.likes.map((like, i) => (
                          <span key={i}>
                            {like.name}
                            {i !== post.likes.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </Tooltip>
                    }
                  >
                    <ListGroupItem
                      className="d-flex align-items-center"
                      onClick={() => handleLike(post._id)}
                    >
                      {likes[post._id] ? (
                        <FaHeart className="mr-2 text-danger" />
                      ) : (
                        <FcLikePlaceholder className="mr-2" />
                      )}
                      {post.likes.length}
                    </ListGroupItem>
                  </OverlayTrigger>
                )}
              </ListGroup>
              {post.likes &&
              post.likes.find((like) => like._id === userNow._id) ? (
                <FaHeart
                  className={likes ? "text-danger" : ""}
                  onClick={() => {
                    handleLike(post._id);
                  }}
                />
              ) : (
                <FcLikePlaceholder
                  onClick={() => {
                    handleLike(post._id);
                  }}
                />
              )}
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}

export default CreatePost;
