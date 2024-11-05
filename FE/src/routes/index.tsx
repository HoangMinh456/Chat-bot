import Chat2Component from "@/pages/(website)/home/_components/Chat2";
import Home from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import LoginPage from "@/pages/(website)/login/page";
import SignupPage from "@/pages/(website)/signup/page";
import { Route, Routes } from "react-router-dom";
import Chat from "@/pages/(website)/home/_components/Chat";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route path="/" element={<Home />} >
            <Route index element={<Chat />} />
            <Route path="chat/:id" element={<Chat2Component />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
