import React from 'react';
import { inject, observer } from 'mobx-react';
import {Button, FormControlLabel, Checkbox, List, ListItem} from '@material-ui/core'

const CompleteTask = inject('generalStore','detailsWindowStore','helpers')(observer((props) => {
    const currOrder = props.detailsWindowStore.detailsWindowOrder
    const steps = props.detailsWindowStore.detailsWindowStage.validate
    
    const createCheckedState = () => {
        const newState = {}
        for(let i in steps){
            newState[`step_${i}`] = false
        }
        return newState
    }

    const [state, setState] = React.useState(createCheckedState());
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    const completeStage = () => {
        if(currOrder.progress === currOrder.numStages){
            props.helpers.openSnackBar('Order Moved To Shipping','success')
        }
        currOrder.advanceStage()
        props.detailsWindowStore.toggleDetailsWindow()
    }

    const checkCompletion = () => {
        return Object.keys(state).every(k => state[k] === true)
    }

    return (
        <div id="complete-task" className="taskModal">
            <List>
                {steps.map((s,i) => 
                    <ListItem key={i}>
                        <FormControlLabel
                            control={<Checkbox checked={state[`step_${i}`]} 
                            onChange={handleChange} name={`step_${i}`} color="secondary" />}
                            label={s}
                        />
                    </ListItem>
                )}
                <ListItem>
                    <Button color="secondary" variant='contained' disabled={!checkCompletion()}
                    onClick={completeStage}>Complete</Button>
                </ListItem>
            </List>
        </div>
    )
}))

export default CompleteTask