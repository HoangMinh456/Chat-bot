import { Route, Routes } from "react-router-dom";
import LayoutWebsite from "@/pages/(website)/layout";
import Home from "@/pages/(website)/home/page";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
