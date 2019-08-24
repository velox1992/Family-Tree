function convert(family, rootId) {
  // Handelt es sich bei der Id schon um den "höchsten" Root?
  // Solange die Eltern-Beziehungen "hochlaufen" bis es keine Eltern mehr gibt
  var hIsAbsoluteRoot = false;
  var hAbsoluteRootId = rootId;
  var hCurrentPerson = family.persons[rootId];
  while (!hIsAbsoluteRoot) {
    if (hCurrentPerson.parentConnection !== undefined) {
      var hParent = hCurrentPerson.parentConnection.partner1;
      hCurrentPerson = hParent;
    } else {
      hIsAbsoluteRoot = true;
      hAbsoluteRootId = hCurrentPerson.id;
    }
  }

  var hGraph = [];

  var hPeronStructure = generatePersonStructure(
    family.persons[hAbsoluteRootId]
  );
  hGraph.push(hPeronStructure);

  return hGraph;
}

// Die benötigte Repräsentation einer Person generieren
function generatePersonStructure(person) {
  var hPersonObject = {
    name: person.name,
    class: person.gender,
    extra: {
      id: person.id
    }
  };

  // Hat die Person eine Verbindung?
  if (person.connection !== undefined) {
    // Partner ermitteln
    var hPartner = person.connection.getPartner(person);
    // Hat der Partner auch noch parent Informationen? Dann ist dort noch ein alternativer Root möglich und soll visuell markiert werden
    var genderClass = hPartner.gender;
    if (hPartner.parentConnection !== undefined) {
      genderClass += "-alternativeRoot";
    }
    var hPartnerObject = {
      name: hPartner.name,
      class: genderClass,
      extra: {
        id: hPartner.id
      }
    };

    // Kinder ermitteln
    var hChildren = [];
    person.connection.children.forEach(child => {
      // Nun wird das jeweilige Kind und dessen Daten und Beziehungen analysiert (rekursiv)
      // Das Ergebnis des resultierenden Teilbaums wird hier in die Datenstruktur hinzugefügt.
      var hChildData = generatePersonStructure(child);
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

module.exports = convert;