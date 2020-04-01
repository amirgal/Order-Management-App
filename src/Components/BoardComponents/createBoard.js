import React, { useState, useEffect } from "react"
import { inject, observer } from "mobx-react"
import {
  Button,
  TextField,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Chip,
  IconButton,
  List,
  ListItem
} from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import clsx from "clsx"
import { makeStyles, useTheme } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}))
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const createBoard = inject("generalStore")(
  observer(props => {
    const [name, setName] = useState("")
    const [selectedProducts, setSelectedProducts] = useState([])
    const products = props.generalStore.products

    const handleNameChange = e => {
      setName(e.target.value)
    }

    // const handleChange = e => {
    //   e.target.name === "apiKey"
    //     ? setApiKey(e.target.value)
    //     : e.target.name === "password"
    //     ? setPassword(e.target.value)
    //     : setShopName(e.target.value)
    // }

    const classes = useStyles()
    const open = Boolean(anchorEl)

    return (
      <div id="createBoard">
        <List>
          <ListItem>
            <TextField
              style={{ width: 300 }}
              classes={classes}
              placeholder="Board Name"
              value={name}
              onChange={handleNameChange}
            />
            <Button
              onClick={addName}
              variant="contained"
              style={{ width: 250 }}
            >
              Add employee
            </Button>
          </ListItem>
          <ListItem>
            <Autocomplete
              classes={classes}
              onChange={(e, v) => setEmployee(v)}
              options={products.filter(p => !p.isSelected)}
              getOptionLabel={product => product.name}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Select Employee" />
              )}
            />
            <Button
              onClick={modifyEmployee}
              variant="contained"
              style={{ width: 250 }}
            >
              remove from roster
            </Button>
          </ListItem>
          <ListItem>
            <Autocomplete
              classes={classes}
              onChange={(e, v) => setEmployee(v)}
              options={props.generalStore.employees.filter(e => !e.isActive)}
              getOptionLabel={option => option.name}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Select inActive Employee" />
              )}
            />
            <Button
              onClick={modifyEmployee}
              variant="contained"
              style={{ width: 250 }}
            >
              add to roster
            </Button>
          </ListItem>
        </List>
        <div className="sync-shop">
          {synced ? (
            <div id="storeSynced">
              Store already synced - you can re-sync if you wish
            </div>
          ) : null}
          <div>
            <div className="shop-details">
              <IconButton onMouseEnter={handleClick} onMouseLeave={handleClick}>
                <HelpIcon />
              </IconButton>
              <Popper
                classes={classes}
                id={id}
                className="popper"
                open={open}
                anchorEl={anchorEl}
              >
                <div className="api-pop">
                  you can find your apiKey, password and shop name under the
                  "App" tab in your shopify's admin page.
                </div>
              </Popper>
              <Input
                classes={classes}
                className="sync-input"
                type="text"
                name="apiKey"
                placeholder="Enter Api key"
                value={apiKey}
                onChange={handleChange}
              />
              <Input
                classes={classes}
                className="sync-input"
                id="standard-adornment-password"
                type="text"
                name="password"
                placeholder="Enter shop password"
                value={password}
                onChange={handleChange}
              />
              <Input
                classes={classes}
                className="sync-input"
                type="text"
                name="shopName"
                placeholder="Enter shop name"
                value={shopName}
                onChange={handleChange}
              />
              <Button
                onClick={makeSync}
                style={{ margin: 10 }}
                variant="contained"
              >
                Sync With Store
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  })
)

export default createBoard
