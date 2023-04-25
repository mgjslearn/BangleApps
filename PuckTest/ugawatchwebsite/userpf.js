
$(function() {
  // Load data from JSON file
  $.getJSON("example.json", function(data) {
    // Create chart data array from activity data
    var chartData = [];
    for (var i = 0; i < data.activityData.length; i++) {
      chartData.push({
        date: new Date(data.activityData[i].date),
        steps: data.activityData[i].steps
      });
    }

    // Initialize chart with initial data
    var chart = new Morris.Line({
      element: 'stepsChart',
      data: chartData,
      xkey: 'date',
      ykeys: ['steps'],
      labels: ['Steps'],
      hideHover: 'auto',
      ymin: 0,
      postUnits: ' steps',
      dateFormat: function(date) {
        return moment(date).format('MMM D');
      },
      barColors: function(row) {
        var colors = ['#8bc34a', '#9c27b0', '#ff5722', '#00bcd4', '#e91e63', '#795548', '#607d8b'];
        return colors[row.x % colors.length];
      }
    });

    // Update chart with selected date range
    $('#datepicker').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
      todayHighlight: true,
      multidate: true,
      multidateSeparator: " - ",
      endDate: '+0d'
    }).on('changeDate', function(e) {
      if (e.dates.length == 2) {
        // Filter data for selected date range
        var filteredData = chartData.filter(function(data) {
          return data.date >= e.dates[0] && data.date <= e.dates[1];
        });

        // Redraw chart with filtered data
        chart.setData(filteredData);
      }
    });
  });
});

/*$(function() {
    $('#datepicker').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true,
        multidate: true,
        multidateSeparator: " - "
    });
}); */
/*

function displayChart(stepsData, labels) {
    var ctx = document.getElementById('stepsChart').getContext('2d');
    var stepsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Steps',
                data: stepsData,
                borderColor: 'rgba(0, 123, 255, 1)',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
*/

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
/*
// Hard-coded example data for steps walked
const stepsData = {
    "2023-04-01": 5000,
    "2023-04-02": 7000,
    "2023-04-03": 9000,
    "2023-04-04": 6000,
    "2023-04-05": 8000,
    "2023-04-06": 10000,
    "2023-04-07": 12000
};*/
/*
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
    $('#date-picker').datepicker({
        onSelect: function(dateText) {
            generateActivityGraph(dateText, dateText);
        }
    });

    // Generate the initial graph
    generateActivityGraph('2023-04-01', '2023-04-07');
});
*/
