import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
type Props = {
  prompt: Prompt;
  handleEdit?: (prompt: Prompt) => void;
  handleDelete?: (prompt: Prompt) => void;
  handleTagClick: () => void;
  toggleOverlay: (prompt:Prompt) => void;
};



const PromptCard = (props: Props) => {
  const [copied, setCopied] = useState("");
  const [liked, setLiked] = useState(false);
  
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const handleCopy = (e:React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCopied(props.prompt.prompt);
    navigator.clipboard.writeText(props.prompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  const handleTagClick = (tag: string, e:React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    alert(`clicked on ${tag}`);
  };

  // handle user clicking on the like prompt button
  const handleLike = (e:React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setLiked(!liked);
  }

  // handle user clicking on a text prompt card to enlarge it
  const handleToggleOverlay = () => {
    props.toggleOverlay(props.prompt);

  }


  return (
    
    <div className={"prompt_card hover:cursor-pointer hover:bg-gray-100 " + (props.prompt.imageURL? 'h-fit' : 'h-48')} onClick={handleToggleOverlay}>
      
      
      <div className="flex justify-between items-start gap-2 drop-shadow-md">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={props.prompt.creator.image}
            alt="user_image"
            width={30}
            height={30}
            className="rounded-full object-contain "
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900 text-sm hover:underline " >
              {props.prompt.creator.username}
            </h3>
            {/* <p className="font-inter text-sm text-grey-500">
              {props.prompt.creator.email}
            </p> */}
          </div>
        </div>
        <div className="copy_btn hover:bg-gray-300" onClick={(e)=>{handleLike(e)}}>
          <Image
            src={
              liked
                ? "/assets/icons/heart-filled.svg"
                : "/assets/icons/heart-empty.svg"
            }
            width={12}
            height={12}
            alt="copy-image"
          />
        </div>
        <div className="copy_btn  hover:bg-gray-300" onClick={(e)=>{handleCopy(e)}}>
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
      {props.prompt.imageURL ? (
        <Image
          src={props.prompt.imageURL}
          width={400}
          height={400}
          alt="midjourney user image"
          className="mt-3 mb-3"
        />
      ) : (<p className="my-4 font-satoshi text-sm text-gray-700 line-clamp-3 select-none">
      {props.prompt.prompt}
    </p>)}
      
      <p
        className="font-inter text-sm text-blue-600 cursor-pointer hover:underline select-none inline-block"
        onClick={(e) => handleTagClick(props.prompt.tag, e)}
      >
        #{props.prompt.tag}
      </p>
      

      {session?.user.id === props.prompt.creator._id.toString() &&
        pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={() => {
                if (props.handleEdit) {
                  props.handleEdit(props.prompt);
                }
              }}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={() => {
                if (props.handleDelete) {
                  props.handleDelete(props.prompt);
                }
              }}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
