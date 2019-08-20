import React from "react";
import "./App.css";

class JsonEditor extends React.Component {
  render() {
    return <textarea value={this.props.value} onChange={this.props.onChange} />;
  }
}

class FamilyGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h2>Graph</h2>;
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
        <FamilyGraph />
        {
          <JsonEditor
            value={this.state.familyRelationStructure}
            onChange={this.JsonValueChanged}
          />
        }
      </div>
    );
  }
}

export default App;
