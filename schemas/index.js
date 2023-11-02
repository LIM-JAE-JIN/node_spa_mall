const mongoose = require("mongoose");

const connect = () => {
  mongoose
    // .connect("mongodb://localhost:27017/spa_mall")
    .connect("mongodb://127.0.0.1:27017/spa_mall")
    .catch(err => console.log(err));
};

// 몽고디비 연결할 때 에러가 났을 때 에러핸들링
mongoose.connection.on("error", err => {
  console.log("몽고디비 연결 에러", err);
});

module.exports = connect;