import "../../styles/Analytics.css"
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

    const prevStep = () => {
      props.prevStep()
    }
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
      <div>
        <div className="newBoardContainer">
          <div id="addStagesContainer">
            <Button id="addNewStage" onClick={toggleModal} variant="contained">
              Add Stage
            </Button>
          </div>
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
          {showModal ? (
            <AddsStageModal
              addNewStage={addNewStage}
              toggleModal={toggleModal}
              showModal={showModal}
            />
          ) : null}
        </div>
        <div className="navButtons">
          <Button id="prevStep" onClick={prevStep} variant="contained">
            Go Back
          </Button>
          <Button id="saveBoard" onClick={saveBoard} variant="contained">
            Save Board
          </Button>
        </div>
      </div>
    )
  })
)

export default AddStages
