import React from 'react';
import { inject, observer } from 'mobx-react';
import {ExpansionPanelSummary, Typography, ExpansionPanelDetails,ExpansionPanel, Button} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const OrderCard = inject('ordersStore')(observer((props) => {
    
    const openDetailsWindow = () => {

    }

    return (
        <ExpansionPanel className='order'>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography></Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {props.order.inProcess ? 
                    <Button onClick={openDetailsWindow}>Complete Task</Button> :
                    <Button onClick={openDetailsWindow}>Claim Task</Button>}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}))

export default OrderCard