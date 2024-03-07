import React from "react";
import style from "./userDashboardOrderItem.module.scss";

interface UserDashboardOrderItemProps {
  icon: React.ReactNode;
  title: string;
  popup: number;
}

// width: calc((100% / 1) - var(--ml));
//   margin-left: var(--ml);

const UserDashboardOrderItem = ({
  icon,
  popup,
  title,
}: UserDashboardOrderItemProps) => {

  const marginLeft = {"--ml" : "30px"} as React.CSSProperties

  return (
    <>
      <div className={style.user_dashboard_order_item} style={marginLeft}>
        ấdfa
      </div>
    </>
  );
};

export default UserDashboardOrderItem;
