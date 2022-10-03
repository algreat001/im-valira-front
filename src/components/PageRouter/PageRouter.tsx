import { Route, Routes } from "react-router-dom";

import { MainPage } from "pages/MainPage";

import { AboutPage } from "pages/AboutPage";
import { LandingPage } from "pages/LandingPage";
import { Product } from "../Product/Product";


export const PageRouter = () => {
  return <Routes>
    <Route path="/" element={<MainPage><LandingPage /></MainPage>}>
      <Route path="catalog">
        <Route path=":catalogId" element={<MainPage><LandingPage /></MainPage>} />
      </Route>
      <Route path="product">
        <Route path=":productId" element={<MainPage><Product /></MainPage>} />
      </Route>
    </Route>
    <Route path="about" element={<MainPage><AboutPage /></MainPage>} />
  </Routes>;
};
