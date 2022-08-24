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

let parsedData;

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

  parsedData.map((item) => {
    // if (item.remainingDate <= 0) {
    //   return (overDateTable.innerHTML =
    //     overDateTable.innerHTML +
    //     `
    //     <tr class='box' id=${item.remainingDate}>
    //     <td id="name">${item.name}</td>
    //     <td>${item.phoneNumber}</td>
    //     <td>${item.classDate}</td>
    //     <td>${item.startingDate}</td>
    //     <td style="background-color:red;">${item.remainingDate}</td>
    //     <td>${item.teacher}</td>
    //     <td>
    //         <a href="#" class="btn border-shadow update">
    //             <span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>
    //         </a>
    //         <a class="btn border-shadow delete">
    //             <span class="text-gradient"><i class="fas fa-times"></i></span>
    //         </a>
    //     </td>
    //     </tr>
    //       `);
    // }
    // if (item.remainingDate <= 7) {
    //   return (userTableLessSeven.innerHTML =
    //     userTableLessSeven.innerHTML +
    //     `
    //     <tr class='box' id=${item.remainingDate}>
    //     <td id="name">${item.name}</td>
    //     <td>${item.phoneNumber}</td>
    //     <td>${item.classDate}</td>
    //     <td>${item.startingDate}</td>
    //     <td style="background-color:grey;">${item.remainingDate}</td>
    //     <td>${item.teacher}</td>
    //     <td>
    //         <a href="#" class="btn border-shadow update">
    //             <span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>
    //         </a>
    //         <a class="btn border-shadow delete">
    //             <span class="text-gradient"><i class="fas fa-times"></i></span>
    //         </a>
    //     </td>
    //     </tr>
    //       `);
    // } else {
    return (userTable.innerHTML =
      userTable.innerHTML +
      `
      <tr class='box' id=${item.remainingDate}>
      <td id="name">${item.name}</td>
      <td>${item.phoneNum}</td>
      <td>${item.classDate}</td>
      <td>${item.startDate}</td>
      <td id='remainingDate' + ${item.id}>${item.remainingDate}</td>
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
  for (var i = 0; i < tables.length; i++) {
    if (serch_query === "") {
      tables[i].classList.remove("is-hidden");
    } else {
      if (tables[i].id <= serch_query) {
        tables[i].classList.remove("is-hidden");
      } else {
        tables[i].classList.add("is-hidden");
      }
    }
  }
}

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  for (var i = 0; i < parsedData.length; i++) {
    tables[i].classList.remove("is-hidden");
  }
  document.getElementById("searchBar").value = "";
});

resetBtn2.addEventListener("click", (e) => {
  e.preventDefault();
  for (var i = 0; i < tables.length; i++) {
    tables[i].classList.remove("is-hidden");
  }
  document.getElementById("remaining-date-input").value = "";
});

function filter() {
  let serch_query_classDate =
    classDateOption.options[classDateOption.selectedIndex].text;
  let serch_query_teacher =
    teacherOption.options[teacherOption.selectedIndex].text;
  console.log(parsedData[0].classDate);
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
  classDateOption.value = "class-date";
  teacherOption.value = "teacher";
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
