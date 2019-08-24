const FamilyGraphImporter = require("./FamilyGraphImporter");
const FamilyToD3TreeConverter = require("./FamilyToD3TreeConverter");


function convert(graphData, rootId){
    var hImporter = new FamilyGraphImporter();
    var hFamily = hImporter.import(graphData);

    return FamilyToD3TreeConverter(hFamily, rootId);

}

module.exports = convert;