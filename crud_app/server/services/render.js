const axios = require("axios");
// this module is going to allow us to make a request
//브라우저와 node를 위한 비동기 통신 라이브러리  axios를 활용하기 전에는 주로 fetch함수를 통해 백엔드와 통신
exports.homeRoutes = (req, res) => {
  //Make a get request to /api/users
  // this get request is going to return promise
  axios
    .get("http://localhost:3000/api/users")
    .then((response) => {
      res.render("index", { users: response.data });
      // first is index.js / second data has all the records of mongoDB
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_user = (req, res) => {
  res.render("add_user");
};

exports.update_user = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
    // get specific data
    .then(function (userdata) {
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
