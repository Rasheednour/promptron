import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Schema } from "mongoose";

type Creator = {
  email: string;
  username: string;
  image: string;
};

type Prompt = {
  creator: Creator;
  prompt: string;
  tag: string;
};
type Props = {
  prompt: Prompt;
  handleTagClick: string;
  handleEdit: string;
  handleDelete: string;
};

const PromptCard = (props: Props) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const handleCopy = () => {
    setCopied(props.prompt.prompt);
    navigator.clipboard.writeText(props.prompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={props.prompt.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {props.prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-grey-500">
              {props.prompt.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === props.prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy-image"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {props.prompt.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(props.prompt.tag)}
      >
        {props.prompt.tag}
      </p>
      {session?.user.id === props.prompt.creator._id &&
        pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={props.handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={props.handleDelete}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
