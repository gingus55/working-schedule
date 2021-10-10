let baseArray = [
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

// const initialiseLocalStorage = function(baseArray){
//     const scheduleData = JSON.parse(localStorage.getItem("schedule")) || [];

//     console.log(scheduleData);
    // scheduleData.push(baseArray);
    // localStorage.setItem("schedule",JSON.stringify(baseArray));
    // console.log(baseArray);
// }

const mainContainer = $(".container");

const date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

const timerTick = function () {
    
    const clockContainer = $("#clock")
    const dateTime = moment();
    const dateTimeFormatted = dateTime.format('dddd, Do MMMM, YYYY kk:mm:ss');

    clockContainer.text(dateTimeFormatted);
  };

  const timer = setInterval(timerTick, 1000);

// console.log(date);

const constructTimeBlocks = function (baseArray) {
  // construct each time block
  constructTimeBlock = function (each) {
    return `<div class="row block">
  <div class="col-2 time">
    ${each.time}
  </div>
  <div class="col-9 future activity">
    <textarea name="action${each.id}" id="action${each.id}"></textarea>
  </div>
  <div class="col-1 buttonbox saveBtn">
    <div id="saveBtn" data-log="${each.id}" class="px-3 clicker align-items-center row save"><i class=" far fa-save"></i></div>
    <div id="binBtn" data-log="${each.id}" class="px-3 clicker align-items-center row delete"><i class="fas fa-dumpster"></i></div>
  </div>
</div>`;
  };
  //   console.log(baseArray);
  return baseArray.map(constructTimeBlock).join("");
};

const renderTimeBlocks = function (baseArray) {
  // create blocks
  const blocks = constructTimeBlocks(baseArray);
  // append blocks
  mainContainer.append(blocks);
};

const onReady = function () {
  console.log("hello world");

//   initialiseLocalStorage(baseArray);

  renderTimeBlocks(baseArray);

  const handleClick = function (event) {
    const target = $(event.target);
    const log = target.attr("data-log");
    let activityTarget = "action"+log;
    let textBox = document.getElementById(activityTarget);

    if (target.is("#saveBtn")) {
        console.log(textBox.value);
      
    //   console.log(log);

    //   console.log("click");
    }
  };

  mainContainer.on("click", handleClick);
};

$(document).ready(onReady);
