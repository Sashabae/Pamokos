const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../data/carrier-data.json");
// load env variables

const data = JSON.parse(
  fs.readFileSync(dir, "utf8", (err) => {
    if (err) {
      console.error("Error: ", err);
      return;
    }
  })
);

module.exports = { data, dir, fs };
