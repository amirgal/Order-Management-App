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
import AddsStageModal from "./AddStageModal"

const AddStages = inject("generalStore")(
  observer(props => {
    const boardName = props.name
    const productIds = props.productIds
    const [stages, setStages] = useState([])
    const [showModal, setShowModal] = useState(false)
    const board = { name: boardName, stages: stages, products: productIds }

    const prevStep = () => props.prevStep()
    const addNewStage = newStage => {
      setStages([...stages, newStage])
    }
    const toggleModal = () => {
      setShowModal(!showModal)
    }
    const saveBoard = () => {
      props.generalStore.createBoard(board)
    }

    return (
      <div
        id="addStages"
        style={{
          gridTemplateColumns: `repeat(${stages.length + 3}, 1fr)`
        }}
      >
        <Button onClick={prevStep} variant="contained">
          Go Back
        </Button>
        {stages.map(s => (
          <div>
            <h3>{s.name}</h3>
            {s.notes.map(n => (
              <p>{n}</p>
            ))}
            {s.validate.map(n => (
              <p>{n}</p>
            ))}
          </div>
        ))}
        <Button onClick={toggleModal} variant="contained">
          Add Stage
        </Button>
        <Button onClick={saveBoard} variant="contained">
          Save Board
        </Button>
        {showModal ? (
          <AddsStageModal
            addNewStage={addNewStage}
            toggleModal={toggleModal}
            showModal={showModal}
          />
        ) : null}
      </div>
    )
  })
)

export default AddStages
