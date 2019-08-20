import React from "react";
import "./App.css";
import FamilyGraph from "./FamilyGraph.js";
import JSONInput from 'react-json-editor-ajrm';
    import locale    from 'react-json-editor-ajrm/locale/en';

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

    this.handleJsonValueChange = this.handleJsonValueChange.bind(this);
  }

  handleJsonValueChange(event) {
    this.setState({ familyRelations: event.jsObject });
  }


  render() {
    return (
      <div className="App">
        <h1>Stammbaum</h1>
        <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
        <JSONInput
          placeholder={this.state.familyRelations} // data to display
          theme="dark_vscode_tribute"
          locale = {locale}
          colors={{
            string: "#DAA520" // overrides theme colors with whatever color value you want
          }}
          height="550px"
          onChange={this.handleJsonValueChange}
        />
      </div>

        <FamilyGraph data={this.state.familyRelations} />
      </div>
    );
  }
}

export default App;
