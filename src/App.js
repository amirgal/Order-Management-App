import "./App.css"
import React, { Fragment, useEffect } from "react"
import { observer, inject } from "mobx-react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import OrderManager from "./Components/OrderManagerComponents/OrderManager"
import MyAppBar from "./Components/AppBarComponents/MyAppBar"
import Settings from "./Components/SettingsComponents/Settings"
import CompletedOrders from "./Components/CompletedOrdersComponents/CompletedOrders"
import Tracker from "./Components/TrackerComponents/Tracker"
import Analytics from "./Components/AnalyticsComponents/Analytics"
import BoardTabsBar from "./Components/OrderManagerComponents/BoardTabsBar"
import Login from "./Components/Login"
import { StylesProvider } from "@material-ui/core/styles"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/core/styles"
import ShippingOrders from "./Components/ShippingComponents/ShippingOrders"
import SignUp from "./Components/SignUpComponents/SignUp"
import muiTheme from "./styles/muiTheme"
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#3b3c43",
//       contrastText: "#000000"
//     },
//     secondary: {
//       main: "#b6b6bf",
//       contrastText: "#000000"
//     },
//     text: {
//       primary: "#000000",
//       secondary: "#000000",
//       tabsBar: "#b6b6bf"
//     },
//     background: {
//       paper: "#b6b6bf"
//     }
//   }
// })

const App = inject("generalStore")(
  observer((props) => {
    props.generalStore.adminId = localStorage.adminId
    if (props.generalStore.adminId) {
      props.generalStore.getAdminData()
    }
    return (
      <ThemeProvider theme={muiTheme}>
        <StylesProvider injectFirst>
          <Router>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/order-manager" />}
            />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/signup" render={() => <SignUp />} />
            <Route
              path="/order-manager"
              exact
              render={() =>
                props.generalStore.adminId ? (
                  <Fragment>
                    <MyAppBar headline={"Order Manager"} />
                    <OrderManager />
                    <BoardTabsBar />
                  </Fragment>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/shipping"
              exact
              render={() =>
                props.generalStore.adminId ? (
                  <Fragment>
                    <MyAppBar headline={"Shipping"} />
                    <ShippingOrders />
                  </Fragment>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/completed-orders"
              exact
              render={() =>
                props.generalStore.adminId ? (
                  <Fragment>
                    <MyAppBar headline={"Completed Orders"} />
                    <CompletedOrders />
                  </Fragment>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/analytics"
              exact
              render={() =>
                props.generalStore.adminId ? (
                  <Fragment>
                    <MyAppBar headline={"Analytics"} />
                    <Analytics />
                  </Fragment>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/settings"
              exact
              render={() =>
                props.generalStore.adminId ? (
                  <Fragment>
                    <MyAppBar headline={"Settings"} />
                    <Settings />
                  </Fragment>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/tracking/:id?"
              render={() => (
                <Fragment>
                  <Tracker />
                </Fragment>
              )}
            />
          </Router>
        </StylesProvider>
      </ThemeProvider>
    )
  })
)

export default App
