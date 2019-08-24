const Family = require("./Family");
const Person = require("./Person");
const Connection = require("./Connection");

class FamilyGraphImporter {
  constructor() {
    this.family = undefined;
  }

  import(graphData) {
    this.family = new Family();
    var hFamilyData = graphData;

    var hFamilyMembers = this.getFamilyMembers(hFamilyData.persons);
    this.family.setFamilyMembers(hFamilyMembers);

    this.createConnections(hFamilyData.connections);

    return this.family;
  }

  getFamilyMembers(familyMember) {
    // Sortiert damit ich über den ArrayIndex zugreifen kann. Hier wäre ein Dictionary wesentlich schöner
    var hFamilyMember = familyMember.sort(this.comparePersonsByIdAsc);

    var hFamilyMembers = [];
    hFamilyMember.forEach(member => {
      hFamilyMembers.push(new Person(member.id, member.name, member.gender));
    });

    return hFamilyMembers;
  }

  comparePersonsByIdAsc(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  createConnections(connections) {
    // Die Familienmitglieder wurden eingelesen
    // Jetzt müssen die Verbindungen erstellt werden und mit Infos gefüllt werden
    // In diesem Zuge bekommen auf die jeweiligen Mitglieder einen Verweis auf die Verbindung gesetzt
    connections.forEach(connection => {
      var hPartner1 = this.family.persons[connection.partner1Id];
      var hPartner2 = this.family.persons[connection.partner2Id];

      var hNewConnection = new Connection(hPartner1, hPartner2);
      hPartner1.connection = hNewConnection;
      hPartner2.connection = hNewConnection;

      var hChildrenOfConnection = [];

      connection.childrenIds.forEach(childrenId => {
        var hChild = this.family.persons[childrenId];
        hChildrenOfConnection.push(hChild);

        // Kind bekommt direkt einen Verweis auf die elterliche Verbindung
        hChild.setParentConnection(hNewConnection);
      });

      hNewConnection.children = hChildrenOfConnection;

      this.family.addConnection(hNewConnection);
    });
  }
  generate(rootId) {
    var hFamily = this.import();
    return hFamily.createGraph(rootId);
  }
}

module.exports = FamilyGraphImporter;