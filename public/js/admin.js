document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  socket.on('updateData', (data) => {
    // Update cards
    document.querySelector('.card:nth-child(1) .font-weight-bold').textContent = `${data.products}%`;
    document.querySelector('.card:nth-child(2) .font-weight-bold').textContent = `${data.procurements}%`;
    document.querySelector('.card:nth-child(3) .font-weight-bold').textContent = `${data.sales}%`;
    document.querySelector('.card:nth-child(4) .font-weight-bold').textContent = `${data.creditSales}%`;

    // Update charts
    ApexCharts.exec('bar-chart', 'updateSeries', [{
      data: data.charts.topProducts
    }]);

    ApexCharts.exec('area-chart', 'updateSeries', [{
      data: data.charts.salesOverTime
    }]);
  });
});

let barChartOptions = {
    series: [{
      data: [15, 10, 8, 6, 4, 2]
    }],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    colors: ['#246dec', '#800000', '#FF9100', '#00712D', '#982B1C','#E85C0D'],
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 5,
        horizontal: false,
        columnWidth: '40%' // Use percentage for consistent width
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Maize', 'Soya', 'Beans', 'Cowpeas', 'Rice','G.nuts']
    },
    yaxis: {
      title: {
        text: 'Count'
      }
    }
  };
  
  //area chart
  let barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
  barChart.render();

  let areaChartOptions = {
    series: [{
      name: 'Sales Orders',
      data: [31, 40, 28, 51, 42, 109, 100]
    }],
    chart: {
      type: 'area',
      height: 300,
      width: 350
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01', '2024-05-01', '2024-06-01', '2024-07-01']
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    }
  };
  
  let areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
  areaChart.render();
  
  document.addEventListener('DOMContentLoaded', function () {
    // Function to render data into tables or lists
    function renderTableData(dataArray, tableSelector) {
      const tableBody = document.querySelector(tableSelector);
      tableBody.innerHTML = '';
      dataArray.forEach(data => {
        const row = document.createElement('tr');
        Object.values(data).forEach(value => {
          const cell = document.createElement('td');
          cell.textContent = value;
          row.appendChild(cell);
        });
        tableBody.appendChild(row);
      });
    }
  
    function renderListData(dataArray, listSelector) {
      const list = document.querySelector(listSelector);
      list.innerHTML = '';
      dataArray.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);
      });
    }


    let notificationCount = 0;

function addNotification() {
  notificationCount++;
  document.getElementById('notificationCount').innerText = notificationCount;
  const popup = document.getElementById('notificationPopup');
  popup.innerHTML = `<p>You have ${notificationCount} new notification${notificationCount > 1 ? 's' : ''}</p>`;
}

document.getElementById('notificationButton').addEventListener('click', function() {
  const popup = document.getElementById('notificationPopup');
  popup.classList.toggle('active');
});

// Example to simulate notifications being added
setInterval(addNotification, 5000);

  
    // Function to fetch data from the server
    async function fetchData() {
      try {
        const creditSalesResponse = await fetch('/api/credit-sales');
        const userActivityResponse = await fetch('/api/user-activity');
        const notificationsResponse = await fetch('/api/notifications');
        const procurementsResponse = await fetch('/api/procurements');
  
        const creditSalesData = await creditSalesResponse.json();
        const userActivityData = await userActivityResponse.json();
        const notificationsData = await notificationsResponse.json();
        const procurementsData = await procurementsResponse.json();
  
        // Render the data
        renderTableData(creditSalesData, '.details-card:nth-child(1) table tbody');
        renderTableData(procurementsData, '.details-card:nth-child(4) table tbody');
        renderListData(userActivityData, '.details-card:nth-child(2) ul');
        renderListData(notificationsData, '.details-card:nth-child(3) ul');
  
        // Update notification badge count
        const notificationsCount = notificationsData.length;
        const notificationsLink = document.querySelector('.sidebar li:nth-child(6) a');
        notificationsLink.innerHTML += `<span class="badge">${notificationsCount}</span>`;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Initial data fetch
    fetchData();
  
    // Polling every 5 seconds to update data
    setInterval(fetchData, 5000);
  });
  