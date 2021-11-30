const fetch = require("node-fetch");
const cache = require('../cache');

module.exports = {
    updateWeatherData
}



async function updateWeatherData(req, res) {

    try {
        const {city, index, maxTemp, minTemp } = req.body;
        console.log('start updateWeatherData with city', city);

        const cacheData = await cache.get(city);
        const newData = [...cacheData];
        newData[index] = {...cacheData[index], minTemp: minTemp, maxTemp: maxTemp}
        const setResponse = await cache.set(city, newData);
    
        console.log('finish updateWeatherData newData', newData);

        return newData;

    } catch (error) {
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


