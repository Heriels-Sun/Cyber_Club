import ReactDOM from "react-dom/client";
import { App } from "./app";
import dotenv from "dotenv";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { drawerTheme } from "./components/theme/drawer";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors, components: {Drawer: drawerTheme} });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
