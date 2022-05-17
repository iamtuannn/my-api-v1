import Router from "next/router";
import { useEffect } from "react";

function Error404() {
  return useEffect(() => {
    Router.push("/");
  }, []);
}
export default Error404;
