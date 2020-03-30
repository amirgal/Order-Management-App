import React, { Fragment } from "react"
import "./App.css"
import { observer } from "mobx-react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import OrderManager from "./Components/OrderManager"
import MyAppBar from "./Components/MyAppBar"
import { StylesProvider } from "@material-ui/core/styles"

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
      </Router>
    </StylesProvider>
  )
})

export default App
