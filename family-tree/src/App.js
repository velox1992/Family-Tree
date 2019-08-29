import React from "react";
import "./App.css";
import FamilyDTree from "./FamilyDTree.js";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTree,
  faExpand,
  faCompress,
  faCode
} from "@fortawesome/free-solid-svg-icons";
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

  getFullscreenApp() {
    return (
      <div className="center-text fullscreen">
        <FamilyDTree
          data={this.state.familyRelations}
          onNodeClick={this.handleNodeClick}
          height={window.innerHeight}
          width="600"
        />
      </div>
    );
  }

  getStandardApp() {
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

    return (
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
    );
  }

  render() {
    var hApp = undefined;
    if (this.state.showFullscreen) {
      hApp = this.getFullscreenApp();
    } else {
      hApp = this.getStandardApp();
    }

    return (
      <>
        <Navbar bg="dark">
          <Navbar.Brand>
            <span className="white-icon">

              <FontAwesomeIcon size="3x" icon="spinner" icon={faTree} />{" "}
            </span>
            <span className="title">Familienstammbaum</span>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <span className="white-icon">
                <FontAwesomeIcon size="2x" icon="spinner" icon={faCode} />
                <FontAwesomeIcon size="2x" icon="spinner" icon={faCompress} />
                <FontAwesomeIcon size="2x" icon="spinner" icon={faExpand} />
              </span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>

        {hApp}
      </>
    );
  }
}

export default App;
