import React, { useState, useEffect } from "react";
import Navbar from "../componets/Navbar";
import { db } from "../firebase";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { collection, getDocs } from "firebase/firestore";

export const fetchPosts = async () => {
  const collectionRef = collection(db, "posts");
  const querySnapshot = await getDocs(collectionRef);
  let postsArray = [];
  querySnapshot.docs.forEach((doc) => {
    postsArray.push({
      id: doc.id,
      ...doc.data(),
    });
  }); // pushes data to new array could also use map but not mapping over anything

  return postsArray;
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts().then((data) => setPosts(data)); // get the post then set the posts to the data
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-slate-800 to-slate-900 overflow-x-hidden">
      <div className="container mx-auto">
        <Navbar />
        <div className="xl:grid-cols-4 gap-4 grid grid-cols-1 gap-2 p-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col text-white bg-black p-4 bg-gray-900 rounded gap-3"
            >
              <h1 className="font-bold text-xl">{post.title}</h1>
              <p className="text-slate-300">{post.title_description}</p>
              <a href={`/post/${post.id}`}>
                <FaArrowUpRightFromSquare className="hover:text-slate-300" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
