const mockFractionPath = "../static/test_fraction.JSON";
const mockPath = "../static/test.JSON";
const realUrl = "http://localhost:8080/visits";

const DateTime = luxon.DateTime;
const Interval = luxon.Interval;

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
        display: false,
      },
    },
  },
};

const options = {
  parsing: false,
  animation: false,
};

const weekDayChart = new Chart(
  document.getElementById("weekDayChart"),
  configWeekdayLineChart,
  options
);

const dailyLineChart = new Chart(
  document.getElementById("dailyLineChart"),
  configDailyLineChart,
  options
);

function getDataAndDrawChart(url) {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((responseJson) => {
      addDatesInRangeToLabels(
        dateArray,
        responseJson["dataStartDate"],
        responseJson["dataEndDate"]
      );
      addDatasetToChartData(responseJson["data"]);

      // dailyLineChart.update();
      weekDayChart.update();
    });
}

function addDatesInRangeToLabels(datesList, startDate, endDate) {
  let interval = Interval.fromDateTimes(
    new DateTime.fromSQL(startDate),
    new DateTime.fromSQL(endDate)
  );

  for (var d of days(interval)) {
    datesList.push(d);
  }
}

function getRandomRgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}

function* days(interval) {
  let cursor = interval.start;
  while (cursor <= interval.end) {
    yield cursor;
    cursor = cursor.plus({ days: 1 });
  }
}

function addDatasetToChartData(dataPartOfResponse) {
  for (stationIndex in dataPartOfResponse) {
    let randomColor = getRandomRgba();
    let datasetsToAddTodailyData = [];
    const datasetToAddToWeekdayData = [null, 0, 0, 0, 0, 0, 0, 0, null];

    let stationName = dataPartOfResponse[stationIndex]["stationName"];
    let stationDetail = dataPartOfResponse[stationIndex];

    document.getElementById("square" + stationName).style.color = randomColor;
    document.getElementById("square1" + stationName).style.color = randomColor;

    for (visitIndex in stationDetail["visitDataSince20170101"]) {
      let date = dateArray[visitIndex];
      let visit = stationDetail["visitDataSince20170101"][visitIndex];
      datasetsToAddTodailyData.push({
        x: date,
        y: visit,
      });
      datasetToAddToWeekdayData[date.weekday] += visit;
    }

    pushDataSetToChart(
      stationName,
      datasetsToAddTodailyData,
      randomColor,
      dataDailyLineChart
    );

    pushDataSetToChart(
      stationName,
      datasetToAddToWeekdayData,
      randomColor,
      dataWeekdayLineChart
    );
  }
}

function pushDataSetToChart(name, dataset, color, ChartData) {
  let datasetToAdd = {
    label: name,
    data: dataset,
    hidden: false,
    backgroundColor: color,
    borderColor: color,
  };
  ChartData["datasets"].push(datasetToAdd);
}

// For testing locally , open "hello for testing locally.html" and use code below
// getDataAndDrawChart(mockPath);

// For Spring Boot routing to 'real' run fetching a deployed database on heroku-postgresql, use line below
getDataAndDrawChart(realUrl);
