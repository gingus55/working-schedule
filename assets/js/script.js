let baseArray = [
  { id: 9, time: "9AM", text: "9am" },
  { id: 10, time: "10AM", text: "10am" },
  { id: 11, time: "11AM", text: "11am" },
  { id: 12, time: "12AM", text: "12am" },
  { id: 13, time: "1PM", text: "" },
  { id: 14, time: "2PM", text: "" },
  { id: 15, time: "3PM", text: "" },
  { id: 16, time: "4PM", text: "" },
  { id: 17, time: "5PM", text: "" },
];

const mainContainer = $(".container");
const scheduleData = JSON.parse(localStorage.getItem("schedule")) || [];
const date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

console.log(date);

const constructTimeBlocks = function (baseArray) {
  // construct each time block
  constructTimeBlock = function (each) {
    return `<div class="row block">
  <div class="col-1 time">
    ${each.time}
  </div>
  <div class="col-10 future activity">
    <textarea id="action">${each.text}</textarea>
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

  renderTimeBlocks(baseArray);

  const handleClick = function (event) {
    const target = $(event.target);
    const attr = target.attr("id");
    const log = target.attr("data-log");

    if (target.is("#saveBtn")) {
      const textContent = baseArray[log - 9].text;
      console.log(textContent);
      console.log(log);

      console.log("click");
    }
  };

  mainContainer.on("click", handleClick);
};

$(document).ready(onReady);
