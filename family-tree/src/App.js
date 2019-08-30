import React from "react";
import "./App.css";
import FamilyDTree from "./FamilyDTree.js";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import Navbar from "react-bootstrap/Navbar";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree, faCode } from "@fortawesome/free-solid-svg-icons";
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

  render() {
    var hJsonEditor = undefined;
    if (this.state.showEditor) {
      hJsonEditor = (
        <JSONInput
          className="test"
          placeholder={this.state.familyRelations} // data to display
          theme="dark_vscode_tribute"
          locale={locale}
          colors={{
            string: "#DAA520" // overrides theme colors with whatever color value you want
          }}
          height="300px"
          width="99vw"
          onChange={this.handleJsonValueChange}
        />
      );
    }

    var hApp = this.getFullscreenApp();

    return (
      <>
        <Navbar bg="dark">
          <Navbar.Brand>
            <span className="white-icon">
              <FontAwesomeIcon size="3x" icon={faTree} />{" "}
            </span>
            <span className="title">Familienstammbaum</span>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <span className="white-icon">
                <Button
                  onClick={event =>
                    this.setState({ showEditor: !this.state.showEditor })
                  }
                >
                  <FontAwesomeIcon size="2x" icon={faCode} />
                </Button>
              </span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>

        {hJsonEditor}
        {hApp}
      </>
    );
  }
}

export default App;
