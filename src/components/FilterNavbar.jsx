import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
//import { Navbar, Nav, NavItem, FormGroup, Input, Container, NavbarBrand, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap"
import { Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap"


const FilterNavbar = ({ onSearch, value }) => {

  const { t } = useTranslation()

  return (
    <Row>
      <Col lg="4">
        {/*<Navbar
      className="navbar-horizontal navbar-dark bg-white shadow border-radius"
      expand="lg"
    >
      <Container>
        <NavbarBrand onClick={e => e.preventDefault()}>
          <i className="fas fa-filter"></i>
        </NavbarBrand>
        <Nav className="ml-lg-auto" navbar>
          <NavItem>*/}
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-zoom-split-in" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder={ t("Search") } type="text" onChange={onSearch} defaultValue={ value } />
        </InputGroup>
        {/*</NavItem>
        </Nav>
      </Container>
    </Navbar>*/}
      </Col>
    </Row>
  )
}


FilterNavbar.propTypes = {
  onSearch: PropTypes.func,
  value: PropTypes.string
}

export default FilterNavbar
