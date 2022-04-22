const metroLineCodeList = [];
const stationList = [];

getListForCreatingMetroLineBtn(stationBtnList);
generateMetroLineDropDown();
generateStationMenu();
addEventListenerToStationAndMetroLine("");
addEventListenerToStationAndMetroLine("1");

function addEventListenerToStationAndMetroLine(id) {
  for (code of metroLineCodeList) {
    let lineSelect = document.getElementById("metroLine" + id + code);

    lineSelect.addEventListener("click", (event) => {
      let lineCode = event.target.nextElementSibling.textContent;
      document
        .querySelectorAll("input.stationOn" + id + lineCode)
        .forEach((station) => {
          station.checked = event.target.checked;
        });
    });
  }
}

function updateCheckedStations(id) {
  let elementId = "input.stationCheck" + id + ":checked";
  const checkedStations = [];
  document.querySelectorAll(elementId).forEach((element) => {
    checkedStations.push(element.nextElementSibling.childNodes[1].textContent);
  });
  return checkedStations;
}

function generateStationMenu() {
  const emptyStr = {};
  const emptyStrForSummary = {};
  for (line in metroLineCodeList) {
    emptyStrForSummary[metroLineCodeList[line]] = "";
    emptyStr[metroLineCodeList[line]] = "";
  }

  for (e of stationList) {
    let metroLine = stationBtnList[e][0];
    let station = stationBtnList[e][1];

    let first = '<li><input class="form-check-input stationOn';
    let second = metroLine + ' stationCheck';
    let third = '" type="checkbox"><label class="form-check-label"><span id="square';
    let last =
      station + '">&#9608\u0020</span>' + station + "</label></div></li>";

    emptyStr[metroLine] += first + second + third + last;
    emptyStrForSummary[metroLine] += first + "1" + second + "1" + third + "1" + last;
  }

  for (line in emptyStr) {
    document.getElementById("dropDownMetroLine" + line).innerHTML =
      emptyStr[line];
    document.getElementById("dropDownMetroLine1" + line).innerHTML =
      emptyStrForSummary[line];
  }
}

function generateMetroLineDropDown() {
  let str = "";
  let strLegend = "";

  metroLineCodeList.forEach((metroLine) => {
    let first =
      '<div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="metroLine';
    let second =
      metroLine +
      '"><label class="form-check-label">' +
      metroLine +
      '</label></div><a class="dropdown-toggle" data-bs-toggle="dropdown" href="#"></a><ul class="dropdown-menu" id="dropDownMetroLine';
    let third = metroLine + '"></ul>';
    str += first + second + third;

    strLegend += first + "1" + second + "1" + third;
  });
  document.getElementById("checkBoxForMetroSelect").innerHTML = str;
  document.getElementById("legendForSummary").innerHTML = strLegend;
}

function getListForCreatingMetroLineBtn(list) {
  for (e in list) {
    metroLine = list[e][0];
    if (!metroLineCodeList.includes(metroLine)) {
      metroLineCodeList.push(metroLine);
    }
    stationList.push(e);
  }
}

function checkDataSetStations(list, id) {
  if (list) {
    if (id == '') {
      for (d in dataDailyLineChart.datasets) {
        if (
          list.includes(dataDailyLineChart.datasets[d]["label"])
        ) {
          dailyLineChart.setDatasetVisibility(d, true);
        }
        if (
          !list.includes(dataDailyLineChart.datasets[d]["label"])
        ) {
          dailyLineChart.setDatasetVisibility(d, false);
        }
      }
      dailyLineChart.update();
    } else if (id == '1') {
      console.log("called");
      console.log(dataWeekdayLineChart.datasets);
      for (d in dataWeekdayLineChart.datasets) {
        if (
          list.includes(dataWeekdayLineChart.datasets[d]["label"])
        ) {
          console.log("show");
          weekDayChart.setDatasetVisibility(d, true);
          hourlyDataChart.setDatasetVisibility(d, true);
        };
        if (
          !list.includes(dataWeekdayLineChart.datasets[d]["label"])
        ) {
          console.log("hide");
          weekDayChart.setDatasetVisibility(d, false);
          hourlyDataChart.setDatasetVisibility(d, false);
        };
      };
      weekDayChart.update();
      hourlyDataChart.update();
    }
  };
}

function submitDateRange() {
  const startMonth = new DateTime.fromISO(
    document.getElementById("startMonthSelector").value
  )
    .startOf("month")
    .valueOf();
  const endMonth = new DateTime.fromISO(
    document.getElementById("endMonthSelector").value
  )
    .endOf("month")
    .valueOf();
  if (startMonth > endMonth) {
    alert("Start month MUST be equal or less than end month!");
    return;
  } else {
    dailyLineChart.options.scales.x.min = startMonth;
    dailyLineChart.options.scales.x.max = endMonth;
    dailyLineChart.update();
  }
}

function submitStation(id) {
  checkDataSetStations(updateCheckedStations(id), id);
}

function transferInRank() {
  isExcluded = document.getElementById("isExcluded").checked;
  if (isExcluded) {
    excludeTransitionStation(
      stationTWAdded,
      stationTWVisits,
      stationColorArray,
      15,
      isTransferStation
    );
    isExcluded = true;
  } else {
    applyToStationRankData(
      sortStationRank(stationTWAdded, stationTWVisits, stationColorArray),
      15
    );
    isExcluded = false;
  }
}
