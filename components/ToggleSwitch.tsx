import React from "react";

type Props = {
    setPlatform: (platform: Platform) => void
};

const ToggleSwitch = (props: Props) => {
  const handleToggle = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.checked){
        props.setPlatform("midjourney");
    } else {
        props.setPlatform("chatGPT");
    }
  };
  return (
    <label className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-800 mt-4">
      <input
        id="Toggle3"
        type="checkbox"
        className="hidden peer"
        onChange={(e) => {
          handleToggle(e);
        }}
        defaultChecked
      />
        <span className="border-2  font-satoshi font-semibold px-3 py-2 rounded-l-3xl text-white dark:bg-blue-500 border-gray-400 peer-checked:dark:bg-gray-300 peer-checked:border-0 peer-checked:text-gray-700 select-none text-center text-sm ">
          ChatGPT
        </span>
        <span className="peer-checked:border-2 font-satoshi font-semibold px-3 py-2 rounded-r-3xl dark:bg-gray-300 peer-checked:bg-blue-500 peer-checked:border-gray-400 peer-checked:text-white select-none text-center text-sm ">
          Midjourney
        </span>
    </label>
  );
};

export default ToggleSwitch;
