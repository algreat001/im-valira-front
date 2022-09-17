import React from "react";

import { ApplicationBar } from "components/AppBar/AppBar";
import { Footer } from "components/Footer/Footer";

export interface MainPageProps {
  children: React.ReactNode;
}

export const MainPage = ({ children }: MainPageProps) => {
  const name = "MainPage";
  return <div className="App">
    <ApplicationBar name={name} />
    {children}
    <Footer />
  </div>;
};
