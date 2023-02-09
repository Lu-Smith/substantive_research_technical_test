// API

let data;
let globalData = [];
let percentageChart;
let interactionsChart;

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
    globalData = data;
    loadTableData(globalData);
})
.catch(err => console.log('rejected', err.message));

//table

    let sortDirection = false;    

    
    function loadTableData(globalData) {
        const tableBody = document.getElementById('tableData');
        let dataHtml = '';
        let interactionsArray = [];
        let dateArray = [];
    
        for (let interaction of globalData) {
                dataHtml += `<tr><td>${interaction.sector_id}</td><td>${interaction.name}</td><td>${interaction.date}</td></tr>`;
                dateArray.push(interaction.date);
                interactionsArray.push(interaction.sector_id);
        }
        tableBody.innerHTML = dataHtml;
        console.log(interactionsArray);

//scatter-chart

    const ctxS = document.getElementById('line-chart');

    interactionsChart = new Chart(ctxS, {
        type: 'line',
        data: {
        labels: dateArray,
        datasets: [{
            label: 'interactions',
            data: interactionsArray,
            fill: false,
            tension: 0.1,
            borderWidth: 0.5,
            backgroundColor: "pink",
            borderColor: "pink",
            pointBackgroundColor: "blue",
        }]
        }
    });

 //show the percentages of interactions this client has for each sector.
        let interactionCount = {};
        const tableBodyPercentage = document.getElementById('tableDataPercentage');
        let dataHtmlPercentage = '';
        let percentageArray = [];
        let  sectorLabelsArray = [];

        for (let i = 0; i < globalData.length; i++) {
            if (interactionCount[globalData[i].sector_id]) {
                interactionCount[globalData[i].sector_id]++;
            } else {
                interactionCount[globalData[i].sector_id] = 1;
            }
          }
          
        for (let j in interactionCount) {
            let percentage = (interactionCount[j] / globalData.length) * 100;
            dataHtmlPercentage += `<tr><td>${j}</td><td>${percentage.toFixed(1)}%</td></tr>`;
            percentageArray.push(percentage.toFixed(1));
            sectorLabelsArray.push(j);
        }   
        
        tableBodyPercentage.innerHTML = dataHtmlPercentage;

    //percentage-chart

        const ctxP = document.getElementById('percentage-chart');

        percentageChart = new Chart(ctxP, {
            type: 'pie',
            data: {
            labels: sectorLabelsArray,
            datasets: [{
                label: 'interaction %',
                data: percentageArray,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 259, 64, 0.2)",
                    "rgba(255, 199, 232, 0.2)",
                    "rgba(54, 262, 135, 0.2)",
                    "rgba(255, 6, 186, 0.2)",
                    "rgba(75, 292, 292, 0.2)",
                    "rgba(25, 232, 192, 0.2)",
                ],
                hoverOffset: 20
            }]
            }
        });

    }

// sort by sector_id

    function sortStringColumn(sort, columnName) {
        globalData = globalData.sort((p1,p2) => {
            return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]
        });
    }

    
    function sortColumn(columnName) {
        percentageChart.destroy();
        interactionsChart.destroy();
        const dataType = typeof globalData[0][columnName];
        sortDirection = !sortDirection; 
        switch(dataType) {
            case 'string':
                sortStringColumn(sortDirection, columnName);
                break;

        }

        loadTableData(globalData);
    }
   

   


   
 




    
   

