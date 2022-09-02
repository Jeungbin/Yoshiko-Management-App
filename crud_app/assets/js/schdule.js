const table = document.getElementById("table");
let tableBodies = document.querySelectorAll(".tableBody");
const totalUser = document.getElementById("total-user");
const teacherOption = document.getElementById("filterClassByTecher");
let persedDataforSchdule;
let selectTeacher;
let div = document.createElement("div");

function filterClassByTecher() {
  for (let i = 1; i < 19; i++) {
    for (let j = 1; j < 8; j++) {
      table.rows[i].cells[j].innerHTML = "";
    }
  }
  selectTeacher = teacherOption.options[teacherOption.selectedIndex].value;
  console.log(selectTeacher);

  function perseingData(data) {
    try {
      persedDataforSchdule = JSON.parse(data);
    } catch {
      data.replaceAll(`'`, `"`);
      data.replaceAll(`&#34;`, `"`);
      persedDataforSchdule = JSON.parse(data);
    }
    console.log(persedDataforSchdule);
    getNewData(persedDataforSchdule);
  }

  function getNewData(data) {
    let newData = [];

    data.map((user) => {
      if (user.teacher === selectTeacher) {
        console.log(selectTeacher);
        return newData.push(user);
      }
    });
    dispalySchdule(newData);
    totalUser.innerHTML = newData.length;
  }

  function dispalySchdule(newData) {
    newData.map((user) => {
      let userClassDate = [];

      userClassDate = user.classDate;
      //console.log(userClassDate);
      for (let i = 0; i < userClassDate.length; i++) {
        //console.log(user.classTime[1]);
        const innerTd = `<div  class='userSchedule'>
    <p class='userScheduleName'>${user.name}</p>
    <p class='userScheduleTime'>${user.classTime[0]}:${
          user.classTime[1] === 0 ? "00" : user.classTime[1]
        } - ${user.classTime[2]}:${
          user.classTime[3] === 0 ? "00" : user.classTime[3]
        }<p>
  </div>`;
        const innerTdInfo = (cellNum) => {
          if (user.classTime[0] === 12) {
            table.rows[7].cells[cellNum].innerHTML =
              table.rows[7].cells[cellNum].innerHTML + innerTd;
          }
          for (let j = 6; j < 12; j++) {
            if (user.classTime[0] === j) {
              if (user.classTimeZone === "Am") {
                table.rows[j - 5].cells[cellNum].innerHTML =
                  table.rows[j - 5].cells[cellNum].innerHTML + innerTd;
              } else {
                table.rows[j + 7].cells[cellNum].innerHTML =
                  table.rows[j + 7].cells[cellNum].innerHTML + innerTd;
              }
            }
          }
          for (let k = 1; k < 5; k++) {
            if (user.classTime[0] === k) {
              table.rows[k + 7].cells[cellNum].innerHTML =
                table.rows[k + 7].cells[cellNum].innerHTML + innerTd;
            }
          }
        };

        if (userClassDate[i] === "Mon") {
          innerTdInfo(1);
        }
        if (userClassDate[i] === "Tue") {
          innerTdInfo(2);
        }
        if (userClassDate[i] === "Wed") {
          innerTdInfo(3);
        }
        if (userClassDate[i] === "Thur") {
          innerTdInfo(4);
        }
        if (userClassDate[i] === "Fri") {
          innerTdInfo(5);
        }
        if (userClassDate[i] === "Sat") {
          innerTdInfo(6);
        }
        if (userClassDate[i] === "Sun") {
          innerTdInfo(7);
        }

        const divs = document.querySelectorAll(".userSchedule");
        for (let i = 0; i < divs.length; i++) {
          let divcolor = "";
          divcolor = "#" + Math.floor(Math.random() * 16777215).toString(16);
          console.log(divcolor);
          divs[i].style.backgroundColor = divcolor;
          for (let j = 0; j < divs.length; j++) {
            if (divs[i].innerText === divs[j].innerText) {
              divs[j].style.backgroundColor = divcolor;
            }
          }
        }
      }
    });
  }
  perseingData(DBUsers);
}

//console.log(tableBodies);

//table.rows[1].cells[1].innerHTML = "HI";
