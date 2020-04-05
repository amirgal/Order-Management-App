import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#F7F8F9",
      paper: "#E8F0F3",
    },
    text: {
      primary: "#0B2027",
      secondary: "#0B2027",
    },
    primary: {
      main: "#E8F0F3",
      contrastText: "#0B2027",
    },
    secondary: {
      main: "#3AC3AB",
      text: {
        color: "#000",
      },
    },
  },

  overrides: {
    MuiDrawer: {
      paper: {
        color: "#0B2027",
      },
    },
  },
  MuiListItemIcon: {
    root: {
      color: "#0B2027",
    },
  },
})

export default theme
