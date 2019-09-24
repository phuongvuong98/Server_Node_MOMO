const path = require("path");
const { spawn } = require("child_process");
function handlePost(pythonRun) {
  var PythonShell = require("python-shell");
  var options = {
    mode: "text",
    //args: [pathFileEn, pathFileKeyEn, '--option=123']
    args: ["5246190437244883829"]
  };
  PythonShell.run(pythonRun, options, function(err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log("results: %j", results);
  });
}

function runScript(pythonFile, userId) {
  return spawn("python", ["-u", path.join(__dirname, pythonFile), userId]);
}
// exports.getRecommand = async (req, res, next) => {
//   const subprocess = runScript("../python/model.py", "8159657106479438377");

//   // print output of script
//   subprocess.stdout.on("data", async data => {
//     console.log("data", data.toString());
//     return res.send(data.toString());
//   });
//   subprocess.stderr.on("data", data => {
//     console.log("error:", data.toString());
//   });
//   subprocess.stderr.on("close", data => {
//     console.log("Closed");
//     return data.toString();
//   });
// };
exports.getRecommand = async (req, res, next) => {
  //     var list = null;
  //   const subprocess = runScript("../python/model.py", "8159657106479438377");
  //   subprocess.stdout.on("data", data => {
  //     console.log( data.toString());
  //     list = data.toString();

  //   });
  //   subprocess.stderr.on("data", data => {
  //     console.log("error:", data.toString());
  //   });
  //   subprocess.on("close", data => {
  //     console.log("Closed");
  //     res.setHeader('Content-Type', 'text/plain');
  //     return res.status(200).send(list);
  //   });
  //   handlePost("./python/model.py");
  var PythonShell = require("python-shell");
  var options = {
    mode: "text",
    //args: [pathFileEn, pathFileKeyEn, '--option=123']
    args: ["5246190437244883829"]
  };
  PythonShell.run("./python/model.py", options, function(err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    // console.log("results: %j", results);
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(results);
  });
};

exports.postRecommand = async (req, res, next) => {
  //   const subprocess = runScript("../python/model.py", "8159657106479438377");
  //   console.log(req.body);
  //   // print output of script
  //   subprocess.stdout.on("data", async data => {
  //     console.log("data", data.toString());
  //     // return res.send(data.toString());
  //     return res.send(data.toString());
  //   });
  //   subprocess.stderr.on("data", data => {
  //     console.log("error:", data.toString());
  //   });
  //   subprocess.stderr.on("close", data => {
  //     console.log("Closed");
  //   });
  //   return res.send("It's OK");
};
