$(function() {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left'
  }, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });
});

$(function() {
  // Load the JSON data
  $.getJSON('example.json', function(data) {
    var activityData = data.activityData;

    // Set up the Morris chart
    var activityChart = Morris.Bar({
      element: 'activity-chart',
      data: activityData,
      xkey: 'date',
      ykeys: ['steps'],
      labels: ['Steps'],
      hideHover: 'auto',
      hoverCallback: function (index, options, content) {
        var dataPoint = options.data[index];
        return '<div>Date: ' + dataPoint.date + '</div>' +
          '<div>Steps: ' + dataPoint.steps + '</div>';
      }
    });

    // Set up the datepicker
    $('#datepicker').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
      todayHighlight: true,
      multidate: true,
      multidateSeparator: " - "
    }).on('changeDate', function(e) {
      // Filter the activity data to the selected date range
      var selectedDates = $('#datepicker').val().split(' - ');
      var filteredData = activityData.filter(function(activity) {
        return activity.date >= selectedDates[0] && activity.date <= selectedDates[1];
      });

      // Update the Morris chart with the filtered data
      activityChart.setData(filteredData);
    });
  });
});
