var xt = 0;

var random = new TimeSeries();

var tdelta = setInterval(function () {
  random.append(new Date().getTime(), xt);
  if (xt > 0) {
    xt -= 10;
  }

  if (xt < 0) {
    xt = 0;
  }
}, 500);

function createTimeline() {
  var chart = new SmoothieChart({
      grid: { fillStyle: "rgba(0,0,0,0.89)", verticalSections: 5 },
    }),
    canvas = document.getElementById("chart");

  chart.addTimeSeries(random, {
    lineWidth: 1,
    strokeStyle: "#e66561",
    fillStyle: "rgba(241, 137, 154, 0.479)",
  });
  chart.streamTo(canvas, 500);
}

const createSpike = () => {
  xt++;
};

window.onload = () => {
  createTimeline();
};
