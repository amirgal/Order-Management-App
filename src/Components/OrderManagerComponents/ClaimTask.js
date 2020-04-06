import React, { useState } from "react"
import { inject, observer } from "mobx-react"
import {
  Button,
  TextField,
  Typography,
  List,
  ListItem,
} from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"

const ClaimTask = inject(
  "generalStore",
  "detailsWindowStore"
)(
  observer((props) => {
    const [employee, setEmployee] = useState(null)
    // const currOrder = props.detailsWindowStore.detailsWindowOrder
    const notes = props.detailsWindowStore.detailsWindowStage.notes

    const claimStage = () => {
      props.detailsWindowStore.detailsWindowOrder.claimStage(employee.name)
      props.detailsWindowStore.toggleDetailsWindow()
    }

    const isEmployeeChosen = () => {
      return employee !== null
    }

    return (
      <div id="claim-task" className="taskModal">
        <List>
          {notes.map((s, i) => (
            <ListItem key={i}>
              <Typography>{s}</Typography>
            </ListItem>
          ))}
        </List>
        <Autocomplete
          id="select-employee"
          onChange={(e, v) => setEmployee(v)}
          options={props.generalStore.employees.filter((e) => e.isActive)}
          getOptionLabel={(option) => option.name}
            style={{ width: '70%' }}
          renderInput={(params) => (
            <TextField id='asignEmployee'{...params} label="Select Employee" />
          )}
        />
        <Button id='claimButton'
          color="secondary"
          variant="contained"
          disabled={!isEmployeeChosen()}
          onClick={claimStage}
        >
          Claim
        </Button>
      </div>
    )
  })
)

export default ClaimTask
