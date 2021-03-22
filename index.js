const fs = require('fs');
const path = require("path");

var dataPath = "C:\\Users\\david\\Desktop\\Generated_Data_19_03_2021";

function getAllFiles(dir) {
    var files = [];
    fs.readdirSync(dir).forEach(file => {
        const absolute = path.join(dir, file);
        if (fs.statSync(absolute).isDirectory()) {
            files = files.concat(getAllFiles(absolute));
            }
        else{
            files.push(absolute);
        }
    });
    return files;
}

function getMaxMin(){
    // get list of the full path of all files in all subfolders
    var allFiles = getAllFiles(dataPath);
    var results = {
        g17: {
            standard: {
                minX: null,
                maxX: null,
                minY: null,
                maxY: null,
                minZ: null,
                maxZ: null,
                minTotal: null,
                maxTotal: null,
            },
            last: {
                minX: null,
                maxX: null,
                minY: null,
                maxY: null,
                minZ: null,
                maxZ: null,
                minTotal: null,
                maxTotal: null,
            },
        },
        g19: {
            standard: {
                minX: null,
                maxX: null,
                minY: null,
                maxY: null,
                minZ: null,
                maxZ: null,
                minTotal: null,
                maxTotal: null,
            },
            last: {
                minX: null,
                maxX: null,
                minY: null,
                maxY: null,
                minZ: null,
                maxZ: null,
                minTotal: null,
                maxTotal: null,
            }
        },
        g45: {
            standard: {
                minX: null,
                maxX: null,
                minY: null,
                maxY: null,
                minZ: null,
                maxZ: null,
                minTotal: null,
                maxTotal: null,
            },
            last: {
                minX: null,
                maxX: null,
                minY: null,
                maxY: null,
                minZ: null,
                maxZ: null,
                minTotal: null,
                maxTotal: null,
            }
        }
    }
    allFiles.forEach(filename => {
        if (filename.split('.').pop() == "txt"){
            var fileContents = fs.readFileSync(filename, "ascii");
            var lineArray = fileContents.split("\n");
            for (let i = 1; i < lineArray.length; i++){
                var div = lineArray[i].split("-")
                if (div.length == 2) {
                    var numberArray = div[1].split(",");
                    numberArray = numberArray.map(elem => parseInt(elem));
                    var gun;
                    var shotType;
                    if (filename.includes("G17")){
                        gun = "g17";
                    } else if (filename.includes("G19")){
                        gun = "g19";
                    } else if (filename.includes("G45")){
                        gun = "g45";
                    }
                    if (filename.includes("LAST_SHOTS")){
                        shotType = "last";
                    } else if (filename.includes("STANDARD_SHOTS")){
                        shotType = "standard";
                    } else {
                        console.log("Skipping file: ", filename);
                        return 0;
                    }
                    // parse the data
                    // x values
                    if (results[gun][shotType].minX == null || numberArray[0] < results[gun][shotType].minX){
                        results[gun][shotType].minX = numberArray[0];
                    }
                    if (results[gun][shotType].maxX == null || numberArray[0] > results[gun][shotType].maxX){
                        results[gun][shotType].maxX = numberArray[0];
                    }
                    // y values
                    if (results[gun][shotType].minY == null || numberArray[1] < results[gun][shotType].minY){
                        results[gun][shotType].minY = numberArray[1];
                    }
                    if (results[gun][shotType].maxY == null || numberArray[1] > results[gun][shotType].maxY){
                        results[gun][shotType].maxY = numberArray[1];
                    }
                    // z values
                    if (results[gun][shotType].minZ == null || numberArray[2] < results[gun][shotType].minZ){
                        results[gun][shotType].minZ = numberArray[2];
                    }
                    if (results[gun][shotType].maxZ == null || numberArray[2] > results[gun][shotType].maxZ){
                        results[gun][shotType].maxZ = numberArray[2];
                    }
                    // max values
                    if (results[gun][shotType].minTotal == null || numberArray[3] < results[gun][shotType].minTotal){
                        results[gun][shotType].minTotal = numberArray[3];
                    }
                    if (results[gun][shotType].maxTotal == null || numberArray[3] > results[gun][shotType].maxTotal){
                        results[gun][shotType].maxTotal = numberArray[3];
                    }
                }
            }
        }
    })
    var guns = Object.keys(results);
    for (let i = 0; i < guns.length; i++){
        var shottypes = Object.keys(results[guns[i]]);
        for (let j = 0; j < shottypes.length; j++){
            console.log("gun: ", guns[i], ", shottype: ", shottypes[j], ", results: ", results[guns[i]][shottypes[j]]);
        }
    }
}

getMaxMin();