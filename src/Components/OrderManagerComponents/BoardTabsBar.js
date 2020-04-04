import React from "react"
import { observer, inject } from "mobx-react"
import PropTypes from "prop-types"
import SwipeableViews from "react-swipeable-views"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import Board from "../Board"
import CreateBoard from "../BoardComponents/CreateBoard"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw"
  }
}))

const BoardTabsBar = inject("generalStore")(
  observer(props => {
    const classes = useStyles()
    const theme = useTheme()
    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
      setValue(newValue)
    }

    const handleChangeIndex = index => {
      setValue(index)
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {props.generalStore.boards.map((b, i) => (
              <Tab key={i} label={`${b.name}`} {...a11yProps(i)} />
            ))}
            <Tab
              label={<AddIcon />}
              {...a11yProps(props.generalStore.boards.length)}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {props.generalStore.boards.map((b, i) => (
            <TabPanel key={i} value={value} index={i} dir={theme.direction}>
              <Board key={i} board={b} />
            </TabPanel>
          ))}
          <TabPanel
            value={value}
            index={props.generalStore.boards.length}
            dir={theme.direction}
          >
            <CreateBoard />
          </TabPanel>
        </SwipeableViews>
      </div>
    )
  })
)

export default BoardTabsBar
