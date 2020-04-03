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
import { StylesProvider } from "@material-ui/core/styles"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3b3c43",
      contrastText: "#b6b6bf"
    },
    secondary: {
      main: "#b6b6bf"
    },
    text: {
      primary: "#3b3c43",
      secondary: "#3b3c43",
      tabsBar: "#b6b6bf"
    },
    background: {
      paper: "#b6b6bf"
    }
  }
})

const App = inject("generalStore")(
  observer(props => {
    useEffect(() => {
      props.generalStore.initializeAll()
    }, [])

    return (
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Router>
            <Route
              path="/"
              exact
              render={() => <Redirect to="/order-manager" />}
            />
            <Route
              path="/order-manager"
              exact
              render={() => (
                <Fragment>
                  <MyAppBar headline={"Order Manager"} />
                  <OrderManager />
                  <BoardTabsBar />
                </Fragment>
              )}
            />
            <Route
              path="/completed-orders"
              exact
              render={() => (
                <Fragment>
                  <MyAppBar headline={"Completed Orders"} />
                  <CompletedOrders />
                </Fragment>
              )}
            />
            <Route
              path="/shipping"
              exact
              render={() => (
                <Fragment>
                  <MyAppBar headline={"Shipping"} />
                </Fragment>
              )}
            />
            <Route
              path="/settings"
              exact
              render={() => (
                <Fragment>
                  <MyAppBar headline={"Settings"} />
                  <Settings />
                </Fragment>
              )}
            />
            <Route
              path="/tracking/:id?"
              exact
              render={() => (
                <Fragment>
                  <Tracker />
                </Fragment>
              )}
            />
            <Route
              path="/analytics"
              exact
              render={() => (
                <Fragment>
                  <MyAppBar headline={"Analytics"} />
                  <Analytics />
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
