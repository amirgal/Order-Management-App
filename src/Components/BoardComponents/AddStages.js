import "../../styles/Analytics.css"
import React, { useState } from "react"
import SaveIcon from "@material-ui/icons/Save"
import AddIcon from "@material-ui/icons/Add"
import { inject, observer } from "mobx-react"
import {
  Button,
  List,
  ListItem,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
  Box,
  Fab,
} from "@material-ui/core"
import AddsStageModal from "./AddStageModal"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const AddStages = inject("generalStore")(
  observer((props) => {
    const boardName = props.name
    const productIds = props.productIds
    const [stages, setStages] = useState([])
    const [showModal, setShowModal] = useState(false)
    const board = { name: boardName, stages: stages, products: productIds }

    // const prevStep = () => {
    //   props.prevStep()
    // }
    const addNewStage = (newStage) => {
      setStages([...stages, newStage])
    }
    const toggleModal = () => {
      setShowModal(!showModal)
    }
    const saveBoard = () => {
      props.generalStore.createBoard(board)
    }

    return (
      <Box className="newBoardContainer">
        <Box className="navButtons">
          <Fab
            variant="extended"
            color="secondary"
            aria-label="add"
            className="saveBoard"
            onClick={saveBoard}
          >
            Save
            <SaveIcon />
          </Fab>
          <Fab
            variant="extended"
            color="secondary"
            aria-label="add"
            className="addStageBtn"
            onClick={toggleModal}

          >
            Add Stage
            <AddIcon />
          </Fab>
        </Box>
        <Box className="newStagesContainer">
          {stages.map((s) => (
            <ExpansionPanel className="stageBox" key={s.name}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="newStageHeader"
              >
                <h4>{s.name}</h4>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="newStageDetails">
                <List>
                  {s.notes.length > 0 ? <h5>Notes:</h5> : null}
                  {s.notes.map((note, i) => (
                    <ListItem key={i}>
                      <h5>{note}</h5>
                    </ListItem>
                  ))}
                </List>
                <List>
                  {s.validate.length > 0 ? <h5>Validations:</h5> : null}
                  {s.validate.map((validation, i) => (
                    <ListItem key={i}>
                      <h5>{validation}</h5>
                    </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
          {/* <Box
            bgcolor="background.paper"
            id="addNewStage"
            // className="stageBox"
            onClick={toggleModal}
            variant="contained"
          > */}
          {/* <Fab size="small" color="secondary" aria-label="add">
              <AddIcon />
            </Fab> */}
          {/* </Box> */}
          {showModal ? (
            <AddsStageModal
              addNewStage={addNewStage}
              toggleModal={toggleModal}
              showModal={showModal}
            />
          ) : null}
        </Box>
        {/* <Box className="navButtons">
          <Button id="saveBoard" onClick={saveBoard} variant="contained">
            Save Board
          </Button>
        </Box> */}
      </Box>
    )
  })
)

export default AddStages
