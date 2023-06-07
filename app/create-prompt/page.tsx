"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { storage } from "@config/firebase";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Form from "@components/Form";

type Props = {};

const CreatePrompt = (props: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  const createPrompt = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // check if an image file is sent back in the form
      if (imageFile) {
        // specify the image file name and storage folder location
        console.log(imageFile);
        const imageRef = ref(
          storage,
          `midjourney_images/${imageFile.name + v4()}`
        );

        const snapshot = await uploadBytes(imageRef, imageFile);
        // get the image's public URL
        const downloadURL = await getDownloadURL(imageRef);
        console.log("the image URL is", downloadURL);
        setImageURL(downloadURL);
      }
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
          imageURL: imageURL,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
      setImageFile={setImageFile}
    />
  );
};

export default CreatePrompt;
