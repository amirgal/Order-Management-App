import React, {useState} from "react"
import {observer} from "mobx-react"
import { Button, TextField, List, ListItem, Box } from "@material-ui/core"
import NotesPopup from "./NotesPopup"
import NotesIcon from '@material-ui/icons/Notes';

const NewStage = observer(props => {
  const [stageName, setStageName] = useState("")
  const [note, setNote] = useState("")
  const [notes, setNotes] = useState([])
  const [validation, setValidation] = useState("")
  const [validations, setValidations] = useState([])
  const toggleModal = () => props.toggleModal()
 
  const [anchor,setAnchor] = useState({openedPopoverId: null , anchorEl: null})
  
  const handlePopoverOpen = (event,id) => {
    setAnchor({openedPopoverId: id , anchorEl: event.target});
  };

  const handlePopoverClose = () => {
    setAnchor({openedPopoverId: null , anchorEl: null});
  };
  
  const addNewStage = () => {
    if(stageName.length > 0){
      props.addNewStage({ name: stageName, notes: notes, validate: validations })
      toggleModal()
    }else{
      alert('Stage name must be filled')
    }
  }
  const handleChange = e => {
    e.target.id === "stageNameInput"
      ? setStageName(e.target.value)
      : e.target.id === "noteInput"
      ? setNote(e.target.value)
      : setValidation(e.target.value)
  }
  const addNote = () => {
    if(note.length > 1){
      setNotes([...notes, note])
      setNote("")
    }else{
      alert('Note value must be filled')
    }
  }
  const addValidation = () => {
    if(validation.length > 1){
      setValidations([...validations, validation])
      setValidation("")
    }else{
      alert('Validation value must be filled')
    }
  }

  return (
    <Box bgcolor="background.paper" id="newStage">
      <List>
        <ListItem id="stageNameInput-item">
          <TextField
            id="stageNameInput"
            placeholder="Stage Name"
            value={stageName}
            onChange={handleChange}
          />
        </ListItem>
        <ListItem>
          <NotesIcon onMouseEnter={(e) => handlePopoverOpen(e,"notes")}
          onMouseLeave={handlePopoverClose} className="popup"/>
          <TextField
            id="noteInput"
            placeholder="Notes?"
            value={note}
            onChange={handleChange}
            autoComplete={null}
          />
          <Button onClick={addNote} color="secondary">Add Note</Button>
          {notes.length === 0 ? null :
          <NotesPopup notes={notes} anchor={anchor} id={"notes"} />}
        </ListItem>
        <ListItem>
          <NotesIcon onMouseEnter={(e) => handlePopoverOpen(e,"validations")}
          onMouseLeave={handlePopoverClose} className="popup"/>
          <TextField
            id="validationInput"
            placeholder="Stage Validation?"
            value={validation}
            onChange={handleChange}
          />
          <Button onClick={addValidation} color="secondary">Add Validation</Button>
          {validations.length === 0 ? null :
          <NotesPopup notes={validations} anchor={anchor} id={"validations"}/>}
        </ListItem>
      </List>
          <Button onClick={addNewStage} variant="contained" color="secondary" id="save-stage-btn">Save</Button>
    </Box>
  )
})

export default NewStage
