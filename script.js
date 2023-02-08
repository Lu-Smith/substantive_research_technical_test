// API

let data;

const getAPI = async () => {
    const response = await fetch ('http://substantiveresearch.pythonanywhere.com/');
    if (response.status !== 200) {
        throw new Error ('cannot fetch data');
    }
    const data = await response.json();
    return data;
}

getAPI()
.then(data => {
    console.log(data);

        loadTableData(data);
})
.catch(err => console.log('rejected', err.message));

//table


    let sortDirection = false;    


 
    
    function loadTableData(data) {
        const tableBody = document.getElementById('tableData');
        let dataHtml = '';
    
        for (let interaction of data) {
            dataHtml += `<tr><td>${interaction.date}</td><td>${interaction.name}</td><td>${interaction.sector_id}</td></tr>`;
        }
        console.log(dataHtml);
        tableBody.innerHTML = dataHtml;
    }
    
   

