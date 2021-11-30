import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Content from './Content';
import utils from '../utils';
import {addDataService} from '../services/services';

const AddRecord = ({ open, handleClose, data, handleAddNewRecord, handleError}) => {

  const {initialErrors, initialValues} = utils;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const english = /^[A-Za-z0-9]*$/;
  
  const handleSave = async () => {
    if(isCityValid() && isTempsValid()){
      setErrors(initialErrors)
      const response = await addDataService(values);
      if (response.status !== 200) {
        handleError();
      }
      const body = await response.json();
      handleAddNewRecord(body.data, values.city);
      handleClose();
      return;
    }
    handleErrors();
};

const handleChange = async (e, idx) => {
  const newVals = {...values};
  if(idx === undefined){
    newVals.city = e.target.value;
    setValues(newVals);
    return;
  }
  newVals.data[idx][e.target.name] = e.target.value;
  setValues(newVals);
};


const isCityValid = () => {
  return values.city && typeof values.city === 'string' && isNaN(values.city) && english.test(values.city);
};

const isItemValid = (val) => {
  return val !== '' && !isNaN(val) && Math.abs(parseFloat(val)) < 50;
};

const isTempsValid = () => {
  let result = true;
  values.data.forEach(tempItem => {
    if(!isItemValid(tempItem.minTemp)){
      result = false;
    }
    if(!isItemValid(tempItem.maxTemp)){
      result = false;
    }
  })
  return result;
};

const handleErrors = () => {
  const newErrors = {...errors};
    if(!isCityValid()) {
      newErrors.city = true;
    }
    if(!isTempsValid()) {
      newErrors.city = isCityValid()? null: true;
      for(let i = 0; i < values.data.length; i++){
        newErrors.data[i].maxTemp = isItemValid(values.data[i].maxTemp)?null:true;
        newErrors.data[i].minTemp = isItemValid(values.data[i].minTemp)?null:true;
      }
    }
    setErrors(newErrors);
};

  return (
    <div>

      <Dialog open={open} onClose={handleClose}>

       <DialogTitle>Add New Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new record, fill in the city name and the last 7 days min and max temperature.
          </DialogContentText>
          

          <TextField
            required
            label='city'
            id={`add-city`}
            name='city'
            value={values.city}
            onChange={(e) => handleChange(e)}
            variant="outlined"
            error={errors && errors.city}
            helperText={errors && errors.city ? "Please add english text only" : ''}
            style={{margin: '30px auto 10px'}}
            />

            <Content page={1} data={data} handleChange={handleChange} values={values} errors={errors}/>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Subscribe</Button>
        </DialogActions>

      </Dialog>
       
    </div>
  );
}



export default AddRecord;