const {getWeatherData} = require('./be/weatherData/getData');
const {updateWeatherData} = require('./be/weatherData/updateData');
const {addWeatherData} = require('./be/weatherData/addData');
const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`));





// get data
 app.get('/get_data', async (req, res) => { 

  try{
    const {city} = req.query;
    const weatherResponse = await getWeatherData(city, req, res);
    console.log('weatherResponse', weatherResponse);

    res.status(200).json({data: weatherResponse});
  }catch(e){
    res.status(500).json({error: e.toString()});
  }
}); 


// update data
app.post('/update_data', async (req, res) => { 
  try{
    const weatherUpdateRes = await updateWeatherData(req, res);
    console.log('weatherUpdateRes', weatherUpdateRes);
    res.status(200).json({data: weatherUpdateRes});
  }catch(e){
    res.status(500).json({error: e.toString()});
  }
}); 


// add data
app.post('/add_data', async (req, res) => { 
  try{
    const weatherAddRes = await addWeatherData(req, res);
    console.log('weatherAddRes', weatherAddRes);
    res.status(200).json({data: weatherAddRes});
  }catch(e){
    res.status(500).json({error: e.toString()});
  }
}); 




