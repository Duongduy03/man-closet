import React, { memo } from "react";

type Props = {
  changeCase: (typecase: string) => void;
  label: string
};
const TablineItem = ({changeCase,label}: Props) => {
  return (
    <>  
      <li 
      onClick={() => changeCase(label)}
      className="border bg-slate-50 py-2 px-3 rounded cursor-pointer text-gray-800 hover:text-[--secondary-color] transitions">
        <p className="text-center">{label}</p>
      </li>
    </>
  );
};

export default memo(TablineItem);
