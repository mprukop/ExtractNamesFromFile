//npm  i --save line-reader

const lineReader = require("line-reader");
const fs = require("fs");

const outputFile = "fileNames_all.txt";
let mimeSource = [];
const regex = /<MIME_SOURCE>(.*?)<\/MIME_SOURCE>/;
const mimeRegex = /^[a-zA-Z0-9]*.jpg$/;

lineReader.eachLine("index file.xml", function (line, last) {
  // console.log(`Line from file: ${line}`);

  if (line.includes("<MIME_SOURCE>")) {
    // console.log(line);
    // console.log(line.match(regex)[1]);
    mimeSource.push(line.match(regex)[1]);
  }

  if (last) {
    // Info message
    console.log("Last line printed.");
    // Drop duplicates
    var seen = {};
    var fileContent = [];
    var j = 0;
    for (i = 0; i < mimeSource.length; i++) {
      var item = mimeSource[i];
      if (seen[item] !== 1) {
        seen[item] = 1;
        if (!item.match(mimeRegex)) {
          fileContent[j++] = item;
        }
      }
    }

    // Write data
    fs.writeFileSync(outputFile, fileContent.join("\n"));
    // Metrics
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(
      `The script uses approximately ${Math.round(used * 100) / 100} MB`
    );
  }
});
