import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#222831",
      paper: "#323840",
    },
    text: {
      primary: "#E2E2E3",
      secondary: "#E2E2E3",
    },
    primary: {
      main: "#323840",
      contrastText: "#E2E2E3",
    },
    secondary: {
      main: "#3FD6BC",
    },
  },

  overrides: {
    MuiDrawer: {
      paper: {
        color: "#3FD6BC",
      },
    },
    MuiListItemIcon: {
      root: {
        color: "#3FD6BC",
      },
    },
    // MuiInputLabel: {
    //   outlined:{
    //     color: "#3FD6BC"
    //   }
    // }
  },
})

export default theme
