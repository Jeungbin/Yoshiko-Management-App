const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("search-button");
const userTable = document.getElementById("user-table");
const userTableLessSeven = document.getElementById("user-table-less-seven");
const overDateTable = document.getElementById("user-table-over-date");
const showAllUserBtn = document.getElementById("all-user-btn");
const serchUser = document.getElementById("serchUser");
const reamainingDaysOption = document.getElementById("reamainingDaysOption");
let classDateOption = document.getElementById("class-date");
let teacherOption = document.getElementById("teacher");
const remainingDateInput = document.getElementById("remaining-date-input");
const totalUser = document.getElementById("total-user");

let parsedData;
let orderData;
let dDayResult;

function setTable(parsedData) {
  overDateTable.innerHTML = "";
  userTableLessSeven.innerHTML = "";
  userTable.innerHTML = "";
  parsedData.map((item) => {
    const lastDate = item.startDate ? remainingDateCal(item.startDate) : "";
    // console.log(lastDate);
    const lastdateYear = parseInt(lastDate.slice(0, 4));
    const lastdateMonth = parseInt(lastDate.slice(5, 7));
    const lastdateDate = parseInt(lastDate.slice(9, 11));

    const today = new Date();
    const dday = new Date(lastdateYear, lastdateMonth - 1, lastdateDate);
    const gap = dday.getTime() - today.getTime();
    var dDayResult = Math.ceil(gap / (1000 * 60 * 60 * 24));
    //console.log(dDayResult);
    // const firstData = [];
    // const middleData = [];
    // const thirdData = [];
    //console.log(item.classDate);
    if (dDayResult <= 0) {
      //firstData.push
      return (overDateTable.innerHTML =
        overDateTable.innerHTML +
        `
        <tr class='box' id=${item._id}>
        <td id="name">${item.name}</td>
        <td>${item.phoneNum}</td>
        <td>${item.classDate}</td>
        <td>${
          item.startDate
            ? `${item.startDate.slice(5, 7)} / ${item.startDate.slice(8, 10)}`
            : ""
        }</td>
        <td style="background-color:#ef233c; border: 1px solid #d3d3d3;">${dDayResult}</td>
        <td>${item.teacher}</td>
        <td>
            <a href="/update-user?id=${
              item._id
            }" class="btn border-shadow update">
                <span class="text-gradient"><i class="fa-solid fa-pen-to-square"></i></span>
            </a>
            <a id='deleteBtn' class="btn border-shadow delete" data-id=${
              item._id
            }>
                <span class="text-gradient"><i class="fa-solid fa-circle-minus"></i></span>
            </a>
        </td>
        </tr>
          `);
    }
    if (dDayResult > 0 && dDayResult <= 7) {
      return (userTableLessSeven.innerHTML =
        userTableLessSeven.innerHTML +
        `
        <tr class='box' id=${item._id}>
        <td id="name">${item.name}</td>
        <td>${item.phoneNum}</td>
        <td>${item.classDate}</td>
        <td>${
          item.startDate
            ? `${item.startDate.slice(5, 7)} / ${item.startDate.slice(8, 10)}`
            : ""
        }</td>
        <td style="background-color:#ffd97d;  border: 1px solid #d3d3d3;">${dDayResult}</td>
        <td>${item.teacher}</td>
        <td>
            <a href="/update-user?id=${
              item._id
            }" class="btn border-shadow update">
                <span class="text-gradient"><i class="fa-solid fa-pen-to-square"></i></span>
            </a>
            <a id='deleteBtn' class="btn border-shadow delete" data-id=${
              item._id
            }>
                <span class="text-gradient"><i class="fa-solid fa-circle-minus"></i></span>
            </a>
        </td>
        </tr>
          `);
    } else {
      return (userTable.innerHTML =
        userTable.innerHTML +
        `
      <tr class='box' id=${item._id}>
      <td id="name">${item.name}</td>
      <td>${item.phoneNum}</td>
      <td>${item.classDate}</td>
      <td>${
        item.startDate
          ? `${item.startDate.slice(5, 7)} / ${item.startDate.slice(8, 10)}`
          : ""
      }</td>
      <td id='remainingDate' + ${item.id}>${dDayResult}</td>
      <td>${item.teacher}</td>
      <td>
          <a href="/update-user?id=${
            item._id
          }" class="btn border-shadow update">
              <span class="text-gradient"><i class="fa-solid fa-pen-to-square"></i></span>
          </a>
          <a id='deleteBtn' class="btn border-shadow delete" data-id=${
            item._id
          }>
              <span class="text-gradient"><i class="fa-solid fa-circle-minus"></i></span>
          </a>
      </td>
      </tr>
        `);
      // }
    }
  });
}

function remainingDateCal(dateString) {
  const startDate = dateString;
  const year = parseInt(startDate.slice(0, 4));
  const month = parseInt(startDate.slice(5, 7));
  const day = parseInt(startDate.slice(8, 10));
  let date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + 28);
  return date.toLocaleString("ko-KR", { timeZone: "UTC" });
}

