const mockFractionPath = "../static/test_fraction.JSON";
const mockPath = "../static/test.JSON";
const realUrl = "http://localhost:8080/visits";

const DateTime = luxon.DateTime;
const Interval = luxon.Interval;

const stationTWAdded = [];
const isTransferStation = [];
const stationTWVisits = [];
const stationColorArray = {};

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

      weekDayChart.update();
      hourlyDataChart.update();
      monthlyDataChart.update();
    });
}

function addDatesInRangeToLabels(datesList, startDate, endDate) {
  let interval = Interval.fromDateTimes(
    new DateTime.fromSQL(startDate),
    new DateTime.fromSQL(endDate)
  );

  for (let d of days(interval)) {
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

    const datasetsToAddToDailyData = [];

    const datasetToAddToWeekdayData = [0, 0, 0, 0, 0, 0, 0];
    const dayOfWeekCounter = [0, 0, 0, 0, 0, 0, 0];

    const datasetAddToMonthlyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const monthCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var datasetToAddToStationRankData = null;

    let stationName = dataPartOfResponse[stationIndex]["stationName"];
    let stationDetail = dataPartOfResponse[stationIndex];
    let stationTWName = stationName.split(" ").slice(1).join(" ");

    if (!stationTWAdded.includes(stationTWName)) {
      stationTWAdded.push(stationTWName);
      datasetToAddToStationRankData = 0;
      if (stationName.startsWith("BR")) {
        stationColorArray[stationTWName] = "#c48c31";
      } else if (stationName.startsWith("R")) {
        stationColorArray[stationTWName] = "#e3002c";
      } else if (stationName.startsWith("G")) {
        stationColorArray[stationTWName] = "#008659";
      } else if (stationName.startsWith("O")) {
        stationColorArray[stationTWName] = "#f8b61c";
      } else if (stationName.startsWith("BL")) {
        stationColorArray[stationTWName] = "#0070bd";
      } else if (stationName.startsWith("Y")) {
        stationColorArray[stationTWName] = "#ffdb00";
      }
    } else {
      isTransferStation.push(stationTWName);
      stationColorArray[stationTWName] = "#000000";
    }

    document.getElementById("square" + stationName).style.color = randomColor;
    document.getElementById("square1" + stationName).style.color = randomColor;

    for (visitIndex in stationDetail["visitDataSince20170101"]) {
      let date = dateArray[visitIndex];
      let visit = stationDetail["visitDataSince20170101"][visitIndex];

      datasetsToAddToDailyData.push({
        x: date,
        y: visit,
      });

      let dayOfWeekIndex = date.weekday - 1;
      datasetToAddToWeekdayData[dayOfWeekIndex] += visit;
      dayOfWeekCounter[dayOfWeekIndex] += 1;

      if (datasetToAddToStationRankData != null) {
        datasetToAddToStationRankData += visit;
      }

      let monthIndex = date.month - 1;
      datasetAddToMonthlyData[monthIndex] += visit;
      monthCounter[monthIndex] += 1;
    };

    if (
      stationTWAdded.includes(stationTWName) &&
      !isTransferStation.includes(stationTWName)
    ) {
      datasetToAddToStationRankData = Math.floor(
        datasetToAddToStationRankData / dateArray.length
      );

      stationTWVisits.push(datasetToAddToStationRankData);
    };

    datasetToAddToWeekdayData.forEach((e, index) => {
      datasetToAddToWeekdayData[index] = Math.floor(
        datasetToAddToWeekdayData[index] / dayOfWeekCounter[index]
      );
    });
    datasetToAddToWeekdayData.push(null);
    datasetToAddToWeekdayData.unshift(null);

    datasetAddToMonthlyData.forEach((e, index) => {
      datasetAddToMonthlyData[index] = Math.floor(
        datasetAddToMonthlyData[index] / monthCounter[index]
      );
    });
    datasetAddToMonthlyData.push(null);
    datasetAddToMonthlyData.unshift(null);

    const datasetToAddToHourlyData = stationDetail["hourSum"];
    datasetToAddToHourlyData.forEach((e, index) => {
      datasetToAddToHourlyData[index] = Math.floor(
        datasetToAddToHourlyData[index] / dateArray.length
      );
    });
    datasetToAddToHourlyData.push(null);
    datasetToAddToHourlyData.unshift(null);

    pushDataSetToLineChart(
      stationName,
      datasetToAddToHourlyData,
      randomColor,
      dataHourlyDataChart
    );

    pushDataSetToLineChart(
      stationName,
      datasetsToAddToDailyData,
      randomColor,
      dataDailyLineChart
    );

    pushDataSetToLineChart(
      stationName,
      datasetToAddToWeekdayData,
      randomColor,
      dataWeekdayLineChart
    );

    pushDataSetToLineChart(
      stationName,
      datasetAddToMonthlyData,
      randomColor,
      dataMonthlyLineChart
    )
  }

  applyToStationRankData(
    sortStationRank(stationTWAdded, stationTWVisits, stationColorArray),
    15
  );
}

function sortStationRank(labelArray, dataArray, colorArray) {
  arrayToSort = labelArray.map((d, i) => {
    return {
      label: d,
      data: dataArray[i],
      color: colorArray[d],
    };
  });
  sortedArray = arrayToSort.sort((a, b) => {
    return b.data - a.data;
  });
  return sortedArray;
}

function applyToStationRankData(sortedArray, size) {
  let newArrayLabels = [];
  let newArrayData = [];
  let newArrayColor = [];
  sortedArray.forEach((d) => {
    newArrayLabels.push(d.label);
    newArrayData.push(d.data);
    newArrayColor.push(d.color);
  });

  dataStationRankBarChart.datasets[0].data = newArrayData.slice(0, size);
  dataStationRankBarChart.labels = newArrayLabels.slice(0, size);
  dataStationRankBarChart.datasets[0].backgroundColor = newArrayColor.slice(
    0,
    size
  );
  stationRankBarChart.update();
}

function excludeTransitionStation(
  labelArray,
  dataArray,
  colorArray,
  size,
  transferStationArray
) {
  sorted = sortStationRank(labelArray, dataArray, colorArray);
  excluded = [];
  sorted.forEach((d) => {
    if (!transferStationArray.includes(d.label)) {
      excluded.push(d);
    }
  });

  applyToStationRankData(excluded, size);
}

function pushDataSetToLineChart(name, dataset, color, ChartData) {
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
getDataAndDrawChart(mockPath);

// For Spring Boot routing to 'real' run fetching a deployed database on heroku-postgresql, use line below
// getDataAndDrawChart(realUrl);
