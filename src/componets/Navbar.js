import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";

export default function Navbar() {
  const history = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      history("/");
    });
  };

  const avatar = useMemo(() => {
    return createAvatar(pixelArt, {
      size: 32,
      scale: 100,
    }).toDataUriSync();
  }, []);

  const handlePost = (e) => {
    e.preventDefault();
    history("/new");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  auth.onAuthStateChanged(function (user) {
    if (user.uid === process.env.REACT_APP_UID) {
      setIsLoggedIn(!!user);
    } else {
      return;
    }
  });

  return (
    <div className="h-14 px-3 py-3">
      <div className="flex flex-row items-center justify-between">
        <div className="text-white text-xl font-bold leading-none">
          David Barreto
        </div>
        <div className="flex flex-row items-center justify-end space-x-4">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-8 h-8 overflow-hidden">
            <img src={avatar} alt="Avatar" />
          </div>
          <button onClick={handleClick}>
            <MdLogout className="text-red-700 text-xl" />
          </button>
          {isLoggedIn ? (
            <button
              onClick={handlePost}
              className="text-white bg-sky-600 p-1 rounded flex flex-row items-center gap-1"
            >
              Create Post
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
