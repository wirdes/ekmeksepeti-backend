const express = require("express");
const router = express.Router();
const axios = require("axios");
const wallets = require("./wallet.json");
const asyncHandler = require("express-async-handler");
function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      return false;
    }
  }
  return true;
}
const controlWallet = (wallets, data, link) => {
  let allwallets = [];

  data1 = data.split(" ");
  data1.forEach((wallet) => {
    let abc = [];
    const index = wallet.search("0x");

    if (index > 0) {
      for (let i = index; i < wallet.length; i++) {
        if (isAlphaNumeric(wallet[i])) {
          abc.push(wallet[i]);
        } else {
          break;
        }
      }
    }
    if (abc.length == 42) {
      allwallets.push(abc.join(""));
    }
  });

  let winner = [];
  wallets.forEach((wallet) => {
    if (allwallets.join("").search(wallet.wallet) > 0) {
      a = data.search(wallet.wallet);
      winner.push(wallet.name);
    }
  });
  if (allwallets.length === 0) {
    return ["site kontrol ediniz", link];
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
