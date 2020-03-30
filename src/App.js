import React, { Fragment, useEffect } from "react"
import "./App.css"
import { observer, inject } from "mobx-react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import OrderManager from "./Components/OrderManager"
import MyAppBar from "./Components/MyAppBar"
import Settings from "./Components/Settings"
import { StylesProvider } from "@material-ui/core/styles"
import CompletedOrders from './Components/CompletedOrdersComponents/CompletedOrders';
import Tracker from "./Components/Tracker"

const App = inject("ordersStore")(
  observer(props => {
    useEffect(() => {
      props.ordersStore.initializeAll()
    }, [])

    return (
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
            path="/Tracking"
            exact
            render={() => (
              <Fragment>
                <MyAppBar headline={"Tracker"} />
                <Tracker />
              </Fragment>
            )}
          />
        </Router>
      </StylesProvider>
    )
  })
)

export default App
