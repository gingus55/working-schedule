const baseArray = [
  { id: 9, time: "9AM", text: "" },
  { id: 10, time: "10AM", text: "" },
  { id: 11, time: "11AM", text: "" },
  { id: 12, time: "12AM", text: "" },
  { id: 13, time: "1PM", text: "" },
  { id: 14, time: "2PM", text: "" },
  { id: 15, time: "3PM", text: "" },
  { id: 16, time: "4PM", text: "" },
  { id: 17, time: "5PM", text: "" },
];

const initialiseLocalStorage = function (baseArray) {
  const scheduleData =
    JSON.parse(localStorage.getItem("schedule")) || baseArray;

  localStorage.setItem("schedule", JSON.stringify(scheduleData));

  return scheduleData;
};

const mainContainer = $(".container");

const timerTick = function () {
  const clockContainer = $("#clock");
  const dateTime = moment();
  const dateTimeFormatted = dateTime.format("dddd, Do MMMM, YYYY kk:mm:ss");

  clockContainer.text(dateTimeFormatted);
};

const timer = setInterval(timerTick, 1000);

const blockHtml = function (each, timeClass) {
  return `<div class="row block">
  <div class="col-2 time">
    ${each.time}
  </div>
  <div class="col-9 ${timeClass} activity">
    <textarea name="action${each.id}" id="action${each.id}">${each.text}</textarea>
  </div>
  <div class="col-1 buttonbox saveBtn">
    <div id="saveBtn" data-log="${each.id}" class="px-3 clicker align-items-center row save"><i class=" far fa-save"></i></div>
    <div id="binBtn" data-log="${each.id}" class="px-3 clicker align-items-center row delete"><i class="fas fa-dumpster"></i></div>
  </div>
</div>`;
};

const constructTimeBlocks = function (scheduleData) {
  constructTimeBlock = function (each) {
    const currentHour = moment().hour();

    const blockTime = each.id;
    let timeClass;

    if (blockTime < currentHour) {
      timeClass = "past";
    } else if (blockTime === currentHour) {
      timeClass = "present";
    } else {
      timeClass = "future";
    }

    return blockHtml(each, timeClass);
  };

  return scheduleData.map(constructTimeBlock).join("");
};

const renderTimeBlocks = function (scheduleData) {
  const blocks = constructTimeBlocks(scheduleData);

  mainContainer.append(blocks);
};

const onReady = function () {
  initialiseLocalStorage(baseArray);

  renderTimeBlocks(initialiseLocalStorage(baseArray));

  const handleClick = function (event) {
    const target = $(event.target);
    const log = target.attr("data-log");
    let activityTarget = "action" + log;
    let textBox = document.getElementById(activityTarget);

    if (target.is("#saveBtn")) {
      const arr = JSON.parse(localStorage.getItem("schedule"));
      arr[log - 9].text = textBox.value;

      localStorage.setItem("schedule", JSON.stringify(arr));
    }
    if (target.is("#binBtn")) {
      const arr = JSON.parse(localStorage.getItem("schedule"));
      arr[log - 9].text = "";

      localStorage.setItem("schedule", JSON.stringify(arr));
      textBox.value = "";
    }
  };

  mainContainer.on("click", handleClick);
};

$(document).ready(onReady);



