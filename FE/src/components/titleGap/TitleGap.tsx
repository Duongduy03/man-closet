import React from "react";

const TitleGap = ({title}: {title:string}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 py-2 md:py-4">
        <h3 className=" overflow-x-auto font-bold text-gray-800 uppercase">
          {title}
        </h3>
        <div className="w-[50px] md:w-[70px] h-[4px] bg-[#BE7178] rounded"></div>
      </div>
    </>
  );
};

export default TitleGap;
