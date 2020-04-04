import "../../styles/Analytics.css"
import React, { useState, useEffect } from "react"
import { inject, observer } from "mobx-react"
import { Button, TextField, Checkbox, List, ListItem } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon
} from "@material-ui/icons"
import AddStages from "./AddStages"
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const CreateBoard = inject("generalStore")(
  observer(props => {
    const [name, setName] = useState("")
    const [productIds, setProductIds] = useState([])
    const products = props.generalStore.products.filter(p => !p.boardId)
    const [step, setStep] = useState(1)
    
    const handleNameChange = e => {
      setName(e.target.value)
    }
    const nextStep = () => {
      setStep(step + 1)
    }
    const prevStep = () => {
      setStep(step - 1)
    }
    const nameEntered = () => {
      return name.length > 0
    }
    const productsChosen = () => {
      return productIds.length > 0
    }

    switch (step) {
      case 1:
        return (
          <div id="createBoard">
            <List>
              <ListItem>
                <TextField
                  className="boardNameInput"
                  placeholder="Board Name"
                  value={name}
                  onChange={handleNameChange}
                />
              </ListItem>
              <ListItem>
                <Autocomplete
                  multiple
                  onChange={(e, v) => setProductIds(v.map(p => p._id))}
                  id="products"
                  options={products}
                  disableCloseOnSelect
                  getOptionLabel={option => option.name}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
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
              <ListItem>
                <Button
                  onClick={nextStep}
                  disabled={(!nameEntered(), !productsChosen())}
                  variant="contained"
                >
                  Next
                </Button>
              </ListItem>
            </List>
          </div>
        )
      case 2:
        return (
          <AddStages name={name} productIds={productIds} prevStep={prevStep} />
        )
    }
  })
)

export default CreateBoard
