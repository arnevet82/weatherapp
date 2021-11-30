import React, { useState, useEffect } from 'react';
import AddRecord from './components/AddRecord';
import ErrorDialog from './components/ErrorDialog';
import Content from './components/Content';
import Button from '@mui/material/Button';
import './App.css';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import utils from './utils';

const App = () => {

  const [data, setData] = useState({});
  const [city, setCity] = useState('London');
  const [isEdit, setIsEdit] = useState(false);
  const [index, setIndex] = useState(null);
  const [temp, setTemp] = useState(null);
  const [type, setType] = useState(null);
  const [open, setOpen] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const {initialErrors} = utils;
  const [errors, setErrors] = useState(initialErrors);
  const english = /^[A-Za-z ]+$/;


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddRecordClose = () => {
    setOpen(false);
  };

  const handleAddRecord = () => {
    setOpen(true);
  };

  const handleAddNewRecord = async (newData, city) => {
    setData(newData);
    setCity(city);
  };

  const handleError = () => {
    setShowErrorDialog(true);
  };

  const getInitialData = async () => {
    const response = await fetch(`/get_data?city=London`);
    const body = await response.json();

    if (response.status !== 200) {
      setShowErrorDialog(true);
    }
    setData(body.data);
  };


  const handleSearch = async () => {

    if(city && typeof city === 'string' && isNaN(city) && english.test(city)){
      setErrors(initialErrors)
      const response = await fetch(`/get_data?city=${city}`);
      const body = await response.json();
      if (response.status !== 200) {
        setShowErrorDialog(true);
        return;
      }
      setData(body.data);
      return;
    }
    setErrors({city: true})
  };


  const handleChangeCity = async (e) => {
    setCity(e.target.value)
  };

  const handleUpdateTemp = async () => {

    const minValue = type === 'min' && temp? temp : data[index].minTemp;
    const naxValue = type === 'max' && temp ? temp : data[index].maxTemp;
    const value = type === 'max'? naxValue : minValue;

    if(!isNaN(value) && Math.abs(parseFloat(value)) < 50){
      setErrors(initialErrors)
      let newData = { city: city, index: index, maxTemp: parseFloat(type === 'max' && temp ? temp : data[index].maxTemp), minTemp: parseFloat(type === 'min' && temp? temp : data[index].minTemp) }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      };

      const response = await fetch('update_data', requestOptions);
      if (response.status !== 200) {
        throw Error(body.message)
      }
      const body = await response.json();
      setData(body.data);
      handleCloseEdit();
      return;
    }

    const newErrors = {...errors};
    type === 'max'? newErrors.data[index].maxTemp = true: newErrors.data[index].minTemp = true;
    setErrors(newErrors);
  };

  const handleChangeTemp = async (e) => {
    setTemp(e.target.value)
  };


  const handleEdit = async (idx, type) => {
    setType(type);
    setIndex(idx);
    setIsEdit(true);
  };

  const handleCloseEdit = async () => {
    setIndex(null);
    setIsEdit(false);
    setTemp(null);
    setType(null);
  };


  useEffect(() => {
    getInitialData();
  }, [])



  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2" component="div" gutterBottom>
          Last 7 Days Weather
        </Typography>

      </header>

      <ErrorDialog open={showErrorDialog} handleClose={() => setShowErrorDialog(false)}/>
      <AddRecord open={open} handleClose={handleAddRecordClose} data={data} handleAddNewRecord={handleAddNewRecord} handleError={handleError}/>


    <div className="top-area">
      <div className="add">
        <Button onClick={handleAddRecord} >
          Add Record
          <AddIcon/>
        </Button>
      </div>

    <div className="search-city">
      <TextField
        required
        id={`city`}
        name='city-input'
        value={city}
        onChange={(e) => handleChangeCity(e)}
        variant="outlined"
        error={errors && errors.city}
        helperText={errors && errors.city ? "Please add english text only" : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon onClick={handleSearch}/>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      </div>
    </div>


    <div className='wrapper'>
      <Content page={0} data={data} handleChange={handleChangeTemp} values={null} isEdit={isEdit} index={index} type={type} 
        handleEdit={handleEdit} temp={temp} errors={errors}>
        
        <InputAdornment>
          <IconButton onClick={()=>handleUpdateTemp(type)}>
            <SaveIcon/>
            </IconButton>
            <IconButton onClick={handleCloseEdit}>
            <CloseIcon/>
          </IconButton>
        </InputAdornment>

      </Content>
    
    </div>

    </div>
  );
}



export default App;
