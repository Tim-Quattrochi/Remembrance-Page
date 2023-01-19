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
  Container,
} from "react-bootstrap";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { HiOutlinePuzzlePiece } from "react-icons/hi";
import { useProvideAuth } from "../hooks/useAuth";
import { formatDate } from "../utils.js/date";
import { toast } from "react-toastify";

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
    console.log(content);
    if (!content || content === "  ") {
      return toast.error("Please enter a message");
    }
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
    if (!userNow) {
      return toast.info("You must be logged in to like a post.");
    }

    try {
      if (
        posts
          .find((post) => post._id === postId)
          .likes.map((like) => like._id)
          .includes(userNow._id)
      ) {
        return toast.info("You have already liked this post");
      }
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
    <Container style={{ maxWidth: "800px" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Control
            as="textarea"
            rows="3"
            maxLength={900}
            placeholder="Make a post for the guest-book..."
            value={content}
            size="lg"
            required
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Post
        </Button>
      </Form>
      {posts &&
        posts.map((post) => (
          <Card bg="light" key={post._id} className="mb-3">
            <Card.Body>
              <Card.Title>{post.content}</Card.Title>
            </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
              <div>Author: {post.user.name}</div>
              <div>{formatDate(post.createdAt)}</div>

              {post.likes && post.likes.length > 0 && (
                <OverlayTrigger
                  key={post._id}
                  placement="bottom"
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
}

export default CreatePost;
