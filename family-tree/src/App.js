import React from "react";
import "./App.css";
import FamilyGraph from "./FamilyGraph.js";

class JsonEditor extends React.Component {
  render() {
    return (
      <textarea
        value={JSON.stringify(this.props.value)}
        onChange={this.props.onChange}
      />
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyRelations: require("./familyRelations.json")
    };

    this.JsonValueChanged = this.JsonValueChanged.bind(this);
  }

  JsonValueChanged(event) {
    var hParsedJson = JSON.parse(event.target.value);
    this.setState({ familyRelations: hParsedJson });
  }

  render() {
    return (
      <div className="App">
        <h1>Stammbaum</h1>
        <JsonEditor
          value={this.state.familyRelations}
          onChange={this.JsonValueChanged}
        />
        <FamilyGraph data={this.state.familyRelations} />
      </div>
    );
  }
}

export default App;
