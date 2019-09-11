const path = require('path');
function handlePost(pythonRun) {
    var PythonShell = require('python-shell');
    
    var options = {
        mode: 'text'
        //args: [pathFileEn, pathFileKeyEn, '--option=123']
        // args: [pathFile, pathFileKey, option]
    };


    PythonShell.run(pythonRun, options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
    });
}

exports.getRecommand = (req, res, next) => {
    handlePost('python/recommand.py');
    // res.set('Content-Type', 'text/plain');
    return res.send("It's OK");
}

