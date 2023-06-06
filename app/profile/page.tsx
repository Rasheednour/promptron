"use client";
import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
type Props = {}

const UserProfile = (props: Props) => {
  const router = useRouter();
    const {data: session} = useSession();
    const [prompts, setPrompts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPrompts(data);
        };
        if(session?.user.id){
            fetchPosts();
        }
        
      }, [session]);

    const handleEdit = (prompt: Prompt) => {
      router.push(`/update-prompt?id=${prompt._id}`)
    }
    const handleDelete = async (prompt: Prompt) => {
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

      if(hasConfirmed) {
        try {
          await fetch(`/api/prompt/${prompt._id.toString()}`, {method: 'DELETE'});
          const filteredPosts = prompts.filter((p: Prompt) => p._id !== prompt._id);
          setPrompts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }

    }
  return (
    <Profile 
    name="My"
    desc="Welcome to your personalized profile page"
    data={prompts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}/>
  )
}

export default UserProfile