// clock

window.addEventListener("DOMContentLoaded", () => {
  const clock = new BouncyBlockClock(".clock");
});

class BouncyBlockClock {
  constructor(qs) {
    this.el = document.querySelector(qs);
    this.time = { a: [], b: [] };
    this.rollClass = "clock__block--bounce";
    this.digitsTimeout = null;
    this.rollTimeout = null;
    this.mod = 0 * 60 * 1000;

    this.loop();
  }
  animateDigits() {
    const groups = this.el.querySelectorAll("[data-time-group]");

    Array.from(groups).forEach((group, i) => {
      const { a, b } = this.time;

      if (a[i] !== b[i]) group.classList.add(this.rollClass);
    });

    clearTimeout(this.rollTimeout);
    this.rollTimeout = setTimeout(this.removeAnimations.bind(this), 900);
  }
  displayTime() {
    // screen reader time
    const timeDigits = [...this.time.b];
    const ap = timeDigits.pop();

    this.el.ariaLabel = `${timeDigits.join(":")} ${ap}`;

    // displayed time
    Object.keys(this.time).forEach((letter) => {
      const letterEls = this.el.querySelectorAll(`[data-time="${letter}"]`);

      Array.from(letterEls).forEach((el, i) => {
        el.textContent = this.time[letter][i];
      });
    });
  }
  loop() {
    this.updateTime();
    this.displayTime();
    this.animateDigits();
    this.tick();
  }
  removeAnimations() {
    const groups = this.el.querySelectorAll("[data-time-group]");

    Array.from(groups).forEach((group) => {
      group.classList.remove(this.rollClass);
    });
  }
  tick() {
    clearTimeout(this.digitsTimeout);
    this.digitsTimeout = setTimeout(this.loop.bind(this), 1e3);
  }
  updateTime() {
    const rawDate = new Date();
    const date = new Date(Math.ceil(rawDate.getTime() / 1e3) * 1e3 + this.mod);
    let h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    const ap = h < 12 ? "AM" : "PM";

    if (h === 0) h = 12;
    if (h > 12) h -= 12;

    this.time.a = [...this.time.b];
    this.time.b = [
      h < 10 ? `0${h}` : `${h}`,
      m < 10 ? `0${m}` : `${m}`,
      s < 10 ? `0${s}` : `${s}`,
      ap,
    ];

    if (!this.time.a.length) this.time.a = [...this.time.b];
  }
}

// chart
Chart.defaults.global = {
  // Boolean - Whether to animate the chart
  animation: true,

  // Number - Number of animation steps
  animationSteps: 60,

  // String - Animation easing effect
  // Possible effects are:
  // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
  //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
  //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
  //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
  //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
  //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
  //  easeOutElastic, easeInCubic]
  animationEasing: "easeOutBack",

  // Boolean - If we should show the scale at all
  showScale: true,

  // Boolean - If we want to override with a hard coded scale
  scaleOverride: false,

  // ** Required if scaleOverride is true **
  // Number - The number of steps in a hard coded scale
  scaleSteps: null,
  // Number - The value jump in the hard coded scale
  scaleStepWidth: null,
  // Number - The scale starting value
  scaleStartValue: null,

  // String - Colour of the scale line
  scaleLineColor: "rgba(0,0,0,.1)",

  // Number - Pixel width of the scale line
  scaleLineWidth: 1,

  // Boolean - Whether to show labels on the scale
  scaleShowLabels: true,

  // Interpolated JS string - can access value
  scaleLabel: "<%=value%>",

  // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
  scaleIntegersOnly: true,

  // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
  scaleBeginAtZero: false,

  // String - Scale label font declaration for the scale label
  scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

  // Number - Scale label font size in pixels
  scaleFontSize: 12,

  // String - Scale label font weight style
  scaleFontStyle: "normal",

  // String - Scale label font colour
  scaleFontColor: "#666",

  // Boolean - whether or not the chart should be responsive and resize when the browser does.
  responsive: true,

  // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
  maintainAspectRatio: true,

  // Boolean - Determines whether to draw tooltips on the canvas or not
  showTooltips: true,

  // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
  customTooltips: false,

  // Array - Array of string names to attach tooltip events
  tooltipEvents: ["mousemove", "touchstart", "touchmove"],

  // String - Tooltip background colour
  tooltipFillColor: "rgba(0,0,0,0.8)",

  // String - Tooltip label font declaration for the scale label
  tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

  // Number - Tooltip label font size in pixels
  tooltipFontSize: 14,

  // String - Tooltip font weight style
  tooltipFontStyle: "normal",

  // String - Tooltip label font colour
  tooltipFontColor: "#fff",

  // String - Tooltip title font declaration for the scale label
  tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

  // Number - Tooltip title font size in pixels
  tooltipTitleFontSize: 14,

  // String - Tooltip title font weight style
  tooltipTitleFontStyle: "bold",

  // String - Tooltip title font colour
  tooltipTitleFontColor: "#fff",

  // Number - pixel width of padding around tooltip text
  tooltipYPadding: 6,

  // Number - pixel width of padding around tooltip text
  tooltipXPadding: 6,

  // Number - Size of the caret on the tooltip
  tooltipCaretSize: 8,

  // Number - Pixel radius of the tooltip border
  tooltipCornerRadius: 6,

  // Number - Pixel offset from point x to tooltip edge
  tooltipXOffset: 10,

  // String - Template string for single tooltips
  tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

  // String - Template string for multiple tooltips
  multiTooltipTemplate: "<%= value %>",

  // Function - Will fire on animation progression.
  onAnimationProgress: function () { },

  // Function - Will fire on animation completion.
  onAnimationComplete: function () { },
};

