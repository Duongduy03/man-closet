"use client";

import { getProductsInCart } from "@/redux/reducer/cart.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import MediumTable_SC from "./mediumTable/MediumTable_SC";
import { ControlBar_SC } from "..";
import { useCurrency } from "@/hooks";
import { ProductInCart } from "@/interfaces/product";

interface ProductInPayment {
  product_id: string;
  price: number;
  property: {
    quantity: number;
    color: string;
    size: string;
    imageUrl: string;
  };
  sub_total: number;
}

const ProductList_SC = () => {
  const dispatchThunk = useAppDispatch();
  const productList = useAppSelector((state) => state.cart.products);
  const [products, setProducts] = useState<ProductInCart[]>([]);
  const [productsSelected, setProductsSelected] = useState<ProductInCart[]>([]);
  const [billPrice, setBillPrice] = useState<number[]>([]);

  useEffect(() => {
    const promise = dispatchThunk(getProductsInCart());
    return () => {
      promise.abort();
    };
  }, [dispatchThunk]);

  useEffect(() => {
    setProductsSelected(
      products?.map((item) => {
        const data = {
          ...item,
          isSelected: false,
          totalPrice: item.price * item.quantity,
        };

        return data;
      })
    );
  }, [products]);

  useEffect(() => {
    const initialProducts = productList.map((item) => {
      return {
        ...item,
        totalPrice: item?.price * item?.quantity,
        selected: false,
      };
    });
    setProducts(initialProducts);
    setProductsSelected(initialProducts);
    setBillPrice(
      initialProducts.map((product) => {
        return product.totalPrice;
      })
    );
  }, [productList]);

  useEffect(() => {
    setProductsSelected(products.filter((product) => product.selected));
  }, [products]);

  useEffect(() => {
    setBillPrice(
      productsSelected.map((product) => {
        return product.totalPrice;
      })
    );
  }, [productsSelected]);

  const totalBillPrice = useCurrency(
    billPrice.length !== 0
      ? billPrice.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        )
      : 0
  );

  const handleUpdateQuantity = (
    product_id: string,
    color: string,
    size: string,
    quantity: number,
    totalPrice: number
  ) => {
    const updateProducts = products.map((product) => {
      if (
        product._id === product_id &&
        product.color === color &&
        product.size === size &&
        quantity > 0
      ) {
        return { ...product, quantity, totalPrice };
      } else if (
        product._id === product_id &&
        product.color === color &&
        product.size === size &&
        quantity === 0
      ) {
        return { ...product, quantity, totalPrice, selected: false };
      }
      return product;
    });
    setProducts(updateProducts);
  };

  const handleProductSelect = (
    product_id: string,
    color: string,
    size: string,
    isChecked: boolean
  ) => {
    const updateProducts = products.map((product) => {
      if (
        product._id === product_id &&
        product.color === color &&
        product.size === size
      ) {
        return { ...product, selected: isChecked };
      }
      return product;
    });
    setProducts(updateProducts);
  };

  const handleProductSelectAll = () => {
    const updateProduct = products.map((product) => {
      if (product.quantity > 0) {
        return {
          ...product,
          selected: true,
        };
      }
      return product;
    });
    setProducts(updateProduct);
  };

  const handleProductUnSelect = () => {
    const updateProduct = products.map((product) => {
      return {
        ...product,
        selected: false,
      };
    });

    setProducts(updateProduct);
  };

  const handleSelect = (id: string, selected: boolean) => {
    setProductsSelected((curr) =>
      curr.map((item) =>
        item._id === id ? { ...item, isSelected: selected } : item
      )
    );
  };

  return (
    <>
      <div>
        <h5 className="text-gray-800 font-semibold pb-6">
          Giỏ hàng ({products?.length})
        </h5>
        <div className="pb-6">
          {/* medium table */}

          <MediumTable_SC
            data={products}
            handleChangeSelect={handleProductSelect}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        </div>

        <ControlBar_SC
          totalBillPrice={totalBillPrice}
          productsSelected={productsSelected}
        />
      </div>
    </>
  );
};

export default ProductList_SC;
