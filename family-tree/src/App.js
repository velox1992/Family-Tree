import React from "react";
import "./App.css";
import FamilyGraph from "./FamilyGraph.js";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyRelations: require("./familyRelations.json")
    };

    this.handleJsonValueChange = this.handleJsonValueChange.bind(this);
  }

  handleJsonValueChange(event) {
    console.log("handleJsonValueChange");
    this.setState({ familyRelations: event.jsObject });
  }

  render() {
    return (
      <>
      <Container>  <Jumbotron ><h1>Familienstammbaum</h1></Jumbotron></Container>
      
        <Container fluid="true">
          <Row> 
            <Col>
              <FamilyGraph data={this.state.familyRelations} />
            </Col>
            <Col>
            <div><h2>Hey</h2></div>
              <JSONInput
                placeholder={this.state.familyRelations} // data to display
                theme="dark_vscode_tribute"
                locale={locale}
                colors={{
                  string: "#DAA520" // overrides theme colors with whatever color value you want
                }}
                height="550px"
                onChange={this.handleJsonValueChange}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
