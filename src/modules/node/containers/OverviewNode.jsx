import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { withTranslation } from "react-i18next"

// reactstrap components
import { Row, Col, Container } from "reactstrap"

import { viewNode, fetchAllScores } from "./../actions"
import { NODE_TYPE } from './../constants'

import userRoutes from "./../../../routes/user"

import NodeListLink from "./../components/NodeListLink"
import NodeDetails from "./../components/NodeDetails"
import NodeScore from "./../components/NodeScore"

import nodeIcon from "./../../../assets/img/graph.svg"

class OverviewNode extends React.Component {

  constructor (props){
    super(props)

    this.state = {
      scores: {}
    }
  }

  componentDidMount() {
    const { params } = this.props.match
    this.props.viewNode(params)
    this.props.fetchAllScores(params)
  }

  checkLogicNode = (item) => {
    const { treeparam } = this.props.match.params
    let noRuleMatch = true
    if (item.rules){
      item.rules.forEach((rule) => {
        if ( this.checkOperatorLogicNode(rule.value, this.state.scores[rule.score.id], rule.operator )){
          this.props.history.push( userRoutes.path + userRoutes.routes.nodeOverview.path.replace(":treeparam", treeparam).replace(":nodeparam", rule.point_to.uid))
          noRuleMatch = false
          return;
        }
      })
    }
    if (noRuleMatch){
      this.props.history.push(userRoutes.path + userRoutes.routes.nodeOverview.path.replace(":treeparam", treeparam).replace(":nodeparam", item.default_node.uid))
    }
  }

  checkOperatorLogicNode = (ruleValue, scoreValue, operator) => {
    switch (operator){
      case "=": {
        return ruleValue === scoreValue
      }
      case "!=": {
        return ruleValue !== scoreValue
      }
      case ">": {
        return ruleValue > scoreValue
      }
      case "<": {
        return ruleValue < scoreValue
      }
      case ">=": {
        return ruleValue >= scoreValue
      }
      case "=<": {
        return ruleValue <= scoreValue
      }
      default: {
        return false
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    const { match : { params }, item : newItem } = this.props
    const { match : { params: prevParams }, item } = prevProps

    if (params.nodeparam && prevParams.nodeparam && params.nodeparam !== prevParams.nodeparam){
      this.props.viewNode(params)
    }
    if (newItem && newItem.type === NODE_TYPE.LOGIC_NODE){
      this.checkLogicNode(newItem)
    }
  }

  calculateScore = (item, selectedAction) => {
    if (item && item.type === NODE_TYPE.CONTENT_NODE && item.actions){
        item.actions.forEach((action) => {
          if (action.id === selectedAction.id){
            let scores = this.state.scores
            action.values.forEach((actionValue) => {
              scores[actionValue.score.id] = parseInt(actionValue.value, 10) + parseInt(scores[actionValue.score.id] || 0, 10)
            })
            this.setState({ scores })
          }
        })
      }
  }

  render() {
    const { scores, item, isLoading, match : { params : { treeparam } }, t } = this.props
    return (
      <>
        <Container className="py-lg-md d-flex pb-5">
          <div className="col px-0">
            <Row>
              <Col lg="12" className="text-center">
                <h1 className="display-3 text-white">
                  <img className="icon-lg" src={nodeIcon} alt="Graph icon" />
                  {" "}{t("Overview Tree Content")}
                </h1>
                <p className="lead text-white">
                  { t("Show a node with information, Tree Scores and values for debug and test") }
                </p>
                <NodeListLink {...this.props.match.params} />
              </Col>
            </Row>
          </div>
        </Container>
        <Row className="justify-content-center">
          <Col lg="12">
            <NodeScore scores={ scores } result={ this.state.scores } />
          </Col>
          <Col lg="12">
            <NodeDetails item={item} calculateScore={ this.calculateScore } isLoading={isLoading} treeparam={treeparam} nodeViewPath={ userRoutes.routes.nodeOverview.path } mainPath={ userRoutes.path }  />
          </Col>
        </Row>
      </>
    )
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ viewNode, fetchAllScores }, dispatch)
const mapStateToProps = state => state.node

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(OverviewNode))
