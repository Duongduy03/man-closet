"use client";

import { removeAccents } from "@/helper";
import { IProduct } from "@/interfaces/product";
import { getAllProductState } from "@/redux/reducer/product.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Inbox, SearchIcon, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// interface
interface SearchModalProps {
  onClose: () => void;
}

interface SearchResultItemProps {
  productName: string;
  imageUrl: string;
  id: string;
  onClose: () => void;
}

// children comp =======================================================
const SearchResultItem = ({
  imageUrl,
  productName,
  id,
  onClose,
}: SearchResultItemProps) => {
  const router = useRouter();

  const handleSelectItem = () => {
    onClose();
    router.push(`/shop/detail/${id}`);
  };

  return (
    <>
      <div
        onClick={() => handleSelectItem()}
        className="flex items-center gap-3 hover:bg-zinc-100 transition-all rounded mb-1 p-2 cursor-pointer"
      >
        <div className="relative w-[60px] h-[60px] rounded overflow-hidden">
          <Image src={imageUrl} alt="" fill style={{ objectFit: "cover" }} />
        </div>
        <h5 className="text-gray-800">{productName}</h5>
      </div>
    </>
  );
};

// parent comp =======================================================

const SearchModal = ({ onClose }: SearchModalProps) => {
  const productsState = useAppSelector((state) => state.product.products);
  const [products, setProduct] = useState<IProduct[]>([]);
  const [productsSearched, setProductsSearched] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatchThunk = useAppDispatch();

  useEffect(() => {
    dispatchThunk(getAllProductState());
  }, [dispatchThunk]);

  useEffect(() => {
    setProduct(productsState);
  }, [productsState]);

  useEffect(() => {
    handleSearchData(searchQuery);
  }, [searchQuery]);

  const handleSearchData = (searchQuery: string) => {
    let filterData = products;

    if (searchQuery.trim() == "") {
      setProductsSearched([]);
    } else {
      filterData = filterData.filter((item) => {
        const convertProductName = removeAccents(
          item.productName.toLowerCase()
        );
        const convertSearchQuery = removeAccents(
          searchQuery.trim().toLowerCase()
        );
        return convertProductName.includes(convertSearchQuery);
      });
      setProductsSearched(filterData);
    }
  };

  return (
    <div className="relative w-[460px] bg-white rounded shadow-md">
      <div className="flex gap-2 items-center border-b p-2 md:p-4">
        <span>
          <SearchIcon className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="focus:outline-none flex-[1]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => onClose()}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-3 md:p-6">
        <ul className=" max-h-[300px] overflow-auto">
          {productsSearched.length > 0 &&
            productsSearched.map((item) => {
              return (
                <SearchResultItem
                  key={uuidv4()}
                  productName={item.productName}
                  imageUrl={item.properties?.[0]?.imageUrl}
                  id={item._id}
                  onClose={onClose}
                />
              );
            })}

          {productsSearched.length === 0 && (
            <div>
              <div className="bg-white rounded h-[160px] w-full flex items-center flex-col gap-2 justify-center">
                <Inbox className="w-6 h-6 text-gray-600" />
                <p className="text-center text-gray-600">Rỗng</p>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchModal;
