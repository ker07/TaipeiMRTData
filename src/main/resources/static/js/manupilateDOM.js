const metroLineCodeList = [];
const stationList = [];

getListForCreatingMetroLineBtn(stationBtnList);
generateMetroLineDropDown();
generateStationMenu();
addEventListenerToStationAndMetroLine();

function addEventListenerToStationAndMetroLine() {
  for (code of metroLineCodeList) {
    var lineSelect = document.getElementById("metroLine" + code);

    lineSelect.addEventListener("click", (event) => {
      let lineCode = event.target.nextElementSibling.textContent;
      document
        .querySelectorAll("input.stationOn" + lineCode)
        .forEach((station) => {
          station.checked = event.target.checked;
        });
    });
  }
}

function updateCheckedStations() {
  const checkedStations = [];
  document.querySelectorAll("input.stationCheck:checked").forEach((element) => {
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
    var metroLine = stationBtnList[e][0];
    var station = stationBtnList[e][1];
    emptyStr[metroLine] +=
      '<li><input class="form-check-input stationOn' +
      metroLine +
      ' stationCheck" type="checkbox" checked>\
    <label class="form-check-label">' +
      '<span id="square' +
      station +
      '">&#9608\u0020</span>' +
      station +
      "</label></div></li>";

    emptyStrForSummary[metroLine] +=
      '<li><label class="form-check-label">' +
      '<span id="square1' +
      station +
      '">&#9608\u0020</span>' +
      station +
      "</label></li>";
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
    str +=
      '<div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="metroLine' +
      metroLine +
      '" checked>\
      <label class="form-check-label">' +
      metroLine +
      '</label></div><a class="dropdown-toggle" data-bs-toggle="dropdown" href="#"></a>\
      <ul class="dropdown-menu" id="dropDownMetroLine' +
      metroLine +
      '"></ul>';

    strLegend +=
      '<div class="form-check form-check-inline">\
      <label class="form-check-label">' +
      metroLine +
      '</label></div><a class="dropdown-toggle" data-bs-toggle="dropdown" href="#"></a>\
      <ul class="dropdown-menu" id="dropDownMetroLine1' +
      metroLine +
      '"></ul>';
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

function checkDataSetStations(list) {
  if (list) {
    for (d in dataDailyLineChart.datasets) {
      if (
        list.includes(dataDailyLineChart.datasets[d]["label"]) &&
        dailyLineChart.getDataVisibility(d)
      ) {
        dailyLineChart.setDatasetVisibility(d, true);
      }
      if (
        !list.includes(dataDailyLineChart.datasets[d]["label"]) &&
        dailyLineChart.getDataVisibility(d)
      ) {
        dailyLineChart.setDatasetVisibility(d, false);
      }
    }
    dailyLineChart.update();
  }
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

function submitStation() {
  checkDataSetStations(updateCheckedStations());
}
