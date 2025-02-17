import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { Card } from "./components/Card/Card";
import { CardBody } from "./components/Card/CardBody";
import { Button } from "./components/Button/Button";


const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme(config, {
  components: {
    Button,
    Card,
    CardBody
  },

  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#797D9A",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "150": "#D1D5DB",
      "100": "#E7E7E9",
      "50": "#F9FAFB",
    },
    lime: {
      "400": "#F0FDF4",
      "500": "#C4EBD2",
      "600": "#15803D",
    },
    orange: {
      "400": "#FEFCE8",
      "500": "#F3E6BB",
      "600": "#854D0E",
    },
    littlePink: {
      "400": "#FEF2F2",
      "450": "#FEE2E2",
      "500": "#FADDDD",
      "600": "#B91C1C",
    },
    littleGray: {
      "300": "#f6f6f6",
      "400": "#F9FAFB",
      "500": "#EBEDEE",
      "600": "#4B5563",
    },
    indigo: {
      "300": "#6366F1",
      "400": "#4F46E5",
      "500": "#342BE1",
      "600": "#261DCD",
      "700": "#2119B0",
    },
    customRed: {
      "400": "#EF4444",
      "500": "#DC2626",
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  styles: {
    global: {
      body: {
        bg: 'white'
      }
    }
  }
})
