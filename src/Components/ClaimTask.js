import React, {useState , useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import {Button, TextField, Typography, List, ListItem} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'

const ClaimTask = inject('ordersStore','detailsWindowStore')(observer((props) => {
    const [employee, setEmployee] = useState(null)
    const currOrder = props.detailsWindowStore.detailsWindowOrder
    const steps = currOrder.product.stages[currOrder.progress].steps

    const claimStage = () => {
        props.detailsWindowStore.detailsWindowOrder.claimStage(employee.name)
        props.detailsWindowStore.toggleDetailsWindow()
    }
    
    const isEmployeeChosen = () => {
        return employee !== null
    }
 
    return (
        <div id="claim-task">
            <List>
                {steps.map((s,i) => 
                        <ListItem key={i}>
                        <Typography>{s}</Typography>
                        </ListItem>
                    )}
                <ListItem>
                    <Autocomplete
                        id="select-employee"
                        onChange={(e,v) => setEmployee(v)}
                        options={props.ordersStore.employees.filter(e => e.isActive)}
                        getOptionLabel={option => option.name}
                        style={{ width: 300 }}
                        renderInput={params => <TextField {...params}
                        label="Select Employee"/>}
                        />
                    </ListItem>
                <ListItem>
                    <Button variant='contained' disabled = {!isEmployeeChosen()}
                    onClick={claimStage}>Claim</Button>
                </ListItem>
            </List>
        </div>
    )
}))

export default ClaimTask