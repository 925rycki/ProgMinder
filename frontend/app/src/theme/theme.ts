import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "gray.50",
        color: "gray.900",
      },
    },
  },
});

export default theme;
