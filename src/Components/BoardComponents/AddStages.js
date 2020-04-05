import "../../styles/Analytics.css"
import React, { useState} from "react"
import { inject, observer } from "mobx-react"
import {
  Button,
  List,
  ListItem,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel
} from "@material-ui/core"
import AddsStageModal from "./AddStageModal"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const AddStages = inject("generalStore")(
  observer(props => {
    const boardName = props.name
    const productIds = props.productIds
    const [stages, setStages] = useState([])
    const [showModal, setShowModal] = useState(false)
    const board = { name: boardName, stages: stages, products: productIds }

    // const prevStep = () => {
    //   props.prevStep()
    // }
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
      <div className="newBoardContainer">
        <div className="newStagesContainer">
          {stages.map(s => (
            <ExpansionPanel className="stageBox" key={s.name}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3>{s.name}</h3>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {s.notes.length > 0 ? <h3>Notes:</h3> : null}
                  {s.notes.map((note,i) => (
                    <ListItem key={i}>
                      <p>{note}</p>
                    </ListItem>
                  ))}
                </List>
                <List>
                  {s.validate.length > 0 ? <h3>Validations:</h3> : null}
                  {s.validate.map((validation,i) => (
                    <ListItem key={i}>
                      <p>{validation}</p>
                    </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
          <div id="addNewStage" className="stageBox" onClick={toggleModal} variant="contained">
            <h1>+</h1>
          </div>
          {showModal ? (
            <AddsStageModal
              addNewStage={addNewStage}
              toggleModal={toggleModal}
              showModal={showModal}
            />
          ) : null}
        </div>
        <div className="navButtons">
          <Button id="saveBoard" onClick={saveBoard} variant="contained">
            Save Board
          </Button>
        </div>
      </div>
    )
  })
)

export default AddStages
