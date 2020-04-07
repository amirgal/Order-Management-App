import React, { useState } from "react"
import { inject, observer } from "mobx-react"
import { Button, TextField, Checkbox, List, ListItem, Box } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from "@material-ui/icons"
import AddStages from "./AddStages"
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const CreateBoard = inject("generalStore")(
  observer((props) => {
    const [name, setName] = useState("")
    const [productIds, setProductIds] = useState([])
    const products = props.generalStore.products.filter((p) => !p.boardId)
    const [step, setStep] = useState(1)

    const handleNameChange = (e) => {
      setName(e.target.value)
    }
    const nextStep = () => {
      setStep(step + 1)
    }
    const prevStep = () => {
      setStep(step - 1)
    }

    const validateInputs = () => {
      if (name.length < 1) {
        return true
      } else if (productIds.length < 1) {
        return true
      } else {
        return false
      }
    }

    switch (step) {
      case 1:
        return (
          <Box bgcolor='background.paper' id="createBoard">
            <TextField
              className="boardNameInput"
              placeholder="Add Board Name"
              value={name}
              onChange={handleNameChange}
              color="secondary"
              inputProps="secondary"
            />
            <Autocomplete
              multiple
              onChange={(e, v) => setProductIds(v.map((p) => p._id))}
              id="products"
              options={products}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Products"
                />
              )}
            />
            <Button id='nextStep'
              onClick={nextStep}
              disabled={validateInputs()}
              variant="contained"
              color='secondary'
            >
              Next
            </Button>
          </Box>
        )
      case 2:
        return (
          <AddStages name={name} productIds={productIds} prevStep={prevStep} />
        )
      default:
        return null
    }
  })
)

export default CreateBoard
