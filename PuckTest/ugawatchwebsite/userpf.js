
$(function() {
    // load the example JSON file
    $.getJSON("example.json", function(data) {
        // create a variable to hold the activity data
        var activityData = [];

        // loop through the data and format it for the Morris.js graph
        $.each(data.activityData, function(index, value) {
            var date = moment(value.date).format('ddd');
            activityData.push({ day: date, steps: value.steps });
        });

        // initialize the Morris.js graph
        Morris.Bar({
            element: 'activity-chart',
            data: activityData,
            xkey: 'day',
            ykeys: ['steps'],
            labels: ['Steps'],
            barColors: ['#67b7dc'],
            hideHover: 'auto'
        });

        // initialize the datepicker
        $('#datepicker').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayHighlight: true,
            multidate: true,
            multidateSeparator: " - ",
            // update the graph when the date range is changed
            onChangeDate: function() {
                var selectedDates = $('#datepicker').val().split(' - ');
                var filteredData = data.activityData.filter(function(value) {
                    return moment(value.date).isBetween(selectedDates[0], selectedDates[1], null, '[]');
                });
                var updatedData = [];
                $.each(filteredData, function(index, value) {
                    var date = moment(value.date).format('ddd');
                    updatedData.push({ day: date, steps: value.steps });
                });
                Morris.Bar({
                    element: 'activity-chart',
                    data: updatedData,
                    xkey: 'day',
                    ykeys: ['steps'],
                    labels: ['Steps'],
                    barColors: ['#67b7dc'],
                    hideHover: 'auto'
                });
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
