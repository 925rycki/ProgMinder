import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { SignUp } from "../components/pages/SignUp";
import { SignIn } from "../components/pages/SignIn";
import { Home } from "../components/pages/Home";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/"
        element={
          <HeaderLayout>
            <Home />
          </HeaderLayout>
        }
      />
      <Route path="*" element={<Page404 />} />
      {/* <Route path="/" element={<Private><Home/></Private>} /> */}
    </Routes>
  );
};
