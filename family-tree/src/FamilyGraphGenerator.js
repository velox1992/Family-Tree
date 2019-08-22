class Person {
  constructor(id, name, gender) {
    this.connection = undefined;
    this.parentConnection = undefined;
    this.id = id;
    this.name = name;
    this.gender = gender;
  }

  setConnection(newConnection) {
    this.connection = newConnection;
  }

  setParentConnection(newParentConnection) {
    this.parentConnection = newParentConnection;
  }
}

class Connection {
  constructor(partner1, partner2) {
    this.partner1 = partner1;
    this.partner2 = partner2;
  }

  getPartner(person) {
    if (this.partner1 === person) {
      return this.partner2;
    }
    return this.partner1;
  }
}

class Family {
  constructor() {
    this.persons = [];
    this.connections = [];
  }

  addFamilyMember(member) {
    this.persons.push(member);
  }

  setFamilyMembers(members) {
    this.persons = members;
  }

  addConnection(connection) {
    this.connections.push(connection);
  }

  createGraphData() {
    var hGraph = [];

    var hPeronStructure = this.generatePersonStructure(this.persons[12]);
    hGraph.push(hPeronStructure);

    console.log(JSON.stringify(hGraph));

    return hGraph;
  }

  // Die benötigte Repräsentation einer Person generieren
  generatePersonStructure(person) {
    var hPersonObject = {
      name: person.name,
      class: person.gender
    };

    // Hat die Person eine Verbindung?
    if (person.connection !== undefined) {
      // Partner ermitteln
      var hPartner = person.connection.getPartner(person);
      var hPartnerObject = {
        name: hPartner.name,
        class: hPartner.gender
      };

      // Kinder ermitteln
      var hChildren = [];
      person.connection.children.forEach(child => {
        // Nun wird das jeweilige Kind und dessen Daten und Beziehungen analysiert (rekursiv)
        // Das Ergebnis des resultierenden Teilbaums wird hier in die Datenstruktur hinzugefügt.
        var hChildData = this.generatePersonStructure(child);
        /*
            var hChildObject = {
            name: child.name,
            class: child.gender
          };*/

        hChildren.push(hChildData);
      });

      // In der aktuellen Person noch diese Verbindungsinformmationen hinterlegen
      hPersonObject["marriages"] = [
        {
          spouse: hPartnerObject,
          children: hChildren
        }
      ];
    }

    return hPersonObject;
  }
}

class FamilyBuilder {
  constructor() {
    this.family = undefined;
  }

  importFamilyData() {
    this.family = new Family();
    var hFamilyData = require("./FamilyData.json");

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

  getFamilyData() {
    var hFamily = this.importFamilyData();
    return hFamily.createGraphData();
  }
}


var hFamilyBuilder = new FamilyBuilder();
var hFamilieBraun = hFamilyBuilder.importFamilyData();
console.log(hFamilieBraun.persons);
console.log(hFamilieBraun.connections);

hFamilieBraun.createGraphData();


export default FamilyBuilder;
