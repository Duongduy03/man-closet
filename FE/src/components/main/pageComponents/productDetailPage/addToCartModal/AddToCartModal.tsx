"use client";

import { useCurrency, useUserInfo } from "@/hooks";
import { IProduct, Variant } from "@/interfaces/product";
import { cn } from "@/lib/utils";
import { addProductToCart } from "@/redux/reducer/cart.reducer";
import { useAppDispatch } from "@/redux/store";
import { commonErrorToast, commonSuccessToast } from "@/utils/notify";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./addToCartModal.scss";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface AddToCardModalProps {
  onClose: () => void;
  isOpen: boolean;
  product: IProduct;
}

interface ErrorMessage {
  message: string
}

const AddToCartModal = ({ isOpen, onClose, product }: AddToCardModalProps) => {
  const router = useRouter();
  const user = useUserInfo();

  const [sizeSelected, setSizeSelected] = useState("");
  const [colorSelected, setColorSelected] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [inventoryQuantity, setInventoryQuantity] = useState(0);
  const [amount, setAmount] = useState("1");
  const [property, setProperty] = useState("");
  const [isDisableAdd, setIsDisableAdd] = useState(false);

  const dispatchThunk = useAppDispatch();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    document.body.style.marginRight = `${
      window.innerWidth - document.documentElement.clientWidth
    }px`;
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
      document.body.style.marginRight = "0px";
    };
  }, [isOpen]);

  useEffect(() => {
    setImageSelected(product.properties?.[0]?.imageUrl);
  }, [product]);

  useEffect(() => {
    getProductQuantityExist();
    wrapProperty();
  }, [colorSelected, sizeSelected]);

  useEffect(() => {
    handleChangeImageSelected();
  }, [colorSelected]);

  useEffect(() => {
    toggleDisableAdd();
    setAmountEqualInventoryWhenHigher();
  }, [inventoryQuantity, amount]);

  // ===================================

  const wrapProperty = () => {
    if (sizeSelected === "" || colorSelected === "") {
      setProperty(sizeSelected || colorSelected);
    } else if (sizeSelected !== "" && colorSelected !== "") {
      setProperty([sizeSelected, colorSelected].join(", "));
    }
  };

  // ===================================

  const getProductQuantityExist = () => {
    const indexOfColor = product.properties?.findIndex(
      (item) => item.color === colorSelected
    );
    const indexOfSize = product.properties?.[indexOfColor]?.variants.findIndex(
      (item) => item.size === sizeSelected
    );
    const quantity =
      product.properties?.[indexOfColor]?.variants?.[indexOfSize]?.quantity;
    setInventoryQuantity(quantity);
  };

  // ===================================

  const handleChangeImageSelected = () => {
    const indexOfColor = product.properties?.findIndex(
      (item) => item.color === colorSelected
    );
    const image = product.properties?.[indexOfColor]?.imageUrl;
    setImageSelected(image);
  };

  // ===================================

  const convertVariantArr = (arr: Array<Array<Variant>>) => {
    if (!arr) {
      return;
    }

    
    const result = arr.map((item) => {

      return item;
    }).flat();


    return result;
  };

  const variantArr = convertVariantArr(
    product.properties?.map((item) => item.variants)
  );

  // lay unique Color array
  const colorArray = product.properties
    ?.map((item) => item.color)
    .filter(
      (value, index, self) => self.findIndex((m) => m === value) === index
    );

  // lay unique Size array
  const sizeArray:any = variantArr
    ?.map((item) => item.size)
    ?.filter(
      (value, index, self) => self.findIndex((m) => m === value) === index
    );
    console.log(variantArr);
    

  // ===================================

  const checkAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = e.target.value;
    if (valueInput.match(/^[0-9]*$/)) {
      if (+valueInput > inventoryQuantity) {
        setAmount(inventoryQuantity.toString());
      } else {
        setAmount(valueInput);
      }
    }
  };

  const toggleDisableAdd = () => {
    if (
      inventoryQuantity > 0 &&
      +amount <= inventoryQuantity &&
      amount !== ""
    ) {
      setIsDisableAdd(false);
    } else {
      setIsDisableAdd(true);
    }
  };

  const setAmountEqualInventoryWhenHigher = () => {
    if (+amount > inventoryQuantity && inventoryQuantity > 0 && amount !== "") {
      setAmount(inventoryQuantity.toString());
    }
  };

  const checkAmountInputBlur = () => {
    if (amount.match(/^0+/) || amount === "") {
      setAmount("1");
    }
  };

  const incrementAmount = () => {
    if (+amount < inventoryQuantity) {
      setAmount((+amount + 1).toString());
    }
  };

  const decrementAmount = () => {
    if (+amount > 1) {
      setAmount((+amount - 1).toString());
    } else {
      setAmount("1");
    }
  };

  // ===================================

  const addToCart = () => {
    const userId = user?._id;
    if (!userId) {
      router.push("/auth");
      commonErrorToast("Bạn cần đăng nhập để thực hiện hành động này");
    } else {
      let validData = false;
      if (
        inventoryQuantity > 0 &&
        +amount > 0 &&
        !isNaN(+amount) &&
        inventoryQuantity >= +amount
      ) {
        validData = true;
      }

      const data = {
        user_id: userId,
        product: {
          _id: product._id,
          name: product.productName,
          quantity: +amount,
          imageUrl: imageSelected,
          color: colorSelected,
          size: sizeSelected,
          price: product.price,
        },
      };

      if (validData) {
        dispatchThunk(addProductToCart(data))
          .unwrap()
          .then(() => {
            commonSuccessToast("Thêm sản phẩm thành công");
            onClose();
          })
          .catch((error: ErrorMessage) => {
            toast.error(error.message)
          });
      } else {
        toast.error("Vui lòng xem lại dữ liệu đã lựa chọn");
        console.log("no");
      }
    }
  };

  return (
    <>
      <div
        onClick={() => onClose()}
        className={cn(
          "blur_layer inset-0 fixed z-30",
          isOpen ? "block" : "hidden"
        )}
      ></div>

      <div
        className={cn(
          "atc_modal fixed z-50 md:top-0 bottom-0 right-0 bg-white rounded-t-lg md:rounded-l w-full h-[80%] md:h-screen md:w-[46%] lg:w-[360px] p-3 md:p-5  block",
          isOpen ? "open" : "close"
        )}
      >
        <div className="flex flex-col w-full h-full">
          <div className="flex justify-between items-start">
            <div className="flex justify-between items-start gap-2 md:gap-4">
              <div className="relative w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded overflow-hidden">
                <Image
                  src={imageSelected}
                  loading="lazy"
                  alt="product-image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex flex-col h-[60px] md:h-[100px]">
                <h4 className="font-medium">{useCurrency(product.price)}</h4>
                <h5 className="py-1  font-medium text-gray-800">{property}</h5>
                <h5 className=" mt-auto">
                  <span className=" font-medium text-gray-600">
                    Trong kho:{" "}
                  </span>
                  {colorSelected !== "" && sizeSelected !== "" ? (
                    inventoryQuantity > 0 ? (
                      <span className=" font-medium text-gray-800">
                        {inventoryQuantity}
                      </span>
                    ) : (
                      <span className=" font-medium text-rose-500">
                        Hết hàng
                      </span>
                    )
                  ) : (
                    ""
                  )}
                </h5>
              </div>
            </div>
            <div className="p-1">
              <X onClick={() => onClose()} className="w-5 h-5 cursor-pointer" />
            </div>
          </div>

          <div className="py-4 flex-[1]">
            <div className="py-2 md:py-4">
              <h4 className="pb-2  text-gray-600 font-medium">Kích cỡ</h4>
              <ul className="flex flex-wrap gap-2 gap-y-2">
                {sizeArray?.map((size:any) => (
                  <li key={uuidv4()}>
                    <button
                      className={cn(
                        "border border-gray-300 rounded px-3 py-1",
                        sizeSelected === size
                          ? "text-[--secondary-color] border-[--secondary-color]"
                          : "text-gray-800"
                      )}
                      onClick={() => setSizeSelected(size)}
                    >
                      {size}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-2 md:py-4">
              <h4 className="pb-2  text-gray-600 font-medium">Màu sắc</h4>
              <ul className="flex flex-wrap gap-2 gap-y-2">
                {colorArray?.map((color) => (
                  <li key={uuidv4()}>
                    <button
                    style={{backgroundColor:color,width:"50px",height:"30px"}}
                      className={cn(
                        `border border-gray-300 px-3 rounded py-1`,
                        colorSelected === color
                          ? "text-[--secondary-color] border-[--secondary-color]"
                          : "text-gray-800"
                      )}
                      onClick={() => setColorSelected(color)}
                    >
                     
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-2 md:py-4">
              <div className="flex items-center justify-between">
                <h4 className=" text-gray-600 font-medium">Số lượng</h4>
                <div className="flex items-center gap-x-2">
                  <button onClick={() => decrementAmount()} className="p-[6px]">
                    <Minus
                      className={cn(
                        "w-5 h-5",
                        +amount <= 1 || amount === ""
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-800 cursor-pointer"
                      )}
                    />
                  </button>
                  <input
                    onBlur={() => checkAmountInputBlur()}
                    type="text"
                    value={
                      +amount > inventoryQuantity ? inventoryQuantity : amount
                    }
                    inputMode="numeric"
                    onChange={(e) => checkAmountInput(e)}
                    className="focus:outline-none w-[50px] text-center"
                  />
                  <button onClick={() => incrementAmount()} className="p-[6px]">
                    <Plus
                      className={cn(
                        "w-5 h-5",
                        +amount < inventoryQuantity
                          ? "text-gray-800 cursor-pointer"
                          : "text-gray-400 cursor-not-allowed"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <button
              onClick={() => addToCart()}
              disabled={isDisableAdd ? true : false}
              className={cn(
                "block w-full py-2  rounded text-white font-medium transition-all",
                isDisableAdd
                  ? "text-zinc-300 bg-zinc-200 cursor-not-allowed"
                  : "text-white bg-zinc-800 hover:bg-zinc-700"
              )}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCartModal;
