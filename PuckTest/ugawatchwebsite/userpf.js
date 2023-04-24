

$(function() {
  $('#datepicker').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
    todayHighlight: true,
    multidate: true,
    multidateSeparator: " - ",
    endDate: new Date()
  }).on('changeDate', function() {
    var selectedDates = $('#datepicker').val().split(' - ');
    var startDate = new Date(selectedDates[0]);
    var endDate = new Date(selectedDates[1]);

    $.getJSON('example.json', function(data) {
      var chartData = [];
      var totalSteps = 0;
      var numDays = 0;

      for (var i = 0; i < data.activityData.length; i++) {
        var date = new Date(data.activityData[i].date);
        if (date >= startDate && date <= endDate) {
          var steps = data.activityData[i].steps;
          totalSteps += steps;
          numDays++;

          chartData.push({
            x: date,
            y: steps
          });
        }
      }

      var avgSteps = totalSteps / numDays;

      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
          text: "Steps Walked Over the Week"
        },
        axisY: {
          title: "Steps",
          includeZero: false
        },
        data: [{
          type: "line",
          dataPoints: chartData
        }]
      });

      chart.render();

      var chart2 = new CanvasJS.Chart("chartContainer2", {
        animationEnabled: true,
        theme: "light2",
        title:{
          text: "Steps Walked per Day"
        },
        axisX: {
          title: "Date"
        },
        axisY: {
          title: "Steps",
          includeZero: false
        },
        data: [{
          type: "column",
          dataPoints: chartData
        }]
      });

      chart2.render();

      $('#avgSteps').text(avgSteps);
    });
  });
});


/*
function loadChartData(startDate, endDate) {
    $.getJSON('example.json', function(data) {
        var stepsData = [];
        var labels = [];
        for (var i = 0; i < data.length; i++) {
            var date = new Date(data[i].date);
            if (date >= startDate && date <= endDate) {
                stepsData.push(data[i].steps);
                labels.push(data[i].date);
            }
        }
        displayChart(stepsData, labels);
    });
}

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
