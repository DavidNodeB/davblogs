import "../index.css";
import "@github/markdown-toolbar-element";
import "../css/new.css";
import { db } from "../firebase";
import {
  FaBold,
  FaLink,
  FaFileImage,
  FaListOl,
  FaHeading,
} from "react-icons/fa";
import { FaItalic, FaQuoteLeft } from "react-icons/fa6";
import { IoCodeSlashOutline } from "react-icons/io5";
import { PiUploadSimpleBold } from "react-icons/pi";
import { useNavigate } from "react-router";
import { collection, addDoc } from "firebase/firestore";

export default function New() {
  const history = useNavigate();
  const saveInput = (e) => {
    e.preventDefault();
    let title_input = document.getElementById("title");
    let title_description = document.getElementById("title_description");
    let content_input = document.getElementById("textarea_id");
    let str = "";

    addDoc(collection(db, "posts"), {
      title: title_input.value,
      title_description: title_description.value,
      post_content: content_input.value,
    });

    if (
      title_input.value.length &&
      title_description.value.length &&
      content_input.value.length > str.length
    ) {
      title_input.value = "";
      title_description.value = "";
      content_input.value = "";
    }
    setTimeout(() => {
      history("/home");
    }, 1000);
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-slate-800 to-slate-900 overflow-x-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-screen gap-2">
          <textarea
            name="title"
            id="title"
            placeholder="Post title"
            className="flex resize-none outline-none rounded p-2 bg-stone-950 text-white font-bold 
                rounded text-2xl xl:w-3/5 w-96 h-48"
          ></textarea>
          <textarea
            name="title_description"
            id="title_description"
            placeholder="Post description"
            className="flex resize-none outline-none rounded p-2 bg-stone-950 text-gray-400 font-bold 
                rounded text-lg xl:w-3/5 w-96 h-48"
          ></textarea>
          <div className="tool-bar bg-black text-white xl:w-3/5 w-96 p-4">
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
          <textarea
            name="content"
            id="textarea_id"
            placeholder="Write all post content here..."
            className="flex resize-none outline-none rounded p-4 bg-stone-950 rounded
                text-xl text-gray-500 xl:w-3/5 w-96 h-96"
          ></textarea>
          <div className="postActions flex flex-row gap-4 pt-2">
            <button
              onClick={(e) => saveInput(e)}
              className="inline-flex items-center gap-1 text-white bg-black px-2 py-1 rounded font-bold"
            >
              Publish <PiUploadSimpleBold />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
