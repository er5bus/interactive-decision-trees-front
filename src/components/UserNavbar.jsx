import React from "react"
import { Link } from "react-router-dom"

import { ROUTES } from "./../constants"

import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap"

import LogoutModal from "./../containers/authentication/Logout"

import { useTranslation } from "react-i18next"

import userIcon from "./../assets/img/user.png"
import treeIcon from "./../assets/img/tree.svg"
import graphIcon from "./../assets/img/graph.svg"


const UserNavbar = ({ userName }) => {

  const { t } = useTranslation()

  const [ showModal, setShowModal ] = React.useState(false)

  const onToggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      { showModal && <LogoutModal onToggle={onToggleModal} /> }
      <header className="navbar-horizontal">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to={ ROUTES.USER.MAIN_PATH } tag={Link}>
              <img
                alt="..."
                src={treeIcon}
              />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar_global">
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to={ ROUTES.USER.MAIN_PATH }>
                      <img
                        alt="..."
                        src={treeIcon}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                <NavItem>
                  <NavLink to={ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_INDEX} tag={Link}>
                    <img src={graphIcon} alt="..." className="icon-sm mr-1" />
                    <span className="nav-link-inner--text mb-0 text-sm font-weight-bold">{ t("My Trees") }</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle className="pr-0" nav>
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img
                          alt="..."
                          src={userIcon}
                          className="icon-sm mr-1"
                        />
                      </span>
                      <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold">
                          {userName}
                        </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem className="noti-title" header tag="div">
                    </DropdownItem>
                    <DropdownItem disabled={true} to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-single-02" />
                      <span>{ t("Profile") }</span>
                    </DropdownItem>
                    <DropdownItem disabled={true} to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-settings-gear-65" />
                      <span>{ t("Settings") }</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={onToggleModal}>
                      <i className="ni ni-user-run" />
                      <span>{ t("Logout") }</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default UserNavbar
