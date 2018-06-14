import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name;

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>To Do App</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/notes'}>
              <NavItem>
                <Glyphicon glyph='pencil' /> Notes
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/todo'}>
              <NavItem>
                <Glyphicon glyph='ok' /> To-Do
              </NavItem>
            </LinkContainer>
              <LinkContainer to={'/calendar'}>
                  <NavItem>
                      <Glyphicon glyph='calendar' /> Calendar
                  </NavItem>
              </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
