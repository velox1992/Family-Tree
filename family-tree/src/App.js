import React from "react";
import "./App.css";
import FamilyGraph from "./FamilyGraph.js";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import FamilyGraphGenerator from "./FamilyGraphGenerator";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyRelations: (new FamilyGraphGenerator()).getFamilyData()
    };

    this.handleJsonValueChange = this.handleJsonValueChange.bind(this);
  }

  handleJsonValueChange(event) {
    console.log("handleJsonValueChange");
    this.setState({ familyRelations: event.jsObject });
  }

  render() {
    var hJsonEditor = (
      <JSONInput
        className="test"
        placeholder={this.state.familyRelations} // data to display
        theme="dark_vscode_tribute"
        locale={locale}
        colors={{
          string: "#DAA520" // overrides theme colors with whatever color value you want
        }}
        height="550px"
        onChange={this.handleJsonValueChange}
      />
    );

    console.log(hJsonEditor);

    return (
      <>
        <Container>
          {" "}
          <Jumbotron>
            <h1>Familienstammbaum</h1>
          </Jumbotron>
        </Container>

        <Container>
          <Row>
            <Col>
              <div className="center-text">
                <FamilyGraph data={this.state.familyRelations} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>{hJsonEditor}</Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
