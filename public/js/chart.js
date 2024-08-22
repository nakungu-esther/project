
document.getElementById('totalProcurements').innerText = 123;
        document.getElementById('totalSales').innerText = 456;
        document.getElementById('totalStock').innerText = 789;
        document.getElementById('profitLoss').innerText = '$10,000';

        // Procurement Trends Chart
        const ctx1 = document.getElementById('procurementTrendsChart').getContext('2d');
        const procurementTrendsChart = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Procurements',
                    data: [12, 19, 3, 5, 2],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Sales Distribution Chart
        const ctx2 = document.getElementById('salesDistributionChart').getContext('2d');
        const salesDistributionChart = new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ['Rice', 'Beans', 'Maize'],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });

        // Stock Levels Chart
        const ctx3 = document.getElementById('stockLevelsChart').getContext('2d');
        const stockLevelsChart = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Rice', 'Beans', 'Maize'],
                datasets: [{
                    label: 'Stock Levels',
                    data: [120, 150, 80],
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        