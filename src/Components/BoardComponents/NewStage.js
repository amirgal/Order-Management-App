import React, { useState, useEffect } from "react"
import { inject, observer } from "mobx-react"
import { Button, TextField, List, ListItem } from "@material-ui/core"

const NewStage = observer(props => {
  const [stageName, setStageName] = useState("")
  const [note, setNote] = useState("")
  const [notes, setNotes] = useState([])
  const [validation, setValidation] = useState("")
  const [validations, setValidations] = useState([])
  const toggleModal = () => props.toggleModal()
  const addNewStage = () => {
    props.addNewStage({ name: stageName, notes: notes, validate: validations })
    toggleModal()
  }
  const handleChange = e => {
    e.target.id === "stageNameInput"
      ? setStageName(e.target.value)
      : e.target.id === "noteInput"
      ? setNote(e.target.value)
      : setValidation(e.target.value)
  }
  const addNote = () => {
    setNotes([...notes, note])
    setNote("")
  }
  const addValidation = () => {
    setValidations([...validations, validation])
    setValidation("")
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
        {notes.map(note => (
          <ListItem>{note}</ListItem>
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
        {validations.map(validation => (
          <ListItem>{validation}</ListItem>
        ))}
        <ListItem>
          <Button onClick={addNewStage}>Save</Button>
        </ListItem>
      </List>
    </div>
  )
})

export default NewStage
