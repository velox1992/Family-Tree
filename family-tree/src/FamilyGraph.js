import React from "react";
import dTree from "d3-dtree";

class FamilyGraph extends React.Component {
    componentDidMount() {
  
  
  
      const data = [
        {
          name: "Georg Braun",
          class: "man",
          marriages: [
            {
              spouse: {
                name: "Katharina Braun",
                class: "woman"
              },
              children: [
                {
                  name: "Achim",
                  class: "man"
                },
                {
                  name: "Otmar",
                  class: "man"
                },
                {
                  name: "Sigrid",
                  class: "woman"
                },
                {
                  name: "Katja",
                  class: "woman"
                },
                {
                  name: "Christa",
                  class: "woman"
                }
              ]
            }
          ]
        }
      ];
      const options = {
        target: "#graph",
        debug: false,
        width: 600,
        height: 600,
        callbacks: {
          /*
            Callbacks should only be overwritten on a need to basis.
            See the section about callbacks below.
          */
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
  
      dTree.init(data, options);
    }
  
    render() {
      return (
        <>
          <h2>Graph</h2>
          <div id="graph" />
        </>
      );
    }
  }

  export default FamilyGraph;