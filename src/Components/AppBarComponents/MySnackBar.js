import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {inject, observer} from 'mobx-react'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
     
    },
  },
}));

const MySnackBar = inject('helpers')(observer((props) => {
  const classes = useStyles();
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.helpers.snackBar.open = false
  };

  return (
    <div className={classes.root}>
      <Snackbar open={props.helpers.snackBar.open} autoHideDuration={3000} onClose={handleClose} >
        <Alert onClose={handleClose} severity={props.helpers.snackBar.severity}>
          {props.helpers.snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}))

export default MySnackBar