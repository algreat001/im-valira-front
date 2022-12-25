import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from "config";

import { MainPage } from "pages/MainPage";

import { AboutPage } from "pages/AboutPage";
import { LandingPage } from "pages/LandingPage";
import { ProductPage } from "pages/ProductPage";
import { CartPage } from "pages/CartPage";
import { SearchPage } from "pages/SearchPage";
import { CheckoutPage } from "pages/CheckoutPage";

export const PageRouter = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage><LandingPage /></MainPage>} />
      <Route path={config.route.catalog.path}>
        <Route path={config.route.catalog.param} element={<MainPage><LandingPage /></MainPage>} />
      </Route>
      <Route path={config.route.product.path}>
        <Route path={config.route.product.param} element={<MainPage><ProductPage /></MainPage>} />
      </Route>
      <Route path="about" element={<MainPage><AboutPage /></MainPage>} />
      <Route path={config.route.cart.path} element={<MainPage><CartPage /></MainPage>} />
      <Route path={config.route.checkout.path} element={<MainPage><CheckoutPage /></MainPage>} />
      <Route path={config.route.search.path} element={<MainPage><SearchPage /></MainPage>} />
    </Routes>
  </BrowserRouter>;
};
