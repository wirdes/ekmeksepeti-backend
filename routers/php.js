const express = require("express");
const router = express.Router();
const axios = require("axios");
const wallets = require("./wallet.json");
const asyncHandler = require("express-async-handler");

const controlWallet = (wallets, data, link) => {
  let say = 0;
  wallets.forEach((wallet) => {
    if (data.search("0x") > 0) {
      say++;
    }
  });
  let winner = [];
  wallets.forEach((wallet) => {
    if (data.search(wallet.wallet) > 0) {
      winner.push(wallet.name);
    }
  });
  if (say < 20) {
    return ["site kontrol ediniz.", link, "hatalı"];
  }
  if (winner.length > 0) {
    return winner;
  }
  return ["kazanan yok"];
};

const getData = async (link) => {
  const { data } = await axios.get(link);

  return controlWallet(wallets, data, link);
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

      res.send(
        `${a.join(
          " "
        )}<a href="https://merterim.com/takip/kontrol.php"> <p>Siteye Dön</p></a>`
      );
    }
  })
);

module.exports = router;
