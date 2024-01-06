import React, { useEffect, useState } from "react";
import { fetchPosts } from "./Home";
import { auth, db } from "../firebase";
import "../css/markdown.css";
import { FaRegSave } from "react-icons/fa";
import "@github/markdown-toolbar-element";
import {
  FaBold,
  FaLink,
  FaFileImage,
  FaListOl,
  FaHeading,
} from "react-icons/fa";
import { FaItalic, FaQuoteLeft } from "react-icons/fa6";
import { IoCodeSlashOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { doc, updateDoc } from "firebase/firestore";

export default function Edit() {
  const [postContent, setPostContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchPosts();
      const id = document.location.href.split("/")[4];
      const selectedPost = posts.find((post) => post.id === id);
      if (selectedPost) {
        setPostContent(selectedPost.post_content);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkUser = auth.onAuthStateChanged((user) => {
      if (user && user.uid === process.env.REACT_APP_UID) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => checkUser();
  }, []);

  const savePost = async (e) => {
    e.preventDefault();
    let content_input = document.getElementById("textarea_id");
    const posts = await fetchPosts();
    const id = document.location.href.split("/")[4];
    const selectedPost = posts.find((post) => post.id === id);
    const postRef = doc(db, "posts", selectedPost.id);

    await updateDoc(postRef, {
      post_content: content_input.value,
    });

    history("/home");
  };

  return (
    <div>
      <div className="w-screen h-screen bg-gradient-to-b from-slate-800 to-slate-900 overflow-x-hidden flex flex-col items-center">
        <div className="bruh container mx-auto bg-slate-900 p-4 rounded flex flex-col mt-4">
          <textarea
            id="textarea_id"
            className="flex resize-none outline-none rounded p-2 bg-stone-950 text-white font-bold rounded text-2xl h-96"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <div className="tool-bar bg-black text-white p-4">
            <markdown-toolbar for="textarea_id">
              <md-bold>
                <FaBold />
              </md-bold>
              <md-header>
                <FaHeading />
              </md-header>
              <md-italic>
                <FaItalic />
              </md-italic>
              <md-quote>
                <FaQuoteLeft />
              </md-quote>
              <md-code>
                <IoCodeSlashOutline />
              </md-code>
              <md-link>
                <FaLink />
              </md-link>
              <md-image>
                <FaFileImage />
              </md-image>
              <md-ordered-list>
                <FaListOl />
              </md-ordered-list>
            </markdown-toolbar>
          </div>
        </div>
        <div className="postActions flex flex-row gap-4 pt-2">
          {isLoggedIn ? (
            <button
              onClick={savePost}
              className="inline-flex items-center gap-1 text-white bg-slate-950 px-2 py-1 rounded font-bold"
            >
              <FaRegSave />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
