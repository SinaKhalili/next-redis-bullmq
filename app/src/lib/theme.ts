import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  styles: {
    global: {
      "html, body": {
        backgroundColor: "transparent",
      },
    },
  },

  fonts: {
    heading: `'Helvectica', sans-serif`,
    body: `'Helvectica', sans-serif`,
  },
});
