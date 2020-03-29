import React, {useState} from 'react';
import { inject, observer } from 'mobx-react';
import {Button, TextField} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'

const ClaimTask = inject('ordersStore','detailsWindowStore')(observer((props) => {
    const [employee, setEmployee] = useState('')

    const claimStage = () => {
        props.detailsWindowStore.detailsWindowOrder.claimStage(employee.name)
    }

    return (
        <div id="claim-task">
            <Autocomplete
                id="select-employee"
                onChange={(e,v) => setEmployee(v)}
                options={props.ordersStore.employees}
                getOptionLabel={option => option.name}
                style={{ width: 300 }}
                renderInput={params => <TextField {...params}
                    label="Select Employee"/>}
            />
            <Button variant='contained' color='primary'
            onClick={claimStage}>Claim</Button>
        </div>
    )
}))

export default ClaimTask