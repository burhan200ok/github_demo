import React from "react";
import { Button, Navbar } from "react-bootstrap";

// This is Header Section and it has Title of the project and Refresh Button
function Header({ getCommits }) {
  return (
    <Navbar bg="primary" className="sticky-top">
      <Navbar.Brand>
        <span className="text-light font-weight-bold"> Github Demo | </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-auto">
        <span className="text-light"> Home </span>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Button
          variant="transparent"
          title="Refresh"
          onClick={() => getCommits()}
        >
          <i className="fa fa-repeat text-light"></i>
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
