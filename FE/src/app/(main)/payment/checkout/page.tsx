import {
  CheckoutInfo,
  ProductList,
  UserAddress,
} from "@/components/main/pageComponents/checkoutPage";
import React from "react";

const CheckoutPage = () => {
  return (
    <>
      <section className="section_container">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-[1]">
            <article className="pb-6">
              <UserAddress />
            </article>
            <article>
              <ProductList />
            </article>
          </div>

          <aside className="w-full lg:w-[360px]">
            <CheckoutInfo/>
          </aside>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
