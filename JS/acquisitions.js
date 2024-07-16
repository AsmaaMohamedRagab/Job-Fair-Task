import { Chart } from "./../node_modules/chart.js/auto";
import displayCustomers from"./script.js"
const xValues=[]
const yValues=[]

(async function(){
new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})()