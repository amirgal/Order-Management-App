import React from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Backdrop, Fade} from '@material-ui/core'
import CompleteTask from './CompleteTask';
import ClaimTask from './ClaimTask'
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const StageDetailsModal = inject('detailsWindowStore')(observer((props) => {
    const classes = useStyles();
    const currOrder = props.detailsWindowStore.detailsWindowOrder
    
    const toggleModal = () => {
        props.detailsWindowStore.toggleDetailsWindow()
    };

    return (
    <Box>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.detailsWindowStore.showDetailsWindow}
            onClose={toggleModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            >
            <Fade in={props.detailsWindowStore.showDetailsWindow}>
                <div id="details-window">
                    <h3>{props.detailsWindowStore.detailsWindowStage.name}</h3>
                    <div id="product-details">
                        <p>Product Name: {currOrder.product.name}</p>
                        <p>Attributes: {currOrder.attributes}</p>
                    </div>
                    {currOrder.inProcess ?
                    <CompleteTask /> : <ClaimTask />} 
                </div>
            </Fade>
        </Modal>
    </Box>
    );
}))

export default StageDetailsModal