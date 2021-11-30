

const addDataService = async (values) => {
    const newData = {
        record: values.data,
        newCity: values.city
    }
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData)
    };

    const response = await fetch('add_data', requestOptions);
    return response;
};



module.exports = {
    addDataService
}