const cache = require('../cache');

module.exports = {
    addWeatherData
}



async function addWeatherData(req, res) {
    console.log('start addWeatherData');

    try {
        console.log('req.body:', req.body);
        const {record, newCity} = req.body;

        const cacheData = await cache.get('London');

        const newData = [...cacheData];

        for(let i =0; i < record.length; i++){
            record[i].date = newData[i].date;
            delete record.index;
        }
        const setResponse = await cache.set(newCity, record);
        console.log('finish addWeatherData newData', record);

        return record;

    } catch (error) {
        console.log(error);
        throw error;
    }
}
