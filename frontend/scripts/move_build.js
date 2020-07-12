const fs = require('fs');
const path = require('path');

function rmdir(d) {
    const self = arguments.callee;
    if (fs.existsSync(d)) {
        fs.readdirSync(d).forEach(function (file) {
            const C = d + '/' + file;
            if (fs.statSync(C).isDirectory()) self(C);
            else fs.unlinkSync(C);
        });
        fs.rmdirSync(d);
    }
}

try {
    if (fs.existsSync(path.join(__dirname, '../../backend/build'))) {
        rmdir(path.join(__dirname, '../../backend/build'));
    }
    const oldBuildDir = path.join(__dirname + '/../build');
    const newBuildDir = path.join(__dirname, '../../backend/build');
    fs.renameSync(oldBuildDir, newBuildDir);
} catch (e) {
    console.error(e);
}
