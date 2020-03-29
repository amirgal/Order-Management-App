import React from 'react';
import { inject, observer } from 'mobx-react';
import {Button, TextField} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'

const ClaimTask = inject('ordersStore')(observer((props) => {
    
    return (
        <div id="claim-task">
            <Autocomplete
                id="select-owner"
                // onChange={this.setOwner}
                options={props.ordersStore.employees}
                getOptionLabel={option => option.name}
                style={{ width: 300 }}
                renderInput={params => <TextField {...params}
                    label="Select Employee"/>}
            />
            <Button>Claim</Button>
        </div>
    )
}))

export default ClaimTask