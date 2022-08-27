const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("search-button");
const userTable = document.getElementById("user-table");
const userTableLessSeven = document.getElementById("user-table-less-seven");
const overDateTable = document.getElementById("user-table-over-date");
const showAllUserBtn = document.getElementById("all-user-btn");
const serchUser = document.getElementById("serchUser");
let classDateOption = document.getElementById("class-date");
let teacherOption = document.getElementById("teacher");
const remainingDateInput = document.getElementById("remaining-date-input");
const totalUser = document.getElementById("total-user");

let parsedData;
let dDayResult;
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
  overDateTable.innerHTML = "";
  userTable.innerHTML = "";
  userTableLessSeven.innerHTML = "";
  totalUser.innerHTML = parsedData.length;
  // console.log(parsedData.startDate.slice(0, 10));
  parsedData.map((item) => {
    const lastDate = item.startDate ? remainingDateCal(item.startDate) : "";
    console.log(lastDate);
    const lastdateYear = parseInt(lastDate.slice(0, 4));
    const lastdateMonth = parseInt(lastDate.slice(5, 7));
    const lastdateDate = parseInt(lastDate.slice(9, 11));

    const today = new Date();
    const dday = new Date(lastdateYear, lastdateMonth - 1, lastdateDate);
    const gap = dday.getTime() - today.getTime();
    var dDayResult = Math.ceil(gap / (1000 * 60 * 60 * 24));
    console.log(dDayResult);
    if (dDayResult <= 0) {
      return (overDateTable.innerHTML =
        overDateTable.innerHTML +
        `
        <tr class='box' id=${item.remainingDate}>
        <td id="name">${item.name}</td>
        <td>${item.phoneNum}</td>
        <td>${item.classDate}</td>
        <td>${
          item.startDate
            ? `${item.startDate.slice(5, 7)} / ${item.startDate.slice(8, 10)}`
            : ""
        }</td>
        <td style="background-color:red; border: 1px solid;">${dDayResult}</td>
        <td>${item.teacher}</td>
        <td>
            <a href="#" class="btn border-shadow update">
                <span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>
            </a>
            <a class="btn border-shadow delete">
                <span class="text-gradient"><i class="fas fa-times"></i></span>
            </a>
        </td>
        </tr>
          `);
    }
    if (dDayResult > 0 && dDayResult <= 7) {
      return (userTableLessSeven.innerHTML =
        userTableLessSeven.innerHTML +
        `
        <tr class='box' id=${item.remainingDate}>
        <td id="name">${item.name}</td>
        <td>${item.phoneNum}</td>
        <td>${item.classDate}</td>
        <td>${
          item.startDate
            ? `${item.startDate.slice(5, 7)} / ${item.startDate.slice(8, 10)}`
            : ""
        }</td>
        <td style="background-color:grey; border: 1px solid;">${dDayResult}</td>
        <td>${item.teacher}</td>
        <td>
            <a href="#" class="btn border-shadow update">
                <span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>
            </a>
            <a class="btn border-shadow delete">
                <span class="text-gradient"><i class="fas fa-times"></i></span>
            </a>
        </td>
        </tr>
          `);
    } else {
      return (userTable.innerHTML =
        userTable.innerHTML +
        `
      <tr class='box' id=${item.remainingDate}>
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
          <a href="#" class="btn border-shadow update">
              <span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>
          </a>
          <a class="btn border-shadow delete">
              <span class="text-gradient"><i class="fas fa-times"></i></span>
          </a>
      </td>
      </tr>
        `);
      // }
    }
  });
}

displayAllusers(DBUsers);

let tables = document.querySelectorAll(".box");

const resetBtn = document.getElementById("reset-button");
const resetBtn2 = document.getElementById("reset-button2");

function liveSearchName(e) {
  let serch_query = searchBar.value;
  for (var i = 0; i < parsedData.length; i++) {
    if (serch_query === "") {
      displayAllusers(DBUsers);
    } else {
      if (
        parsedData[i].name.toLowerCase().includes(serch_query.toLowerCase())
      ) {
        tables[i].classList.remove("is-hidden");
      } else {
        tables[i].classList.add("is-hidden");
      }
    }
  }
}

function liveSearchDate() {
  let serch_query = parseInt(remainingDateInput.value);
  console.log(serch_query);

  for (var i = 0; i < tables.length; i++) {
    console.log(dDayResult);
    if (serch_query === "") {
      tables[i].classList.remove("is-hidden");
    } else {
      if (dDayResult <= serch_query) {
        tables[i].classList.remove("is-hidden");
      } else {
        tables[i].classList.add("is-hidden");
      }
    }
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
  if (
    serch_query_classDate === "Class Date" &&
    serch_query_teacher === "Teacher"
  ) {
    for (var i = 0; i < tables.length; i++) {
      tables[i].classList.remove("is-hidden");
    }
  }
  if (
    serch_query_classDate !== "Class Date" &&
    serch_query_teacher === "Teacher"
  ) {
    for (var i = 0; i < parsedData.length; i++) {
      console.log(parsedData[2].classDate);
      if (parsedData[i].classDate === serch_query_classDate) {
        tables[i].classList.remove("is-hidden");
      } else {
        tables[i].classList.add("is-hidden");
      }
    }
  }
  if (
    serch_query_classDate === "Class Date" &&
    serch_query_teacher !== "Teacher"
  ) {
    for (var i = 0; i < parsedData.length; i++) {
      console.log(parsedData[0].teacher);
      if (parsedData[i].teacher === serch_query_teacher) {
        tables[i].classList.remove("is-hidden");
      } else {
        tables[i].classList.add("is-hidden");
      }
    }
  }
  if (
    serch_query_classDate !== "Class Date" &&
    serch_query_teacher !== "Teacher"
  ) {
    for (var i = 0; i < parsedData.length; i++) {
      if (
        parsedData[i].teacher === serch_query_teacher &&
        parsedData[i].classDate === serch_query_classDate
      ) {
        tables[i].classList.remove("is-hidden");
      } else {
        tables[i].classList.add("is-hidden");
      }
    }
  }
}

showAllUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  for (var i = 0; i < parsedData.length; i++) {
    tables[i].classList.remove("is-hidden");
  }
  document.getElementById("searchBar").value = "";
  document.getElementById("remaining-date-input").value = "";
});

let typingTimer;
let typeInterval = 200;

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearTimeout(typingTimer);
  typingTimer = setTimeout(liveSearchName, typeInterval);
});

remainingDateInput.addEventListener("change", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(liveSearchDate, typeInterval);
});
