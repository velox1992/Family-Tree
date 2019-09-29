# Familienstammbaum

Darstellung eines Familienstammbaums mit der Möglichkeit zwischen verschiedenen Stammbäumen zu wechseln.![stammbaum-preview](./doc/stammbaum-preview.jpg)

Um Familienstammbäume überschneidungsfrei darzustellen kann nur eine Familienseite verfolgt werden. Das Verfolgen mehrerer Familienseiten in einer Darstellung ohne Überschneidungen ist nicht möglich. 

Auch in dem hier entwickelten Stammbaum ist es nur möglich eine Familienseite darzustellen. Wenn jedoch ausreichend Informationen hinterlegt sind kann zwischen verschiedenen Familienseiten gewechselt werden und ein angepasster Familienstammbaum wird dargestellt. 

## Verwendung

Die für die Darstellung notwendigen Daten sind in der Datei `src/FamilyData.json` gepflegt und persistiert. Es ist zwar möglich zur Laufzeit die Datenbasis anzupassen, jedoch findet keine Persistierung dieser Änderungen statt.

## Technische Details

### Verwendete Komponenten

tbc

### Anpassung der Datenhaltung

Ursprünglich nur hierarchische Datenhaltung möglich

Erstellung eines Konverters der mit einer Graph Datenstruktur arbeiten kann und daraus eine gewünschte Baumstruktur erstellt

