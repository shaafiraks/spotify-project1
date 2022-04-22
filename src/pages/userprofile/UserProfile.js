import React from "react";
import { useSelector } from "react-redux";

function index() {
  const access_token = useSelector((state) => state.account.accessToken);
  console.log(access_token);
  return <div>index</div>;
}

export default index;
