let fs=require("fs");
let path=require("path");

function viewHelper(dirName, mode) {
    if (mode == "tree") {
        viewTree(dirName,"");
    } else if (mode == "flat") {
        viewFlat(dirName);
    } else {
        console.log("wrong mode  type help for commands");
    }
}
module.exports = {
    fn: viewHelper
}

//check given path is file or not
function isFileOrNot(src) {
    return fs.lstatSync(src).isFile();
}

//read content 
function readContent(src) {
    return fs.readdirSync(src);
}

// =================================================== view flat ===================================================
function viewFlat(src) {
    // check the given source is file or not 
    let isFile = isFileOrNot(src);
    if (isFile == true) {
        //    if given src is file 
        //    then print src
        console.log(src + "*");
    }
    else {
        // print src
        console.log(src);
        // read content of folder "src"
        // content read from os
        let fDirnames = readContent(src);
        // recursion 
        // console.log(fDirnames);
        for (let i = 0; i < fDirnames.length; i++) {
            let child = fDirnames[i];
            //    good practice??
            // let dirNamepath = src + "\\" + child;
            let dirNamepath = path.join(src, child);
            viewFlat(dirNamepath)
        }
    }
}

// =================================================== view tree ===================================================
function viewTree(src, indent) {
    //check given src is file or not
    let isFile = isFileOrNot(src);
    if (isFile == true) {
        //if file 
        //then print path of last name
        console.log(indent, path.basename(src), "*");
    }
    else {
        // print
        console.log(indent, path.basename(src));
        // content read from os
        let fDirnames = readContent(src);
        // recursion 
        // console.log(fDirnames);
        for (let i = 0; i < fDirnames.length; i++) {
            let child = fDirnames[i];
            //    good practice??
            // let dirNamepath = src + "\\" + child;
            let dirNamepath = path.join(src, child);
            viewTree(dirNamepath, indent + "\t");
        }
    }
}



// folder
        // activity
            // commands
                // * help.js
                // * view.js
                // * organize.js
            // * mycli.js
        // raw
            // poc
            // facts