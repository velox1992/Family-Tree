import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTree,
  faCode,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component {
  showHelpClick(event) {
    console.log("HELP");
  }

  render() {
    return (
      <Navbar expand="md" bg="dark">

        <Navbar.Brand>
          <span className="white-icon">
            <FontAwesomeIcon size="2x" icon={faTree} />{" "}
          </span>
          <span className="title">Familienstammbaum</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark" />


        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Navbar.Text>
            <span className="white-icon">
              <HelpDialog></HelpDialog>
              <Button
                className="header-button"
                onClick={this.props.onShowDataClick}
              >
                <FontAwesomeIcon size="1.5x" icon={faCode} />
              </Button>
            </span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function HelpDialog() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="header-button" variant="primary" onClick={handleShow}>
        <FontAwesomeIcon size="1.5x" icon={faQuestionCircle} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hilfe Familienstammbaum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Der Familienstammbaum zeigt den Stammbaum für ein ausgewähltes
            Familienmitglied an. Durch einen Linksklick auf ein Familienmitglied
            wird der Stammbaum entsprechend angepasst.
          </p>
          <p>
            Sollte ein Familienmitglied noch weitere Eltern-Informationen
            enthalten, die in der aktuellen Darstellung nicht dargestellt
            werden, so wird dieses Familienmitglied visuell hervorgehoben.
          </p>
          <span className="family-node-link-example">Magda Muster</span>
          <p></p>
          <span>
            <FontAwesomeIcon
              className="header-button"
              size="2x"
              icon={faCode}
            />
          </span>
          <p>
            Öffnet den Editor, welcher die für den Familienstammbaum genutzten
            Daten anzeigt.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Schließen
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
