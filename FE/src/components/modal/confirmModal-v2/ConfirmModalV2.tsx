import React from "react";

type Props = {
  title: string;
  onClose: () => void;
  onDelete: () => void;
  content: string;
};

const ConfirmModalV2 = ({ title, onClose, onDelete, content }: Props) => {
  return (
    <>
      <div className="w-[500px] bg-white rounded px-4 py-4">
        <h3 className="text-center text-md md:text-xl font-medium text-gray-800 pb-4 md:pb-6">
          {title}
        </h3>
        <div className="pb-4 md:pb-6">
          <h4 className="text-center text-sm md:text-base text-gray-800">
            {content}
          </h4>
        </div>
        <div className="flex items-center h-[30px] md:h-[40px]">
          <button className="flex-[1] h-full rounded bg-transparent hover:bg-zinc-300 transition-all text-sm md:text-base" onClick={() => onClose()}>
            Huỷ
          </button>
          <button className="flex-[1] h-full rounded bg-zinc-800 hover:bg-zinc-600 transition-all text-white text-sm md:text-base" onClick={() => onDelete()}>
            Xác nhận
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmModalV2;
