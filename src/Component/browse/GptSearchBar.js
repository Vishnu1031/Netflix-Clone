import React from "react";
import { useSelector } from "react-redux";
import  LanguageConstant  from "../../Utils/constants/languageConstant";

const GptSearchBar = () => {
  const langPreference = useSelector((store) => store.config?.lang);

  return (
    <div className="pt-[15%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          className="p-4 m-4 col-span-9 rounded-lg"
          type="text"
          placeholder={LanguageConstant[langPreference].gptPlaceholder}
        />
        <button className="p-2 m-4 bg-red-700 text-white rounded-lg col-span-3">
          {LanguageConstant[langPreference].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
