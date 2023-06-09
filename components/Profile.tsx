import PromptCard from "./PromptCard";
type Props = {
  name: string;
  desc: string;
  data: Prompt[];
  handleEdit: (prompt: Prompt) => void;
  handleDelete: (prompt: Prompt) => void;
};

const Profile = (props: Props) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{props.name} Profile</span>
      </h1>
      <p className="desc text-left">{props.desc}</p>
      <div className="mt-10 prompt_layout">
        {props.data.map((prompt) => (
          <PromptCard
            key={prompt._id.toString()}
            prompt={prompt}
            handleEdit={() => props.handleEdit && props.handleEdit(prompt)}
            handleDelete={() =>
              props.handleDelete && props.handleDelete(prompt)
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
