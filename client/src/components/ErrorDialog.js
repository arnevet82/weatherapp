import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Content from './Content';

const ErrorDialog = ({ open, handleClose}) => {
  
  

  return (
    <div>

      <Dialog open={open} onClose={handleClose}>

       <DialogTitle>Sorry</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We could not retriev city data
          </DialogContentText>
          

         

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>

      </Dialog>
       
    </div>
  );
}


export default ErrorDialog;