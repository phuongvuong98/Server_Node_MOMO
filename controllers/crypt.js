const path = require('path');
function handlePost(fileEn, keyEn, fileDe, keyDe, pythonRun) {
    option = null;
    pathFile = null;
    pathFileKey = null;

    if (fileEn !== "" && fileEn.indexOf(".enc") < 0) {
        option = 0;
        pathFile = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            fileEn
        );
        pathFileKey = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            keyEn
        );
    }
    else if (fileDe !== "") {
        option = 1;
        pathFile = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            fileDe
        );
        pathFileKey = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            keyDe
        );
    }
    // console.log(pathFile);
    // console.log(pathFileKey);
    // console.log(option);

    var PythonShell = require('python-shell');
    
    var options = {
        mode: 'text',
        //args: [pathFileEn, pathFileKeyEn, '--option=123']
        args: [pathFile, pathFileKey, option]
    };


    PythonShell.run(pythonRun, options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
    });
}

exports.getBlowfish = (req, res, next) => {
    res.render('algo', {
        path: '/cryptBlowfish',
        algo: "Blowfish",
        error: {
            value: 1
        },
        otherAlgo: {
            p0: "RSA",
            p1: "AES"
        }
    });
}

exports.postBlowfish = (req, res, next) => {
    if (req.body.fileEn !== "" && req.body.fileKeyEn !== "") {
        handlePost(req.body.fileEn, req.body.fileKeyEn, req.body.fileDe, req.body.fileKeyDe, 'python/Blowfish.py');
        res.render('algo', {
            path: '/cryptBlowfish',
            algo: "Blowfish",
            error: {
                value: 1
            },
            otherAlgo: {
                p0: "RSA",
                p1: "AES"
            }
        });
        return;
    }
    else if (req.body.fileDe !== "" && req.body.fileKeyDe !== "") {
        handlePost(req.body.fileEn, req.body.fileKeyEn, req.body.fileDe, req.body.fileKeyDe, 'python/Blowfish.py');
        res.render('algo', {
            path: '/cryptBlowfish',
            algo: "Blowfish",
            error: {
                value: 1
            },
            otherAlgo: {
                p0: "RSA",
                p1: "AES"
            }
        });
        return;
    }

    res.render('algo', {
        path: '/cryptBlowfish',
        algo: "Blowfish",
        error: {
            value: -1
        },
        otherAlgo: {
            p0: "RSA",
            p1: "AES"
        }
    });
}

exports.getRSA = (req, res, next) => {
    res.render('algo', {
        path: '/cryptRSA',
        algo: "RSA",
        error: {
            value: 1
        },
        otherAlgo: {
            p0: "Blowfish",
            p1: "AES"
        }
    });
}
exports.postRSA = (req, res, next) => {
    if (req.body.fileEn !== "" && req.body.fileKeyEn !== "") {
        handlePost(req.body.fileEn, req.body.fileKeyEn, req.body.fileDe, req.body.fileKeyDe, 'python/RSA.py');
        res.render('algo', {
            path: '/cryptRSA',
            algo: "RSA",
            error: {
                value: 1
            },
            otherAlgo: {
                p0: "Blowfish",
                p1: "AES"
            }
        });
        return;
    }
    else if (req.body.fileDe !== "" && req.body.fileKeyDe !== "") {
        handlePost(req.body.fileEn, req.body.fileKeyEn, req.body.fileDe, req.body.fileKeyDe, 'python/RSA.py');
        res.render('algo', {
            path: '/cryptRSA',
            algo: "RSA",
            error: {
                value: 1
            },
            otherAlgo: {
                p0: "Blowfish",
                p1: "AES"
            }
        });
        return;
    }

    res.render('algo', {
        path: '/cryptRSA',
        algo: "RSA",
        error: {
            value: -1
        },
        otherAlgo: {
            p0: "Blowfish",
            p1: "AES"
        }
    });
}



exports.getAES = (req, res, next) => {
    res.render('algo', {
        path: '/cryptAES',
        algo: "AES",
        error: {
            value: 1
        },
        otherAlgo: {
            p0: "RSA",
            p1: "Blowfish"
        }
    });
}

exports.postAES = (req, res, next) => {
    if (req.body.fileEn !== "" && req.body.fileKeyEn !== "") {
        handlePost(req.body.fileEn, req.body.fileKeyEn, req.body.fileDe, req.body.fileKeyDe, 'python/AES.py');
        res.render('algo', {
            path: '/cryptAES',
            algo: "AES",
            error: {
                value: 1
            },
            otherAlgo: {
                p0: "RSA",
                p1: "Blowfish"
            }
        });
        return;
    }
    else if (req.body.fileDe !== "" && req.body.fileKeyDe !== "") {
        handlePost(req.body.fileEn, req.body.fileKeyEn, req.body.fileDe, req.body.fileKeyDe, 'python/AES.py');
        res.render('algo', {
            path: '/cryptAES',
            algo: "AES",
            error: {
                value: 1
            },
            otherAlgo: {
                p0: "RSA",
                p1: "Blowfish"
            }
        });
        return;
    }

    res.render('algo', {
        path: '/cryptAES',
        algo: "AES",
        error: {
            value: -1
        },
        otherAlgo: {
            p0: "RSA",
            p1: "Blowfish"
        }
    });
}
