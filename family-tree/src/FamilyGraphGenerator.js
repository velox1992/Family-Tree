class Person {
  constructor(id, name, gender) {
    this.connection;
    this.parentConnection;
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
  constructor(partner1Id, partner2Id, childrenIds) {
    this.partner1Id = partner1Id;
    this.partner2Id = partner2Id;
    this.childrenIds = childrenIds;
  }
}

class Family {
    constructor(){
        this.persons = [];
        this.connections = [];
    }

    addFamilyMember(person){
        this.persons.push(person);
    }

    addConnection(connection){
        this.connections.push(connection);
    }
}

class FamilyBuilder{
    constructor(family){
        this.family = family;
    }

    importFamilyData(){
        var hFamilyData = require("./FamilyData.json")

        // Sortiert damit ich über den ArrayIndex zugreifen kann. Hier wäre ein Dictionary wesentlich schöner
        var hFamilyMember = hFamilyData.persons.sort(this.comparePersons)

        hFamilyMember.forEach(member => {
            this.createFamilyMember(member.id, member.name, member.gender);
        });

        var hConnections = hFamilyData.connections;
        hConnections.forEach(connection => {
            this.createConnection(connection.partner1Id, connection.partner2Id, connection.childrenIds)
        });
    }

    comparePersons(a,b){
        if (a.id < b.id){
            return -1;
        }
        if (a.id > b.id){
            return 1;
        }
        return 0;
    }

    createFamilyMember(id, name, gender){
        var hNewFamilyMember = new Person(id, name, gender);
        this.family.addFamilyMember(hNewFamilyMember);
    }

    createConnection(partner1Id, partner2Id, childrenIds){
        var hNewConnection = new Connection(partner1Id, partner2Id, childrenIds);
        this.family.addConnection(hNewConnection);
    }
}

var hFamilieBraun = new Family();
var hFamilyBuilder = new FamilyBuilder(hFamilieBraun);
hFamilyBuilder.importFamilyData();
console.log(hFamilieBraun.persons);
console.log(hFamilieBraun.connections);

