import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navbar, Nav, NavItem, FormGroup, Input, Container, InputGroup, InputGroupAddon, InputGroupText, NavbarBrand } from "reactstrap"


export default ({ onSearch }) => {

  const { t } = useTranslation()

  return (
    <Navbar
      className="navbar-horizontal navbar-dark bg-white shadow border-radius"
      expand="lg"
    >
      <Container>
        <NavbarBrand onClick={e => e.preventDefault()}>
          <i className="fas fa-filter"></i>
        </NavbarBrand>
        <Nav className="ml-lg-auto" navbar>
          <NavItem>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-zoom-split-in" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder={ t("Search") } type="text" onChange={onSearch} />
            </InputGroup>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  )
}
