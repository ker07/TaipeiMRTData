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
    checkedStations.push(element.nextElementSibling.textContent);
  });
  return checkedStations;
}

function generateStationMenu() {
  var emptyStr = {};
  for (line in metroLineCodeList) {
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
      station +
      "</label></div></li>";
  }
  for (e in emptyStr) {
    document.getElementById("dropDownMetroLine" + e).innerHTML = emptyStr[e];
  }
}

function generateMetroLineDropDown() {
  let str = "";
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
  });
  document.getElementById("checkBoxForMetroSelect").innerHTML = str;
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
    for (d in data.datasets) {
      if (
        list.includes(data.datasets[d]["label"]) &&
        myLineChart.getDataVisibility(d)
      ) {
        myLineChart.setDatasetVisibility(d, true);
      }
      if (
        !list.includes(data.datasets[d]["label"]) &&
        myLineChart.getDataVisibility(d)
      ) {
        myLineChart.setDatasetVisibility(d, false);
      }
    }
    myLineChart.update();
  }
}

function submitDateRange () {
    const startMonth = new DateTime.fromISO(document.getElementById("startMonthSelector").value).startOf("month").valueOf();
    const endMonth = new DateTime.fromISO(document.getElementById("endMonthSelector").value).endOf("month").valueOf();
    if (startMonth > endMonth) {
        alert('Start month MUST be equal or less than end month!');
        return;
    } else {
        myLineChart.options.scales.x.min = startMonth;
        myLineChart.options.scales.x.max = endMonth;
        myLineChart.update();
    };
}

function submitStation() {
    checkDataSetStations(updateCheckedStations());
}
