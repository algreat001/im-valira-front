import { Route, Routes } from "react-router-dom";

import { MainPage } from "pages/MainPage";

import { AboutPage } from "pages/AboutPage";
import { LandingPage } from "pages/LandingPage";


export const PageRouter = () => {
  return <Routes>
    <Route path="/" element={<MainPage><LandingPage /></MainPage>} />
    <Route path="about" element={<MainPage><AboutPage /></MainPage>} />
  </Routes>;
};
