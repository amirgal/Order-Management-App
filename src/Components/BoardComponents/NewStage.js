import React, {useState} from "react"
import {observer} from "mobx-react"
import { Button, TextField, List, ListItem } from "@material-ui/core"

const NewStage = observer(props => {
  const [stageName, setStageName] = useState("")
  const [note, setNote] = useState("")
  const [notes, setNotes] = useState([])
  const [validation, setValidation] = useState("")
  const [validations, setValidations] = useState([])
  const toggleModal = () => props.toggleModal()
  
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
    <div id="newStage">
      <List>
        <ListItem>
          <TextField
            id="stageNameInput"
            placeholder="Stage Name"
            value={stageName}
            onChange={handleChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            id="noteInput"
            placeholder="Notes?"
            value={note}
            onChange={handleChange}
          />
          <Button onClick={addNote}>Add Note</Button>
        </ListItem>
        {notes.map((note,i) => (
          <ListItem key={i}>{note}</ListItem>
        ))}
        <ListItem>
          <TextField
            id="validationInput"
            placeholder="Stage Validation?"
            value={validation}
            onChange={handleChange}
          />
          <Button onClick={addValidation}>Add Validation</Button>
        </ListItem>
        {validations.map((validation,i) => (
          <ListItem key={i}>{validation}</ListItem>
        ))}
        <ListItem>
          <Button onClick={addNewStage}>Save</Button>
        </ListItem>
      </List>
    </div>
  )
})

export default NewStage
