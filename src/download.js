const fs = require("fs");
const request = require("request");
var { countries } = require("./countryinfo");

const download = (url, dest, cb) => {
  const file = fs.createWriteStream(dest);
  const sendReq = request.get(url);
  // verify response code
  sendReq.on("response", (response) => {
    sendReq.pipe(file);
  });
  // close() is async, call cb after close completes
  file.on("finish", () => file.close());
};

let codes = countries.map((e) => e.Alpha2Code.toLowerCase());

codes.forEach((e) => {
  download(
    `https://www.countryflags.io/${e}/shiny/48.png`,
    `./flags/${e}.png`,
    function (s) {
      console.log(s);
    }
  );
});
