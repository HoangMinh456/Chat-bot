import Home from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import LoginPage from "@/pages/(website)/login/page";
import SignupPage from "@/pages/(website)/signup/page";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<Home />} />

          <Route path="login" element={<LoginPage/>}/>
          <Route path="signup" element={<SignupPage/>}/>

        </Route>
      </Routes>
    </>
  );
};

export default Router;
