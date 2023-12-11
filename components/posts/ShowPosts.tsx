"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

export default function ShowPosts() {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const res = await fetch("/api/post", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
}
