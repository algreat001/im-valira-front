import React from "react";

import { ApplicationBar } from "components/AppBar/AppBar";
import { Footer } from "components/Footer/Footer";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8D7694"
    },
    secondary: {
      main: "#FFF0DE"
    }
  },
  typography: {
    fontFamily: "Overpass"
  }
});


export interface MainPageProps {
  children: React.ReactNode;
}

export const MainPage = ({ children }: MainPageProps) => {
  const name = "MainPage";
  return <ThemeProvider theme={theme}>
    <div className="App">
      <ApplicationBar name={name} />
      {children}
      <Footer />
    </div>
  </ThemeProvider>;
};
