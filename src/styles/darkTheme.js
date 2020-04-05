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
      // contrastText: "#E2E2E3",
    },
  },
  // text: {
  //   primary: "#000000",
  //   secondary: "#000000",
  //   tabsBar: "#b6b6bf",
  // },
  // background: {
  //   paper: "#b6b6bf",
  // },
  //   },
  // shape: {
  //   borderRadius: 8,
  // },
  // overrides: {
  //   MuiDrawer: {
  //     paper: {
  //       background: "#26a69a",
  //     },
  //     MuiIcon: {
  //       root: {
  //         background: "#fff",
  //       },
  //     },
  //   },
  // },
  //     MuiButton: {
  //       root: {
  // fontWeight: "bold",
  // backgroundColor: "#b6b6bf",
  // margin: "10px",
  // "&:hover": {
  //   backgroundColor: "magenta",
  //         },
  //       },
  //     },
  // },
})

export default theme
