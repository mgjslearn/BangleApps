/* 

      $(function() {
        // Initialize date picker
        $('#date-picker').flatpickr({
          dateFormat: 'Y-m-d',
          defaultDate: 'today',
          maxDate: 'today'
        });
        
        // Initialize activity graph
        var options = {
          chart: {
            type: 'area',
            height: 350,
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime'
          },
          tooltip: {
            x: {
              format: 'dd MMM yyyy'
            },
          },
        };
        var chart = new ApexCharts(document.querySelector("#activity-graph"), options);
        chart.render();
      }); */
// Hard-coded example data for steps walked
const stepsData = {
    "2023-04-01": 5000,
    "2023-04-02": 7000,
    "2023-04-03": 9000,
    "2023-04-04": 6000,
    "2023-04-05": 8000,
    "2023-04-06": 10000,
    "2023-04-07": 12000
};

// Function to generate the activity line graph
function generateActivityGraph(startDate, endDate) {
    // Filter the steps data based on the selected date range
    const filteredStepsData = {};
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
        const dateString = currentDate.toISOString().slice(0, 10);
        filteredStepsData[dateString] = stepsData[dateString] || 0;
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Create an array of dates and an array of steps
    const dates = Object.keys(filteredStepsData);
    const steps = Object.values(filteredStepsData);

    // Create the chart options
    const chartOptions = {
        chart: {
            type: 'line'
        },
        series: [{
            name: 'Steps Walked',
            data: steps
        }],
        xaxis: {
            categories: dates,
            type: 'datetime'
        },
        responsive: [{
            breakpoint: 576,
            options: {
                chart: {
                    height: 250
                }
            }
        }]
    };

    // Create the chart
    const chart = new ApexCharts(document.getElementById('activity-graph'), chartOptions);
    chart.render();
}

// Set up the date picker
$(document).ready(function() {
    $('#date-picker').daterangepicker({
        opens: 'left'
    }, function(start, end) {
        generateActivityGraph(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
    });

    // Generate the initial graph
    generateActivityGraph('2023-04-01', '2023-04-07');
});
