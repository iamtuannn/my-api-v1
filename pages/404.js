import Router from "next/router";
import { useEffect } from "react";

function Page404() {
  return useEffect(() => {
    Router.push("/");
  }, []);
}
export default Page404;