function displayAllusers(data) {
  try {
    parsedData = JSON.parse(data);
  } catch {
    data.replaceAll(`'`, `"`);
    data.replaceAll(`&#34;`, `"`);
    parsedData = JSON.parse(data);
  }
  //console.log(parsedData);
  totalUser.innerHTML = parsedData.length;
  // console.log(parsedData.startDate.slice(0, 10));
  setTable(parsedData);
}

displayAllusers(DBUsers);

let tables = document.querySelectorAll(".box");

const resetBtn = document.getElementById("reset-button");
const resetBtn2 = document.getElementById("reset-button2");

function liveSearchName(e) {
  let serch_query = searchBar.value;
  const newDataArray = [];
  for (var i = 0; i < parsedData.length; i++) {
    //console.log(tables[i]);
    if (serch_query === "") {
      displayAllusers(DBUsers);
    } else {
      if (
        parsedData[i].name.toLowerCase().includes(serch_query.toLowerCase())
      ) {
        newDataArray.push(parsedData[i]);
        console.log(newDataArray);
        setTable(newDataArray);
      }
    }
  }
}

// const userTable = document.getElementById("user-table");
// const userTableLessSeven = document.getElementById("user-table-less-seven");
// const overDateTable = document.getElementById("user-table-over-date");

function liveSearchDate() {
  let serch_query =
    reamainingDaysOption.options[reamainingDaysOption.selectedIndex].text;
  console.log(serch_query);
  if (serch_query === "Select Remaining Date") {
    displayAllusers(DBUsers);
    overDateTable.classList.remove("is-hidden");
    userTableLessSeven.classList.remove("is-hidden");
    userTable.classList.remove("is-hidden");
  }
  if (serch_query === "Over Date") {
    overDateTable.classList.remove("is-hidden");
    userTableLessSeven.classList.add("is-hidden");
    userTable.classList.add("is-hidden");
  }
  if (serch_query === "Less Than 7 Days") {
    userTableLessSeven.classList.remove("is-hidden");
    userTable.classList.add("is-hidden");
    overDateTable.classList.add("is-hidden");
  }
  if (serch_query === "More Than 7 Days") {
    userTable.classList.remove("is-hidden");
    userTableLessSeven.classList.add("is-hidden");
    overDateTable.classList.add("is-hidden");
  }
}

// resetBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   for (var i = 0; i < parsedData.length; i++) {
//     tables[i].classList.remove("is-hidden");
//   }
//   document.getElementById("searchBar").value = "";
// });

// resetBtn2.addEventListener("click", (e) => {
//   e.preventDefault();
//   for (var i = 0; i < tables.length; i++) {
//     tables[i].classList.remove("is-hidden");
//   }
//   document.getElementById("remaining-date-input").value = "";
// });

function filter() {
  let serch_query_classDate =
    classDateOption.options[classDateOption.selectedIndex].text;
  let serch_query_teacher =
    teacherOption.options[teacherOption.selectedIndex].text;
  //console.log(serch_query_classDate);
  const newDataArray = [];
  if (
    serch_query_classDate === "Class Date" &&
    serch_query_teacher === "Teacher"
  ) {
    for (var i = 0; i < tables.length; i++) {
      displayAllusers(DBUsers);
    }
  }
  if (
    serch_query_classDate !== "Class Date" &&
    serch_query_teacher === "Teacher"
  ) {
    for (var i = 0; i < parsedData.length; i++) {
      if (parsedData[i].classDate.includes(serch_query_classDate)) {
        newDataArray.push(parsedData[i]);
        setTable(newDataArray);
      } else {
        setTable(newDataArray);
      }
    }
  }
  if (
    serch_query_classDate === "Class Date" &&
    serch_query_teacher !== "Teacher"
  ) {
    for (var i = 0; i < parsedData.length; i++) {
      if (parsedData[i].teacher === serch_query_teacher) {
        newDataArray.push(parsedData[i]);
        console.log(newDataArray);
        setTable(newDataArray);
      } else {
        setTable(newDataArray);
      }
    }
  }
  if (
    serch_query_classDate !== "Class Date" &&
    serch_query_teacher !== "Teacher"
  ) {
    console.log("here");
    for (var i = 0; i < parsedData.length; i++) {
      if (
        parsedData[i].teacher === serch_query_teacher &&
        parsedData[i].classDate.includes(serch_query_classDate)
      ) {
        newDataArray.push(parsedData[i]);
        console.log(newDataArray);
        setTable(newDataArray);
      } else {
        setTable(newDataArray);
      }
    }
  }
}

showAllUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  displayAllusers(DBUsers);
  document.getElementById("searchBar").value = "";
  userTable.classList.remove("is-hidden");
  userTableLessSeven.classList.remove("is-hidden");
  overDateTable.classList.remove("is-hidden");
});

let typingTimer;
let typeInterval = 200;

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearTimeout(typingTimer);
  typingTimer = setTimeout(liveSearchName, typeInterval);
});

// remainingDateInput.addEventListener("click", () => {
//   clearTimeout(typingTimer);
//   typingTimer = setTimeout(liveSearchDate, typeInterval);
// });
