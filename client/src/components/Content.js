import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';

const Content = ({page, data, values, isEdit, index, type, temp, handleEdit, handleChange, errors, children}) => {
  
  return (
    <div>

    <Grid container>

      <Grid item xs={4} className={page===1? 'add-item': 'item'}>
        Date
      </Grid>

      <Grid item xs={4} className={page===1? 'add-item': 'item'}>
        min temperature (c)
      </Grid>

      <Grid item xs={4} className={page===1? 'add-item': 'item'}>
      max temperature (c)
      </Grid>

      </Grid>
      {data && data.length && data.map((item, idx)=>{
        return (
          
          <Grid container idx={idx}>

            <Grid item xs={4} className={page === 1?'add-item': 'item'}>
              {item.date}
            </Grid>
    
            <Grid item xs={4} className={page===1? 'add-item': 'item'}>

              {page === 1 || (isEdit && idx === index && type === 'min') ? <TextField
                required
                error={errors && errors.data && errors.data[idx] && errors.data[idx].minTemp}
                helperText={errors && errors.data && errors.data[idx] && errors.data[idx].minTemp ?
                   "number or float, from -50 to 50" : ''}
                id={`min-celcius-${idx}`}
                name='minTemp'
                value={page === 1 ? (values.data[idx].minTemp|| ''): temp || item.minTemp}
                onChange={(e) => handleChange(e, idx)}
                variant="outlined"
                className={'item-input'}
                InputProps={{
                  className: 'temp-input',
                  endAdornment: (
                    children || null
                  )
                }}
              />:  <>
              {item.minTemp}
              <EditIcon onClick={() => handleEdit(idx, 'min')}/>
              </>}


            </Grid>
    
            <Grid item xs={4} className={page === 1?'add-item': 'item'}>

                {page === 1 || (isEdit && idx === index && type === 'max') ? <TextField
                  required
                  error={errors && errors.data && errors.data[idx] && errors.data[idx].maxTemp}
                  helperText={errors && errors.data && errors.data[idx] && errors.data[idx].maxTemp ?
                    "number or float -50 to 50" : ''}
                  id={`max-celcius-${idx}`}
                  name='maxTemp'
                  value={page === 1 ? (values.data[idx].maxTemp|| ''): temp || item.maxTemp}
                  onChange={(e) => handleChange(e, idx)}
                  variant="outlined"
                  className={'item-input'}
                  InputProps={{
                    className: 'temp-input',
                    endAdornment: (
                      children || null
                    )
                  }}
                />:
                <>
                {item.maxTemp}
                <EditIcon onClick={() => handleEdit(idx, 'max')}/>
                </>}

            </Grid>
  
          </Grid>

            )
          })}


    </div>
  );
}



export default Content;