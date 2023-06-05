import PromptCard from "./PromptCard"
type Props = {
  name:string,
  desc: string,
  data: string[],
  handleEdit: () => void,
  handleDelete: () => void
}

const Profile = (props: Props) => {
  return (
    <section className="w-full">
    <h1 className="head_text text-left"><span className="blue_gradient">{props.name} Profile</span></h1>
    <p className="desc text-left">{props.desc}</p>
    <div className="mt-10 prompt_layout">
      {props.data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleEdit={() => handleEdit && handleEdit(prompt)}
          handleDelete={() => handleDelete && handleDelete(prompt)}
        />
      ))}
    </div>
    </section>
  )
}

export default Profile