"use client";
import React, { SetStateAction, useState, useEffect } from "react";
import Link from "next/link";
import ToggleSwitch from "@components/ToggleSwitch";
import Image from "next/image";

type Post = {
  prompt: string;
  tag: string;
};
type Props = {
  type: string;
  post: Post;
  setPost: any;
  submitting: boolean;
  handleSubmit: any;
  setImageFile: (imageFile: File) => void;
};

const Form = (props: Props) => {
  const [platform, setPlatform] = useState("chatGPT");
  const [image, setImage] = useState("");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImage(URL.createObjectURL(e.target.files[0]));
    props.setImageFile(e.target.files[0])
  }
  // reset image whenever platform is changed
  useEffect(() => {
    setImage("")
  }, [platform])
  
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{props.type} Post</span>
        <p className="desc text-left max-w-md">
          {props.type} and share amazing prompts with the world, and let your
          imagination run wild with the AI-powered platform of your choice
        </p>
        <ToggleSwitch setPlatform={setPlatform}/>
        <form
        onSubmit={props.handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Your AI Prompt
            </span>
            <textarea
            value={props.post.prompt}
            onChange={(e) => props.setPost({
              ...props.post, prompt: e.target.value
            })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"/>
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Tag
              <span>(#product, #webdevelopment, #idea)</span>
            </span>
            <input
            value={props.post.tag}
            onChange={(e) => props.setPost({
              ...props.post, tag: e.target.value
            })}
            placeholder="#tag"
            required
            className="form_input"/>
          </label>
          {platform === "midjourney" && (
            <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">Share Your Resulting Image</span>
            <input type="file" accept="image/*" className="form_input" onChange={(e) => {handleImageChange(e)}} required></input>
            {image && (<Image src={image} width={200} height={200} alt="midjourney user image"/>)}
          </label>
          )}
          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>
            <button type="submit" disabled={props.submitting} className="px-5 py-1.5 text-sm bg-blue-500 rounded-full text-white">
              {props.submitting ? `${props.type}...` : props.type}

            </button>
          </div>

        </form>
      </h1>
    </section>
  );
};

export default Form;
