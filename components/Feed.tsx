"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import ToggleSwitch from "./ToggleSwitch";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
type Props = {};

const Feed = (props: Props) => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPrompts(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {/* <ToggleSwitch/> */}
      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
