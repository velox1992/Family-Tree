const FamilyGraphImporter = require("./FamilyGraphImporter");
const FamilyToDTreeConverter = require("./FamilyToDTreeConverter");

// Remember the last Graph/Family to avoid redundant import
var previousGraph;
var previousFamily;

function convert(graphData, rootId) {
  var hFamily = previousFamily;

  if (graphData !== previousGraph) {
    hFamily = FamilyGraphImporter(graphData);

    previousGraph = graphData;
    previousFamily = hFamily;
  }

  return FamilyToDTreeConverter(hFamily, rootId);
}

module.exports = convert;
