const mockPath = "../static/test.JSON";
const realUrl = "http://localhost:8080/visits";

const DateTime = luxon.DateTime;
const Interval = luxon.Interval;

const labels = [];

const data = {
  labels: labels,
  datasets: [],
};

const config = {
  type: "line",
  data: data,
  options: {
    scales: {
      x: {
        type: "time",
        min: new Date("2017-01-01").valueOf(),
        max: new Date("2022-02-28").valueOf(),
        ticks: {
          maxRotation: 30,
          minRotation: 30,
        },
        time: {
          displayFormats: {
            month: "yyyy-MM",
            day: "yyyy-MM-dd",
          },
          tooltipFormat: "yyyy-MM-dd"
        }
      },
    },
    pointRadius: 1,
    showLine: false,
  }
};

const options = {
  parsing: false,
  animation: false
};

const myLineChart = new Chart(
  document.getElementById("myChart"),
  config,
  options
);

function getDataAndDrawChart(url) {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((responseJson) => {
      addDatesInRangeToLabels(
        labels,
        responseJson["dataStartDate"],
        responseJson["dataEndDate"]
      );
      addDatasetToChartData(data, responseJson["data"]);

      myLineChart.update();
    });
}

function addDatesInRangeToLabels(datesList, startDateString, endDateString) {
  let interval = Interval.fromDateTimes(
    new DateTime.fromSQL(startDateString),
    new DateTime.fromSQL(endDateString)
  );

  for (var d of days(interval)) {
    datesList.push(d.toISODate());
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
  while (cursor < interval.end) {
    yield cursor;
    cursor = cursor.plus({ days: 1 });
  }
}

function addDatasetToChartData(dataForLineChart, dataPartOfResponse) {
  for (element in dataPartOfResponse) {
    let datasetToAdd = {
      label: dataPartOfResponse[element]["stationName"],
      data: dataPartOfResponse[element]["visitDataSince20170101"],
      backgroundColor: getRandomRgba(),
      hidden: false
    };
    dataForLineChart["datasets"].push(datasetToAdd);
  }
}

// For testing locally , open "hello for testing locally.html" and use code below
getDataAndDrawChart(mockPath);

// For Spring Boot routing to 'real' run fetching a deployed database on heroku-postgresql, use line below
// getDataAndDrawChart(realUrl);