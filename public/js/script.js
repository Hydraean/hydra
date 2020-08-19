var xt = 0;

var random = new TimeSeries();
setInterval(function () {
  random.append(new Date().getTime(), xt);
}, 500);

function createTimeline() {
  var chart = new SmoothieChart({
      grid: { fillStyle: "rgba(0,0,0,0.89)", verticalSections: 5 },
    }),
    canvas = document.getElementById("chart");

  chart.addTimeSeries(random, {
    lineWidth: 1,
    strokeStyle: "#9792e3",
    fillStyle: "rgba(175,133,204,0.43)",
  });
  chart.streamTo(canvas, 500);
}

document.body.onkeyup = () => {
  xt++;
};
