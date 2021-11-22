const express = require("express");
const router = express.Router();
const axios = require("axios");
const wallets = require("./wallet.json");
const asyncHandler = require("express-async-handler");

const controlWallet = (wallets, data) => {
  let winner = [];
  wallets.forEach((wallet) => {
    if (data.search(wallet.wallet) > 0) {
      winner.push(wallet.name);
    }
  });
  if (winner.length > 0) {
    return winner;
  }
  return ["kazanan yok"];
};

const getData = async (link) => {
  const { data } = await axios.get(link);

  return controlWallet(wallets, data);
};
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.json({ succes: "true" });
  })
);
router.get(
  "/test",
  asyncHandler(async (req, res, next) => {
    if (req.query.link != undefined) {
      const a = await getData(req.query.link);

      res.send(`${a.join(" ")}asd<br><a href="merterim.com/takip>SİTEYE DÖN</a><br>`)
    }
  })
);

module.exports = router;
