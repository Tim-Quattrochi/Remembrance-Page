import React, { useState, useEffect } from "react";
import instance from "../hooks/useAxios";
import {
  Form,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

function CreatePost() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // make a post request with content to create a new post
    // handle response
    fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts([data, ...posts]);
        setContent("");
      });
  };

  console.log(posts);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="What's on your mind?"
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
                  Author: {post.user.name}
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}

export default CreatePost;
