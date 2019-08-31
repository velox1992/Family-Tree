import React from "react";
import "./App.css";
import FamilyDTree from "./FamilyDTree.js";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

import Header from "./Header.js";
const GraphToD3TreeConverter = require("./GraphTodD3TreeConverter/GraphToD3TreeConverter");

var FamilyGraphData = require("./FamilyData.json");
const initialFamilyTreeRootId = 156;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyRelations: GraphToD3TreeConverter(
        FamilyGraphData,
        initialFamilyTreeRootId
      ),
      showEditor: false,
      showFullscreen: true
    };

    this.handleJsonValueChange = this.handleJsonValueChange.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleHeaderShowDataClick = this.handleHeaderShowDataClick.bind(this);
  }

  handleJsonValueChange(event) {
    this.setState({ familyRelations: event.jsObject });
  }

  handleNodeClick(name, extras) {
    console.log(name + " " + extras.id);
    this.setState({
      familyRelations: GraphToD3TreeConverter(FamilyGraphData, extras.id)
    });
  }

  handleHeaderShowDataClick(event) {
    this.setState({ showEditor: !this.state.showEditor });
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

    var hGraph = (
      <div className="center-text fullscreen">
        <FamilyDTree
          data={this.state.familyRelations}
          onNodeClick={this.handleNodeClick}
          height={window.innerHeight}
          width="600"
        />
      </div>
    );

    return (
      <div>
        <Header onShowDataClick={this.handleHeaderShowDataClick}></Header>
        {hJsonEditor}
        {hGraph}
      </div>
    );
  }
}

export default App;
