let myChart = null;
let stats = [];


const CONFIG_DATA_LABELS = [
  "Hit-Points",
  "Attack",
  "Defense",
  "Sp-Attack",
  "Sp-Defense",
  "Speed",
];


const CONFIG_CHART_BG_COLOR = [
  "#ffdab9",
  "#F1D651",
  "#9ECB91",
  "#96D8DE",
  "#F2C1D1",
  "#C2C1D4",
];


const CONFIG_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Stats",
      font: {
        size: 24,
      },
    },
  },
  indexAxis: "x",
  scales: {
    y: {
      skipLabels: true,
      beginAtZero: true,
      ticks: {
        autoSkip: false,
      },
    },
    x: {
      max: 120,
      ticks: {
        stepSize: 20,
        autoSkip: false,
      },
    },
  },
};


function drawChart() {
  const ctx = document.getElementById("skills");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: CONFIG_DATA_LABELS,
      datasets: [
        {
          data: stats,
          backgroundColor: CONFIG_CHART_BG_COLOR,
          borderWidth: 1,
        },
      ],
    },
    options: CONFIG_CHART_OPTIONS,
  });
}


function skills() {
  if (myChart != null) {
    myChart.destroy();
  }
  drawChart();
}


async function loadSkills(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
  let response = await fetch(url);
  pokemon = await response.json();
  stats = [];
  for (let i = 0; i < pokemon["stats"].length; i++) {
    stats.push(pokemon["stats"][i]["base_stat"]);
  }
  skills();
}
