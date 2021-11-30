const fetch = require("node-fetch");
const { performance } = require('perf_hooks');
const cache = require('../cache');

module.exports = {
    getWeatherData
}



async function getWeatherData(city, req, res) {
    try{

        console.log('start getWeatherData with city', city);

        const cacheData = await cache.get(city);
        console.log('finish getWeatherData - cache data', cacheData);

        if(!cacheData){
            console.log('no cacheData');
            
            const dates = getDates();
        
            const baseUrl = 'https://weatherapi-com.p.rapidapi.com/history.json?q=';
        
            const allRes = await Promise.all([
                getData( baseUrl + `${city}&dt=${dates[0]}&lang=en`),
                getData( baseUrl + `${city}&dt=${dates[1]}&lang=en`),
                getData( baseUrl + `${city}&dt=${dates[2]}&lang=en`),
                getData( baseUrl + `${city}&dt=${dates[3]}&lang=en`),
                getData( baseUrl + `${city}&dt=${dates[4]}&lang=en`),
                getData( baseUrl + `${city}&dt=${dates[5]}&lang=en`),
                getData( baseUrl + `${city}&dt=${dates[6]}&lang=en`)])
            
            const finalResponse = allRes.map(item => {
                return {
                    date: item.forecast.forecastday[0].date, 
                    minTemp: item.forecast.forecastday[0].day.mintemp_c,
                    maxTemp: item.forecast.forecastday[0].day.maxtemp_c,
                }
            })
        
            const setResponse = await cache.set('London', finalResponse);    

            console.log('finish getWeatherData - api data', finalResponse);

            return finalResponse;
        }
        return cacheData;
    }catch(error){
        console.log(error);
        throw error;
    }
  }




function getDates(){
    try {
        const getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};
        const lastWeekDate = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
        let daylist = getDaysArray(lastWeekDate, new Date());
        return daylist.map((v)=>v.toISOString().slice(0,10));
    } catch (error) {
        console.log(error);
        throw error;
    }
};



async function getData(url){
    try {

        const headers = {
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            'x-rapidapi-key': '814ce86052msh5ad4413682b1677p120eb3jsn23980f44c030'
            }
        const response = await fetch(url, {method: 'GET', headers: headers});
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


