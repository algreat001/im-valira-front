import React from "react";
import { storesContext } from "stores/RootStore";

export const useStores = () => React.useContext(storesContext);
