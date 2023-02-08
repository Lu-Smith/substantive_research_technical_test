const getAPI = async () => {
    const response = await fetch ('http://substantiveresearch.pythonanywhere.com/');
    if (response.status !== 200) {
        throw new Error ('cannot fetch data');
    }
    const data = await response.json();
    return data;
}

getAPI()
.then(data => console.log(data))
.catch(err => console.log('rejected', err.message));