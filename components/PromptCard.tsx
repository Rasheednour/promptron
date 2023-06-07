import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  prompt: Prompt;
  handleEdit: (prompt: Prompt) => void;
  handleDelete: (prompt: Prompt) => void;
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
  const handleTagClick = (tag: string) => {
    alert(`clicked on ${tag}`);
  }
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
        onClick={() => handleTagClick(props.prompt.tag)}
      >
        {props.prompt.tag}
      </p>
      {/* <Image src={"https://images.pexels.com/photos/3118541/pexels-photo-3118541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} width={400} height={400} alt="midjourney user image"/> */}
      {session?.user.id === props.prompt.creator._id.toString() &&
        pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={()=>props.handleEdit(props.prompt)}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={()=>props.handleDelete(props.prompt)}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
