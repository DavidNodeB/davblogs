import React, { useEffect, useState } from "react";
import { fetchPosts } from "./Home";
import { marked } from "marked";
import { auth } from "../firebase";
import "../css/markdown.css";
import { FaTrash } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";

export default function Post() {
  const [postContent, setPostContent] = useState("");
  const history = useNavigate();

  useEffect(() => {
    fetchPosts().then((posts) => {
      const id = document.location.href.split("/").pop();
      const selectedPost = posts.find((post) => post.id === id);

      if (selectedPost) {
        setPostContent(selectedPost.post_content);
      }
    });
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
    const posts = await fetchPosts();
    const id = document.location.href.split("/").pop();
    const selectedPost = posts.find((post) => post.id === id);
    if (selectedPost) {
      await history(`/post/${selectedPost.id}/edit`);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  auth.onAuthStateChanged(function (user) {
    if (user.uid === process.env.REACT_APP_UID) {
      setIsLoggedIn(!!user);
    } else {
      return;
    }
  });

  const deletePost = async (e) => {
    e.preventDefault();
    const posts = await fetchPosts(); // wait for fetchPosts func then get id
    const id = document.location.href.split("/").pop();
    const selectedPost = posts.find((post) => post.id === id);

    if (selectedPost) {
      await deleteDoc(doc(db, "posts", selectedPost.id));
    } // if id is vaild then delete the post
    setTimeout(() => {
      history("/home");
    }, 1000);
  };

  return (
    <div>
      <div className="w-screen h-screen bg-gradient-to-b from-slate-800 to-slate-900 overflow-x-hidden flex flex-col items-center">
        <div className="container mx-auto bg-slate-950 flex flex-col p-4 sm:rounded sm:mt-4">
          <div dangerouslySetInnerHTML={{ __html: marked(postContent) }}></div>
        </div>
        {isLoggedIn ? (
          <div className="postActions flex flex-row align-center justify-center gap-4 p-1 mt-2">
            <button
              onClick={editPost}
              className="inline-flex items-center gap-1 text-white bg-slate-950	px-2 py-1 rounded font-bold"
            >
              Edit <TbEdit />
            </button>
            <button
              onClick={deletePost}
              className="inline-flex items-center gap-1 text-red-600 bg-slate-950	px-2 py-1 rounded font-bold"
            >
              <FaTrash />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
