const express = require('express');
const app = express();
const port = 3000;

const goodsRouter = require('./routes/goods.js');
const cartsRouter = require('./routes/carts.js');
const connect = require("./schemas");
connect();


// 바디파서 미들웨어를 쓰기위한 문법
app.use(express.json());
app.use("/api", [goodsRouter, cartsRouter]);

app.post("/", (req, res) => {
  console.log(req.body);

  res.send('기본 URI에 POST 메소드가 정상적으로 실행되었습니다.');
})

// req.query
app.get("/", (req, res) => {
  console.log(req.query);

  res.status(400).json({
    "KeyKey": "value입니다.",
    "이름입니다": "이름일까요?",
  });
});

// req.params
app.get("/:id", (req, res) => {
  console.log(req.params);

  res.send(":id URI에 정상적으로 반환되었습니다.");
})


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});