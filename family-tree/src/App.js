import React from "react";
import "./App.css";
import FamilyGraph from "./FamilyGraph.js"


class JsonEditor extends React.Component {
  render() {
    return <textarea value={this.props.value} onChange={this.props.onChange} />;
  }
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //familyRelationStructure: JSON.stringify(familyRelations),
    };

    this.JsonValueChanged = this.JsonValueChanged.bind(this);
  }

  JsonValueChanged(event) {
    this.setState({ familyRelationStructure: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1>Stammbaum</h1>
        <FamilyGraph />
      </div>
    );
  }
}

export default App;
