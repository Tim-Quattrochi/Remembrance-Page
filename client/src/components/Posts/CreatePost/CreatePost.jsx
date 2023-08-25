import React, { useState, useEffect } from "react";
import instance from "../../../hooks/useAxios";
import { Container, Col, Spinner } from "react-bootstrap";
import { useProvideAuth } from "../../../hooks/useAuthProvider";
import { toast } from "react-toastify";
import { PostFeed } from "../../../pages";

import { useNavigate } from "react-router-dom";
import SignForm from "../SignForm/SignForm";
import { logError } from "../../../helpers/logErrors";

function CreatePost() {
  const {
    state: { user },
  } = useProvideAuth();

  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [userNow, setUserNow] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !user ||
      user.length === 0 ||
      user === "" ||
      user.name === undefined
    ) {
      setUserNow("Guest");
    } else {
      setUserNow(user.name);
    }
  }, [user]);

  // Fetch all posts from the server, they are already being mapped out in the response.
  useEffect(() => {
    const getAllPosts = async () => {
      setIsLoading(true);
      try {
        const allPosts = await instance.get("posts");
        setPosts(allPosts.data);
        setIsLoading(false);
      } catch (error) {
        logError(error);
      }
    };
    getAllPosts();
  }, []);

  const handleChange = (e) => {
    const input = e.target.value;
    const paragraphs = input.split("\n");
    setContent(paragraphs.join("\n"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      !user ||
      user.length === 0 ||
      user === "" ||
      user === undefined
    ) {
      toast.error("Please log in to make a post");
      navigate("/");
    }
    if (!content || content === "  ") {
      return toast.error("Please enter a message");
    }
    try {
      const res = await instance.post("posts", { content });

      setPosts([res.data, ...posts]);
      setContent("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong.");
    }
  };

  const handleLike = async (postId) => {
    if (userNow === "Guest") {
      return toast.info("You must be logged in to like a post");
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

      // update the posts state by using the updated post object from the backend
      const { ...updatedPost } = data;

      const updatedPosts = posts.map((post) => {
        if (post._id.toString() === postId.toString()) {
          return { ...post, ...updatedPost, user: post.user };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      logError(error);
    }
  };

  if (isLoading) {
    return (
      <div id="spinner">
        <Spinner
          style={{
            width: "3rem",
            height: "3rem",
            color: "#CCF1E1",
          }}
        />
      </div>
    );
  }

  return (
    <Container style={{ maxWidth: "800px", marginTop: "10rem" }}>
      <Col xs={12} md={12} className="mb-5">
        <SignForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          content={content}
          userNow={userNow}
        />
      </Col>

      <PostFeed posts={posts} likes={likes} handleLike={handleLike} />
    </Container>
  );
}

export default CreatePost;
