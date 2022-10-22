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
    fontFamily: "Overpass",
    h1: { fontSize: "2rem", fontWeight: "bold" },
    h2: { fontSize: "1.5rem", fontWeight: "bold" },
    h3: { fontSize: "1.25rem", fontWeight: "bold" },
    h4: { fontSize: "1rem", fontWeight: "bold" }
  }
});


export interface MainPageProps {
  children: React.ReactNode;
}

export const MainPage: React.FC<MainPageProps> = ({ children }) => {
  const name = "MainPage";
  return <ThemeProvider theme={theme}>
    <div className="App">
      <ApplicationBar name={name} />
      {children}
      <Footer />
    </div>
  </ThemeProvider>;
};
