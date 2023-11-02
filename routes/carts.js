const express = require("express");
const router = express.Router();

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

// localhost:3000/api/carts GET Method
router.get("/carts", async (req, res) => {
  const carts = await Cart.find({});
  // [
  //   { goodsId, quantity }
  // ];

  const goodsIds = carts.map((cart) => {
    return cart.goodsId;
  });
  // [2, 11, 19 ...]

  const goods = await Goods.find({ goodsId: goodsIds });
  // Goods에 해당하는 모든 정보를 가지고 올건데,
  // 만약 goodsIds 변수 안에 존재하는 값일 때에만 조회해라.

  const results = carts.map((cart) => {
    return {
      "quantity": cart.quantity,
      "goods": goods.find((item) => item.goodsId === cart.goodsId),
    }
  })

  res.json({
    "carts": results
  })
});

// 장바구니에 상품 추가 (개수포함)
router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 장바구니에 해당하는 상품이 존재합니다.",
    })
  }

  await Cart.create({ goodsId, quantity });

  res.json({ "result": "success" });
})

// 장바구니 상품 개수 수정
router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    await Cart.updateOne(
      { goodsId: goodsId },
      { $set: { quantity: quantity } }
    )
  }
  res.status(200).json({ success: true });
})

// 장바구니 상품 삭제
router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    await Cart.deleteOne({ goodsId });
  }

  res.status(200).json({ success: true });
})


module.exports = router;