"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import ToggleSwitch from "./ToggleSwitch";
import Overlay from "./OverlayCard";

type CardListProps = {
  data: Prompt[];
  handleTagClick: () => void;
};
type PlatformPrompts = {
  chatGPT: Prompt[];
  midjourney: Prompt[];
};
const PromptCardList = (props: CardListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [overlayPrompt, setOverlayPrompt] = useState<string>();
  const toggleOverlay = (prompt:Prompt) => {
    setOverlayPrompt(prompt.prompt);
    setIsOpen(!isOpen);
  };
  return (
    <div className=" prompt_layout">
      
      {props.data.map((prompt: Prompt) => (
        <PromptCard
          key={prompt._id.toString()}
          prompt={prompt}
          handleTagClick={props.handleTagClick}
          toggleOverlay={toggleOverlay}
        />
      ))}
      <Overlay isOpen={isOpen} onClose={toggleOverlay}>
        <h1>{overlayPrompt}</h1>
      </Overlay>
    </div>
  );
};
type Props = {};
const Feed = (props: Props) => {
  const [searchText, setSearchText] = useState<string>("");
  // store only prompts that will shows on the home feed
  const [feedPrompts, setFeedPrompts] = useState<Prompt[]>([]);
  // store all Prompts
  const [allPrompts, setAllPromps] = useState<PlatformPrompts>();
  // store AI platform
  const [platform, setPlatform] = useState<Platform>("chatGPT");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  

  

  // if a platform changes due to the user clicking on the toggle
  // platform button in the home page, filter the prompt feed
  useEffect(() => {
    if (allPrompts) {
      setFeedPrompts(allPrompts[platform]);
    }
  }, [platform]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data: Prompt[] = await response.json();
      // prefilter the data into platform specific prompts
      const gptPrompts = data.filter((prompt) => prompt.platform == "chatGPT");
      const mjPrompts = data.filter(
        (prompt) => prompt.platform == "midjourney"
      );
      const prompts = { chatGPT: gptPrompts, midjourney: mjPrompts };
      setAllPromps(prompts);
      setFeedPrompts(prompts[platform]);
    };
    fetchPosts();
  }, []);

  // function to filter prompts based on clicked tag
  const handleTagClick = () => {};
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
      <ToggleSwitch setPlatform={setPlatform} />
      {feedPrompts && (
        <PromptCardList data={feedPrompts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
