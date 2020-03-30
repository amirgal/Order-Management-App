import React, { Fragment } from "react"
import "./App.css"
import { observer } from "mobx-react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import OrderManager from "./Components/OrderManager"
import MyAppBar from "./Components/MyAppBar"
import Settings from "./Components/Settings"
import { StylesProvider } from "@material-ui/core/styles"
import Tracker from "./Components/Tracker"

const App = observer(props => {
  return (
    <StylesProvider injectFirst>
      <Router>
        <Route
          path="/ordermanager"
          exact
          render={() => (
            <Fragment>
              <MyAppBar headline={"Order Manager"} />
              <OrderManager />
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

export default App
