import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree, faCode } from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component {
  render() {
    return (
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
                onClick={this.props.onShowDataClick}
              >
                <FontAwesomeIcon size="2x" icon={faCode} />
              </Button>
            </span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
