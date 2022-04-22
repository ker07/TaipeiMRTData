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
    pointRadius: 3,
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

const dataHourlyDataChart = {
  labels: ["", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "d+1 00:00", "d+1 01:00", ""],
  datasets: [],
};

const configHourlyDataChart = {
  type: "line",
  data: dataHourlyDataChart,
  options: {
    layout: {
      padding: {
        left: 5,
        right: 5,
      },
    },
    plugins: {
      legend: {
        display: false
      },
    },
  },
};

const options = {
  parsing: false
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

const hourlyDataChart = new Chart(
  document.getElementById("hourlyDataChart"),
  configHourlyDataChart,
  options
);