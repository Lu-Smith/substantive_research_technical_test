// API

let data;
let globalData = [];

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
    globalData = data;
    loadTableData(globalData);
})
.catch(err => console.log('rejected', err.message));

//table

    let sortDirection = false;    

    
    function loadTableData(globalData) {
        const tableBody = document.getElementById('tableData');
        let dataHtml = '';
    
        for (let interaction of globalData) {
            dataHtml += `<tr><td>${interaction.date}</td><td>${interaction.name}</td><td>${interaction.sector_id}</td></tr>`;
        }
        tableBody.innerHTML = dataHtml;

 //show the percentages of interactions this client has for each sector.
        let interactionCount = {};
        const tableBodyPercentage = document.getElementById('tableDataPercentage');
        let dataHtmlPercentage = '';

        for (let i = 0; i < globalData.length; i++) {
            if (interactionCount[globalData[i].sector_id]) {
                interactionCount[globalData[i].sector_id]++;
            } else {
                interactionCount[globalData[i].sector_id] = 1;
            }
          }
          
        for (let j in interactionCount) {
            let percentage = (interactionCount[j] / globalData.length) * 100;
            console.log(j + ": " + percentage + "%");
            dataHtmlPercentage += `<tr><td>${j}</td><td>${percentage}</td></tr>`;
        }

        tableBodyPercentage.innerHTML = dataHtmlPercentage;
  
    



    }

// sort by sector_id

    function sortStringColumn(sort, columnName) {
        globalData = globalData.sort((p1,p2) => {
            return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]
        });
    }

    
    function sortColumn(columnName) {
        const dataType = typeof globalData[0][columnName];
        sortDirection = !sortDirection; 
        

        switch(dataType) {
            case 'string':
                sortStringColumn(sortDirection, columnName);
                break;

        }

        loadTableData(globalData);
    }
   


   
 




    
   

