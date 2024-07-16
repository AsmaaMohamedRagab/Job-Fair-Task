const name = document.querySelector("#name")
const amount = document.querySelector("#amount")
document.querySelector(".show").addEventListener("click", function () {
    document.querySelector(".filter").classList.add("d-none")
    document.querySelector("table").classList.add("d-none")
    // document.querySelector(".charts").classList.remove("d-none")
    document.querySelector("#bar-chart").classList.remove("d-none")
    document.querySelector("#bar-chart1").classList.remove("d-none")
})
async function getCastomers() {
    let customerApi = await fetch("http://localhost:3000/customers")
    let transactionApi = await fetch("http://localhost:3000/transactions")
    let customerResponse = await customerApi.json()
    let transactionResponse = await transactionApi.json()
    console.log(customerResponse);
    console.log(transactionResponse);
    displayCustomers(customerResponse, transactionResponse)
}
const xValues = []
const xValues1 = []
const yValues = []
function displayCustomers(customerData, transactionData) {
    let customer = ""
    for (let j = 0; j < transactionData.length; j++) {
        yValues.push(transactionData[j].amount)
        for (let i = 0; i < customerData.length; i++) {
            if (transactionData[j].customer_id == customerData[i].id) {
                if (transactionData[j].date == "2022-01-01") {
                    xValues.push(customerData[i].name)
                }
                else if (transactionData[j].date == "2022-01-02") {
                    xValues1.push(customerData[i].name)
                }
                customer += `<tr class="text-center">
                    <th scope="row">${transactionData[j].id}</th>
                    <td>${customerData[i].name}</td>
                    <td>${transactionData[j].date}</td>
                    <td>${transactionData[j].amount}</td>
                  </tr>`
            }
        }
        new Chart(document.getElementById("bar-chart"), {
            type: 'bar',
            data: {
                labels: xValues,
                active: false,
                datasets: [
                    {
                        data: yValues,
                        backgroundColor: '#9BD0F5',
                        active: false,
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        display: false,
                        min:0,
                    }
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Customer Transactions (2022-01-01)',
                }
            }
        });
        new Chart(document.getElementById("bar-chart1"), {
            type: 'bar',
            data: {
                labels: xValues1,
                datasets: [
                    {
                        data: yValues,
                        backgroundColor: '#9BD0F5',
                    }
                ]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Customer Transactions (2022-01-02)'
                }
            }
        });

    }
    name.addEventListener("input", function () {
        let cartoona = ""
        for (let j = 0; j < transactionData.length; j++) {
            for (let i = 0; i < customerData.length; i++) {
                if (transactionData[j].customer_id == customerData[i].id) {
                    if (customerData[i].name.toLowerCase().startsWith(name.value.toLowerCase()) == true) {
                        cartoona += `<tr class="text-center">
            <th scope="row">${transactionData[j].id}</th>
            <td>${customerData[i].name}</td>
            <td>${transactionData[j].date}</td>
            <td>${transactionData[j].amount}</td>
          </tr>`
                    }
                }
            }
        }
        document.querySelector(".customerData").innerHTML = cartoona;
    })
    amount.addEventListener("input", function () {
        let cartoona = ""
        for (let j = 0; j < transactionData.length; j++) {
            for (let i = 0; i < customerData.length; i++) {
                if (transactionData[j].customer_id == customerData[i].id) {
                    if (transactionData[j].amount.toString().startsWith(amount.value.toString()) == true) {
                        cartoona += `<tr class="text-center">
            <th scope="row">${transactionData[j].id}</th>
            <td>${customerData[i].name}</td>
            <td>${transactionData[j].date}</td>
            <td>${transactionData[j].amount}</td>
          </tr>`
                    }
                }
            }
        }
        document.querySelector(".customerData").innerHTML = cartoona;
    })
    document.querySelector(".customerData").innerHTML = customer
    console.log(xValues);
    console.log(xValues1);
    console.log(yValues);
}
getCastomers()

