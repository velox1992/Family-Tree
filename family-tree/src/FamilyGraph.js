import React from "react";
import dTree from "d3-dtree";
import "./FamilyGraph.css";
import "jsoneditor-react/es/editor.min.css";

class FamilyGraph extends React.Component {
  componentDidMount() {
    if (this.props.data !== undefined) {
      this.renderGraph(this.props.data);
    }
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    console.log(this.props.data);
    if (this.props.data !== undefined) {
      this.renderGraph(this.props.data);
    }
  }

  render() {
    return <div id="graph"/>;
  }

  renderGraph(data) {
    const options = {
      target: "#graph",
      debug: false,
      width: 800,
      height: 400,
      callbacks: {
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      nodeWidth: 100,
      styles: {
        node: "node",
        linage: "linage",
        marriage: "marriage",
        text: "nodeText"
      }
    };


      // Container vor erneutem Graph erstellen leeren.
      document.getElementById("graph").innerHTML = "";
      dTree.init(data, options);

  }
}

export default FamilyGraph;
