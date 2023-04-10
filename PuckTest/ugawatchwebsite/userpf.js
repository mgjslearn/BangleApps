 

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
      });

