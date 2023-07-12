import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { SignUp } from "../components/pages/SignUp";
import { SignIn } from "../components/pages/SignIn";
import { Home } from "../components/pages/Home";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { Timeline } from "../components/pages/Timeline";
import { Report } from "../components/pages/Report";
import { Log } from "../components/pages/Log";
import { Profile } from "../components/pages/Profile";

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
      <Route
        path="/timeline"
        element={
          <HeaderLayout>
            <Timeline />
          </HeaderLayout>
        }
      />
      <Route
        path="/report"
        element={
          <HeaderLayout>
            <Report />
          </HeaderLayout>
        }
      />
      <Route
        path="/log"
        element={
          <HeaderLayout>
            <Log />
          </HeaderLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <HeaderLayout>
            <Profile />
          </HeaderLayout>
        }
      />
      <Route path="*" element={<Page404 />} />
      {/* <Route path="/" element={<Private><Home/></Private>} /> */}
    </Routes>
  );
};
