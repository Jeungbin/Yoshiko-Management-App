$("#add_user").submit(function (event) {
  alert("Data Inserted Successfully!");
});

$("#update_user").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  var request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert("Data Updated Successfully!");
  });
});

const allDelteBtn = document.querySelectorAll("#deleteBtn");

for (let i = 0; i < allDelteBtn.length; i++) {
  allDelteBtn[i].addEventListener("click", (event) => {
    event.preventDefault();

    var id = allDelteBtn[i].dataset.id;
    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function (response) {
        alert("Data Deleted Successfully!");
        location.reload();
      });
    }
  });
}

// if (window.location.pathname == "/") {
//   $ondelete = $(".table tbody td a.delete");
//   //$ondelete  => create the val
//   $ondelete.click(function () {
//     var id = $(this).attr("data-id");
//     //attr == attribute

//     var request = {
//       url: `http://localhost:3000/api/users/${id}`,
//       method: "DELETE",
//     };

//     if (confirm("Do you really want to delete this record?")) {
//       $.ajax(request).done(function (response) {
//         alert("Data Deleted Successfully!");
//         location.reload();
//       });
//     }
//   });
// }
