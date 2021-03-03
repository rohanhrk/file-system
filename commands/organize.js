
let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
// let types = {
//     Audio:['aif','cda','mid','mp3','mpa','ogg','wav','wma','wpl'],
//     Compressed:[ '7z', 'arj', 'deb', 'pkg', 'rar', 'rpm', 'tar.gz', 'z', 'zip'],
//     Dis:[ 'bin', 'dmg', 'ios', 'toast', 'vcd'],
//     Datebase:[ 'csv', 'dat', 'db', 'log', 'mdb', 'sav', 'sql', 'tar', 'xml'],
//     Email:[ 'email', 'eml', 'emlx', 'msg', 'oft', 'ost', 'pst', 'vcf'],
//     Executable:[ 'apk', 'bat', 'bin', 'cgi', 'com', 'exe', 'gadget', 'jar', 'msi', 'py', 'wsf'],
//     Image:[ 'ai', 'bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'ps', 'psd', 'svg', 'tif', 'tiff'],
//     Programming:[ 'asp', 'aspx', 'pl', 'css', 'htm', 'html', 'js', 'jsp', 'part', 'php', 'py', 'rss', 'xhtml', 'c', 'cgi', 'class', 'cpp', 'cs', 'h', 'java', 'php', 'py', 'sh', 'swift', 'vb'],
//     System:[ 'bak', 'cab', 'cfg', 'cpl', 'cur', 'dll', 'dmp', 'drv', 'icns', 'ico', 'ini', 'lnk', 'msi', 'sys', 'tmp'],
//     Video:[ '3g2', '3gp', 'avi', 'flv', 'h264', 'm4v', 'mkv', 'mov', 'mp4', 'mpg', 'mpeg', 'rm', 'swf', 'vob', 'wmv' ],
//     Documents:[ 'doc', 'docx', 'odt', 'pdf', 'rtf', 'te' ]

// }
function isFileOrNot(src) {
    return fs.lstatSync(src).isFile();
}
function readContent(src) {
    return fs.readdirSync(src);
}

function organizeFiles(src) {
    // src -> folder create
    let folderToMake = path.join(src, "Organized_files");
    if (fs.existsSync(folderToMake) == false) {
        //if destination folder is not present in src folder
        //create destination folder
        fs.mkdirSync(folderToMake);
    }

    // abstraction
    organize(src, folderToMake)
    // not present ->  create a directory
    // organize -> files inside different folders
}

function organize(src, dest) {
    // content read 
    //check given src is file or not
    let isFile = isFileOrNot(src);

    if (isFile == true) {
        //if the given src is file
        // then extension check
        let folderName = checkExtension(src);
        // console.log(folderName,"  ->  ",path.basename(src));
        // copy file
        sendFile(src, dest, folderName);
        // console.log(src);
    } else {
        // console.log(src);
        // folder -> recursive call
        let fDirnames = readContent(src);
        // recursion 
        for (let i = 0; i < fDirnames.length; i++) {
            let child = fDirnames[i];
            let dirNamepath = path.join(src, child);
            organize(dirNamepath, dest);
        }
    }
    //  file->
}

//extension check
function checkExtension(src) {
    //C:\Users\abc\Desktop\PAB\2_File_System_10_02_2021\activity\commands\view.js
    let ext = src.split(".").pop();
    // console.log(ext);
    for (let type in types) {
        for (let i = 0; i < types[type].length; i++) {
            if (ext == types[type][i]) {
                return type;
            }
        }
    }
    return "others";
}

function sendFile(src, dest, folderName) {
    // check if folder 
    // src,path-> file
    let foldertoMake = path.join(dest, folderName);
    if (fs.existsSync(foldertoMake) == false) {
        fs.mkdirSync(foldertoMake);
    }
    // src -> foldertomake
    let pathofdestFile = path.join(foldertoMake, path.basename(src));
    // abc-> f1.txt
    // def -> f1.txt
    fs.copyFileSync(src, pathofdestFile);
}

function organizefn(src) {
    // create organize files folder 
    organizeFiles(src);
}
    
    // nodejs -> export
    
module.exports = {
        fn: organizefn
}
    