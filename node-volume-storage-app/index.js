// Read file and print its contents to console
const fs = require("fs");
const path = require("path");

const dataPath = process.env.DATA_PATH;

console.log("process.env.DATA_PATH =", dataPath);

fs.readdir(dataPath, (err, files) => {
  console.log("readdir", dataPath, err, files);
  if (err) {
    throw err;
  }

  if (!files.length) {
    console.log("no files found in ", dataPath);
  }

  files.forEach((file) => {
    const filePath = dataPath + "/" + file;
    console.log(file);
    const data = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
    console.log(data);

    // Update the "updated" entry in the json file to current time.
    try {
      let json = JSON.parse(data);
      json.updated = new Date().toString();
      json = JSON.stringify(json, null, 2);
      fs.writeFileSync(filePath, json);
    } catch (e) {
      console.log("could not parse json", e);
    }
  });
});