// BEGIN POLAR DATA ============================================

const barData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: [35, 59, 80, 81, 56, 55, 40],
    },

    {
      label: "My Second dataset",
      fillColor: "rgba(151,187,205,0.5)",
      strokeColor: "rgba(151,187,205,0.8)",
      highlightFill: "rgba(151,187,205,0.75)",
      highlightStroke: "rgba(151,187,205,1)",
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ],
};

const barOptions = {
  //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
  scaleBeginAtZero: true,

  //Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines: true,

  //String - Colour of the grid lines
  scaleGridLineColor: "rgba(0,0,0,.05)",

  //Number - Width of the grid lines
  scaleGridLineWidth: 1,

  //Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,

  //Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,

  //Boolean - If there is a stroke on each bar
  barShowStroke: true,

  //Number - Pixel width of the bar stroke
  barStrokeWidth: 2,

  //Number - Spacing between each of the X value sets
  barValueSpacing: 5,

  //Number - Spacing between data sets within X values
  barDatasetSpacing: 1,

  //String - A legend template
  legendTemplate:
    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
};

const barCtx = document.getElementById("myBarGraph").getContext("2d");

const myBarChart = new Chart(barCtx).Bar(barData, barOptions);

// BEGIN POLAR DATA ============================================

const polarData = [
  {
    value: 300,
    color: "#F7464A",
    highlight: "#FF5A5E",
    label: "Red",
  },

  {
    value: 50,
    color: "#46BFBD",
    highlight: "#5AD3D1",
    label: "Green",
  },

  {
    value: 100,
    color: "#FDB45C",
    highlight: "#FFC870",
    label: "Yellow",
  },

  {
    value: 40,
    color: "#949FB1",
    highlight: "#A8B3C5",
    label: "Grey",
  },

  {
    value: 120,
    color: "#4D5360",
    highlight: "#616774",
    label: "Dark Grey",
  },
];

const polarOptions = {
  //Boolean - Show a backdrop to the scale label
  scaleShowLabelBackdrop: true,

  //String - The colour of the label backdrop
  scaleBackdropColor: "rgba(255,255,255,0.75)",

  // Boolean - Whether the scale should begin at zero
  scaleBeginAtZero: true,

  //Number - The backdrop padding above & below the label in pixels
  scaleBackdropPaddingY: 2,

  //Number - The backdrop padding to the side of the label in pixels
  scaleBackdropPaddingX: 2,

  //Boolean - Show line for each value in the scale
  scaleShowLine: true,

  //Boolean - Stroke a line around each segment in the chart
  segmentShowStroke: true,

  //String - The colour of the stroke on each segement.
  segmentStrokeColor: "#fff",

  //Number - The width of the stroke value in pixels
  segmentStrokeWidth: 2,

  //Number - Amount of animation steps
  animationSteps: 100,

  //String - Animation easing effect.
  animationEasing: "easeOutBounce",

  //Boolean - Whether to animate the rotation of the chart
  animateRotate: true,

  //Boolean - Whether to animate scaling the chart from the centre
  animateScale: false,

  //String - A legend template
  legendTemplate:
    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
};

const polarCtx = document.getElementById("myPolarGraph").getContext("2d");
const myPolarChart = new Chart(polarCtx).PolarArea(polarData, polarOptions);

// BEGIN LINE CHART ============================================

const lineGraphData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [10, 59, 80, 81, 56, 55, 40],
    },

    {
      label: "My Second dataset",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ],
};

const lineGraphOptions = {
  ///Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines: true,

  //String - Colour of the grid lines
  scaleGridLineColor: "rgba(0,0,0,.05)",

  //Number - Width of the grid lines
  scaleGridLineWidth: 1,

  //Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,

  //Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,

  //Boolean - Whether the line is curved between points
  bezierCurve: true,

  //Number - Tension of the bezier curve between points
  bezierCurveTension: 0.4,

  //Boolean - Whether to show a dot for each point
  pointDot: true,

  //Number - Radius of each point dot in pixels
  pointDotRadius: 4,

  //Number - Pixel width of point dot stroke
  pointDotStrokeWidth: 1,

  //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  pointHitDetectionRadius: 20,

  //Boolean - Whether to show a stroke for datasets
  datasetStroke: true,

  //Number - Pixel width of dataset stroke
  datasetStrokeWidth: 2,

  //Boolean - Whether to fill the dataset with a colour
  datasetFill: true,

  //String - A legend template
  legendTemplate:
    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
};

