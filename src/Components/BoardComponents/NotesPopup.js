import React from 'react';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem , List} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function NotesPopup(props) {
  const classes = useStyles();

  return (
    <div>
      <Popover
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={props.anchor.openedPopoverId === props.id}
        anchorEl={props.anchor.anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        disableRestoreFocus
      >
        <List>
            {props.notes.map((n,i) => <ListItem key={i}>{n}</ListItem>)}
        </List>
      </Popover>
    </div>
  );
}
