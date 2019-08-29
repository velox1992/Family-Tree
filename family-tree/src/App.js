import React from "react";
import "./App.css";
import FamilyDTree from "./FamilyDTree.js";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
const GraphToD3TreeConverter = require("./GraphTodD3TreeConverter/GraphToD3TreeConverter");
var FamilyGraph = require("./FamilyData.json");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyRelations: GraphToD3TreeConverter(FamilyGraph, 156),
      showEditor: false,
      showFullscreen: true
    };

    this.handleJsonValueChange = this.handleJsonValueChange.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  handleJsonValueChange(event) {
    this.setState({ familyRelations: event.jsObject });
  }

  handleNodeClick(name, extras) {
    console.log(name + " " + extras.id);
    this.setState({
      familyRelations: GraphToD3TreeConverter(FamilyGraph, extras.id)
    });
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

    var hApp = undefined;

    if (this.state.showFullscreen){
      hApp = (
        <div className="center-text">
                <FamilyDTree
                  data={this.state.familyRelations}
                  onNodeClick={this.handleNodeClick}
                  height={window.innerHeight}
                  width="600"
                />
              </div>
      );
    } else {
      
    }

    return (
      <>
        <Container>
          <h1 className="header center-text">
            Familienstammbaum
          </h1>
        </Container>

        <Container>
          <Row>
            <Col>
              <div className="center-text">
                <FamilyDTree
                  data={this.state.familyRelations}
                  onNodeClick={this.handleNodeClick}
                  height={window.innerHeight}
                  width="600"
                />
              </div>
            </Col>
          </Row>
          <Row></Row>
          {this.state.showEditor ? (
            <Row>
              <Col>
                <button
                  onClick={event =>
                    this.setState({ showEditor: !this.state.showEditor })
                  }
                >
                  Verstecke Daten
                </button>
                {hJsonEditor}
              </Col>
            </Row>
          ) : (
            <button
              onClick={event =>
                this.setState({ showEditor: !this.state.showEditor })
              }
            >
              Zeige Daten
            </button>
          )}
        </Container>
      </>
    );
  }
}

export default App;