const lineCtx = document.getElementById("myGraph").getContext("2d");
const myLineChart = new Chart(lineCtx).Line(lineGraphData, lineGraphOptions);

// BEGIN RADAR CHART ============================================

const radarData = {
  labels: ["Ford", "Chevy", "Toyota", "Honda", "Mazda"],
  datasets: [
    {
      label: "My First dataset",
      fillColor: "rgba(22,170,133,0.2)",
      strokeColor: "rgba(22,160,133,1)",
      pointColor: "rgba(22,160,133,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#ccc",
      pointHighlightStroke: "rgba(22,160,133,1)",
      data: [12, 3, 5, 18, 7],
    },
  ],
};

const radarOptions = {
  ///Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines: true,

  //String - Colour of the grid lines
  scaleGridLineColor: "rgba(0,0,0,.2)",

  //Number - Width of the grid lines
  scaleGridLineWidth: 1,

  //Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,

  //Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,

  //Boolean - Whether the line is curved between points
  bezierCurve: true,

  //Number - Tension of the bezier curve between points
  bezierCurveTension: 0.4,

  //Boolean - Whether to show a dot for each point
  pointDot: true,

  //Number - Radius of each point dot in pixels
  pointDotRadius: 4,

  //Number - Pixel width of point dot stroke
  pointDotStrokeWidth: 1,

  //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  pointHitDetectionRadius: 20,

  //Boolean - Whether to show a stroke for datasets
  datasetStroke: true,

  //Number - Pixel width of dataset stroke
  datasetStrokeWidth: 2,

  //Boolean - Whether to fill the dataset with a colour
  datasetFill: true,

  //String - A legend template
  legendTemplate:
    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
};

const radarCtx = document.getElementById("myRadarGraph").getContext("2d");
const myRadarChart = new Chart(radarCtx).Radar(radarData, radarOptions);

// BEGIN PIE CHART ============================================

const pieData = [
  {
    value: 300,
    color: "#F7464A",
    highlight: "#FF5A5E",
    label: "Red",
  },

  {
    value: 50,
    color: "#46BFBD",
    highlight: "#5AD3D1",
    label: "Green",
  },

  {
    value: 100,
    color: "#FDB45C",
    highlight: "#FFC870",
    label: "Yellow",
  },
];

const pieOptions = {
  //Boolean - Whether we should show a stroke on each segment
  segmentShowStroke: true,

  //String - The colour of each segment stroke
  segmentStrokeColor: "#fff",

  //Number - The width of each segment stroke
  segmentStrokeWidth: 2,

  //Number - The percentage of the chart that we cut out of the middle
  percentageInnerCutout: 0, // This is 0 for Pie charts

  //Number - Amount of animation steps
  animationSteps: 100,

  //String - Animation easing effect
  animationEasing: "easeOutBounce",

  //Boolean - Whether we animate the rotation of the Doughnut
  animateRotate: true,

  //Boolean - Whether we animate scaling the Doughnut from the centre
  animateScale: false,

  //String - A legend template
  legendTemplate:
    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
};

const pieCtx = document.getElementById("myPieGraph").getContext("2d");
const myPieChart = new Chart(pieCtx).Pie(pieData, pieOptions);

// BEGIN DOUGHNUT CHART ============================================

const doughnutData = [
  {
    value: 300,
    color: "#F7464A",
    highlight: "#FF5A5E",
    label: "Red",
  },

  {
    value: 50,
    color: "#46BFBD",
    highlight: "#5AD3D1",
    label: "Green",
  },

  {
    value: 100,
    color: "#FDB45C",
    highlight: "#FFC870",
    label: "Yellow",
  },
];

const doughnutOptions = {
  //Boolean - Whether we should show a stroke on each segment
  segmentShowStroke: true,

  //String - The colour of each segment stroke
  segmentStrokeColor: "#fff",

  //Number - The width of each segment stroke
  segmentStrokeWidth: 2,

  //Number - The percentage of the chart that we cut out of the middle
  percentageInnerCutout: 50, // This is 0 for Pie charts

  //Number - Amount of animation steps
  animationSteps: 100,

  //String - Animation easing effect
  animationEasing: "easeOutBounce",

  //Boolean - Whether we animate the rotation of the Doughnut
  animateRotate: true,

  //Boolean - Whether we animate scaling the Doughnut from the centre
  animateScale: false,

  //String - A legend template
  legendTemplate:
    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
};

const doughnutCtx = document.getElementById("myDoughnutGraph").getContext("2d");

const myDoughnutChart = new Chart(doughnutCtx).Doughnut(
  doughnutData,
  doughnutOptions
);

