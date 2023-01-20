import React, { useState, useEffect } from "react";
import instance from "../hooks/useAxios";
import { Form, Button, Container } from "react-bootstrap";
import { useProvideAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { PostFeed } from "../pages/PostFeed";
import signBtn from "../assets/signBtn.svg";
import pressedBtn from "../assets/pressedBtn.svg";

function CreatePost() {
  const {
    state: { user },
  } = useProvideAuth();

  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [userNow, setUserNow] = useState("");
  const [isHovered, setIsHovered] = useState(false);

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

      // update the posts state by using the updated post object from the backend
      const { user, ...updatedPost } = data;
      const updatedPosts = posts.map((post) => {
        if (post._id.toString() === postId.toString()) {
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
      <Form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          marginTop: "30px",
        }}
      >
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
        <Button
          variant="none"
          type="submit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered ? pressedBtn : signBtn}
            alt="SVG Button"
            style={{ height: "50px", width: "224px" }}
          />
        </Button>
      </Form>
      <PostFeed
        posts={posts}
        likes={likes}
        handleLike={handleLike}
        user={user}
      />
    </Container>
  );
}

export default CreatePost;
