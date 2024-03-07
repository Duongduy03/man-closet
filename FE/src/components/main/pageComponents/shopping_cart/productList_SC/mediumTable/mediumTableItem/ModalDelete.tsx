import React from "react";

type Props = {
  onClose: () => void;
  onDelete: () => void;
};
const ModalDelete = ({ onClose, onDelete }: Props) => {
  return (
    <div className="flex items-center justify-center bg-white rounded w-[400px] p-3 h-auto">
      <article>
        <h4 className="font-medium text-rose-500 text-center pb-2">Xoá</h4>
        <p className="text-center text-gray-500 pb-4">
          Bạn có chắc chắn muốn xoá sản phầm này ra khỏi giỏ hàng không?
        </p>
        <div className="flex items-center h-[40px] gap-2">
          <button
            className="flex-[1] h-full text-gray-800 hover:text-gray-500 transition-all"
            onClick={() => onClose()}
          >
            Huỷ
          </button>
          <button
            className="flex-[1] h-full bg-rose-500 text-white rounded hover:bg-rose-300 transition-all"
            onClick={() => onDelete()}
          >
            Xoá
          </button>
        </div>
      </article>
    </div>
  );
};

export default ModalDelete;
