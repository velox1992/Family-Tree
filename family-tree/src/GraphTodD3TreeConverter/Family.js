class Family {
    constructor() {
      this.persons = [];
      this.connections = [];
      this.marriageNodeIds = [];
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
  
    
  }

module.exports = Family;
