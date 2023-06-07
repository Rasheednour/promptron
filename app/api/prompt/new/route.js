import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tag, platform, imageURL } = await req.json();

  try {
    await connectToDB();
    let newPrompt;
    if(platform === "midjourney") {
      newPrompt = new Prompt({ creator: userId, prompt, tag, platform, imageURL });
    } else {
      newPrompt = new Prompt({ creator: userId, prompt, tag, platform });
    }
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
