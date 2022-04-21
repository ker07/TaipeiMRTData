const dateArray = [];

const dataDailyLineChart = {
  labels: dateArray,
  datasets: [],
};

const configDailyLineChart = {
  type: "line",
  data: dataDailyLineChart,
  options: {
    scales: {
      x: {
        type: "time",
        min: new Date("2017-01-01").valueOf(),
        max: new Date("2022-03-01").valueOf(),
        ticks: {
          maxRotation: 30,
          minRotation: 30,
        },
        time: {
          displayFormats: {
            month: "yyyy-MM",
            day: "yyyy-MM-dd",
          },
          tooltipFormat: "yyyy-MM-dd",
        },
      },
    },
    pointRadius: 1,
    showLine: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

const dataWeekdayLineChart = {
  labels: ["", "Mon.", "Tue.", "Wen.", "Thr.", "Fri.", "Sat.", "Sun.", ""],
  datasets: [],
};

const configWeekdayLineChart = {
  type: "line",
  data: dataWeekdayLineChart,
  options: {
    layout: {
      padding: {
        left: 30,
        right: 30,
      },
    },
    plugins: {
      legend: {
        display: false
      },
    },
  },
};

const dataStationRankBarChart = {
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: []
  }]
};

const configStationRankBarChart = {
  type: "bar",
  data: dataStationRankBarChart,
  options: {
    elements: {
      bar: {
        borderWidth: 2,
        borderColor: "#000000"
      }
    },
    plugins: {
      legend: {
        display: false
      },
    },
  }
};

const options = {
  parsing: false,
  animation: false
};

const weekDayChart = new Chart(
  document.getElementById("weekDayChart"),
  configWeekdayLineChart,
  options
);

const stationRankBarChart = new Chart(
  document.getElementById("stationRankBarChart"),
  configStationRankBarChart,
  options
);

const dailyLineChart = new Chart(
  document.getElementById("dailyLineChart"),
  configDailyLineChart,
  options
);