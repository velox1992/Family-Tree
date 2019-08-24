const FamilyGraphImporter = require("./FamilyGraphImporter");
const FamilyToD3TreeConverter = require("./FamilyToD3TreeConverter");

// Remember the last Graph/Family to avoid redundant import
var previousGraph;
var previousFamily;

function convert(graphData, rootId){

    var hFamily = previousFamily;
    
    if (graphData !== previousGraph){
        console.log("New import!");
        var hImporter = new FamilyGraphImporter();
        hFamily = hImporter.import(graphData);      

        previousGraph = graphData;
        previousFamily = hFamily;
    }

    return FamilyToD3TreeConverter(hFamily, rootId);

}

module.exports = convert;