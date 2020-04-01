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
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon
} from "@material-ui/icons"
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const createBoard = inject("generalStore")(
  observer(props => {
    const [name, setName] = useState("")
    const [selectedProductIds, setSelectedProductIds] = useState([])
    const products = props.generalStore.products.filter(o => !o.boardId)

    const handleNameChange = e => {
      setName(e.target.value)
    }

    return (
      <div id="createBoard">
        <List>
          <ListItem>
            <TextField
              style={{ width: 300 }}
              placeholder="Board Name"
              value={name}
              onChange={handleNameChange}
            />
          </ListItem>
          <ListItem>
            <Autocomplete
              multiple
              onChange={(e, v) => setSelectedProductIds(v.map(p => p.id))}
              id="chosen-clients"
              options={products}
              disableCloseOnSelect
              getOptionLabel={option => option.name}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </React.Fragment>
              )}
              style={{ width: 500 }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Products"
                />
              )}
            />
          </ListItem>
        </List>
      </div>
    )
  })
)

export default createBoard
