import React from 'react';
import { inject, observer } from 'mobx-react';
import {Button, FormControlLabel, Checkbox, List, ListItem} from '@material-ui/core'

const CompleteTask = inject('generalStore','detailsWindowStore')(observer((props) => {
    const currOrder = props.detailsWindowStore.detailsWindowOrder
    const steps = props.generalStore.boards.find(b => b.products.includes(p => p === currOrder.product._id)).stages[currOrder.progress].steps
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
        props.detailsWindowStore.detailsWindowOrder.advanceStage()
        props.detailsWindowStore.toggleDetailsWindow()
    }

    const checkCompletion = () => {
        return Object.keys(state).every(k => state[k] === true)
    }

    return (
        <div id="complete-task">
            <List>
                {steps.map((s,i) => 
                    <ListItem key={i}>
                        <FormControlLabel
                            control={<Checkbox checked={state[`step_${i}`]} 
                            onChange={handleChange} name={`step_${i}`} color="primary" />}
                            label={s}
                        />
                    </ListItem>
                )}
                <ListItem>
                    <Button variant='contained' disabled={!checkCompletion()}
                    onClick={completeStage}>Complete</Button>
                </ListItem>
            </List>
        </div>
    )
}))

export default CompleteTask