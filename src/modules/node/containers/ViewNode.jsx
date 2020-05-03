import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { withTranslation } from "react-i18next"

// reactstrap components
import { Row, Col, Container } from "reactstrap"

import { viewNode } from "./../actions"

import NodeListLink from "./../components/NodeListLink"
import NodeDetails from "./../components/NodeDetails"

import nodeIcon from "./../../../assets/img/graph.svg"

class ViewNode extends React.Component {

  componentDidMount() {
    const { params } = this.props.match
    this.props.viewNode(params)
  }

  render() {
    const { item, isLoading, match : { params : { treeparam } }, t } = this.props
    return (
      <>
        <Container className="py-lg-md d-flex pb-5">
          <div className="col px-0">
            <Row>
              <Col lg="12" className="text-center">
                <h1 className="display-3 text-white">
                  <img className="icon-lg" src={nodeIcon} alt="Graph icon" />
                  {" "}{t("Preview Tree Content")}
                </h1>
                <p className="lead text-white">
                  { t("Show a node with information") }
                </p>
                <NodeListLink {...this.props.match.params} />
              </Col>
            </Row>
          </div>
        </Container>
        <NodeDetails item={item} isLoading={isLoading} treeparam={treeparam} />
      </>
    )
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ viewNode }, dispatch)
const mapStateToProps = state => state.node

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ViewNode))
