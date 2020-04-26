import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { withTranslation } from "react-i18next"

import userRoutes from "./../../../routes/user"

// reactstrap components
import { Card, Row, CardBody, Spinner, Col, Container, CardHeader, Button, Table } from "reactstrap"

import { viewNode, fetchAllScores } from "./../actions"

import NodeListLink from "./../components/NodeListLink"
import LoaderSpinner from "./../../../components/Spinner"

import nodeIcon from "./../../../assets/img/graph.svg"
import emptyIcon from "./../../../assets/img/empty.png"


class ViewContentNode extends React.Component {

  constructor (props){
    super(props)

    this.state = {
      scores: {}
    }
  }

  componentWillMount() {
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
          this.props.history.push( userRoutes.path + userRoutes.routes.nodeView.path.replace(":treeparam", treeparam).replace(":nodeparam", rule.point_to.uid))
          noRuleMatch = false
          return;
        }
      })
    }
    if (noRuleMatch){
      this.props.history.push(userRoutes.path + userRoutes.routes.nodeView.path.replace(":treeparam", treeparam).replace(":nodeparam", item.default_node.uid))
    }
  }

  checkOperatorLogicNode = (ruleValue, scoreValue, operator) => {
    switch (operator){
      case "=": {
        console.log(ruleValue === scoreValue)
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
      if (item && item.type === "ContentNode" && item.actions){
        item.actions.forEach((action) => {
          if (action.point_to.uid === params.nodeparam){
            let scores = this.state.scores
            action.values.forEach((actionValue) => {
              scores[actionValue.score.id] = parseInt(actionValue.value, 10) + parseInt(scores[actionValue.score.id] || 0, 10)
            })
            this.setState({ scores })
          }
        })
      }
      this.props.viewNode(params)
    }
    if (newItem && newItem.type === "LogicNode"){
      this.checkLogicNode(newItem)
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
                  {" "}{t("Preview Tree Content")}
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
          <Col lg="12" md="12">
            <Card className="shadow mb-3">
              <CardHeader className="border-0">
                <div className="float-right">
                  { isLoading && <Spinner /> }
                </div>
                <h3 className="mb-0">{ t('Tree Score List') }</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead>
                  <tr>
                    <th> { t('Score') } </th>
                    <th> { t('Score Description') } </th>
                    <th> { t('Value') } </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    scores && scores.length ? scores.map((score, i) =>
                      <tr key={i}>
                        <td>{ score.label }</td>
                        <td>{ score.description }</td>
                        <td>{ this.state.scores[score.value] || 0 }</td>
                      </tr>
                    )
                    : <tr>
                      <td colSpan="3">
                        {  t("No Score found") }
                      </td>
                    </tr>
                  }
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col lg="12" md="12">
            <Card className="shadow">
              <CardHeader className="border-2">
                <div className="float-right">
                  { isLoading && <Spinner /> }
                </div>
                <h3 className="mb-0">{ t('Node Content') }</h3>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                { isLoading ? <LoaderSpinner />
                : (item && item.type === "ContentNode")
                  ? <>
                    <h1 className="pb-2">{ item.node_name }</h1>
                    <p className="pb-2" dangerouslySetInnerHTML={{ __html: item.content_area }} />
                    <div>
                      <h3 className="pb-4 text-primary">{ item.question && item.question } ?</h3>
                      { item.actions.map((action, i) =>
                        (item.display_style === "BUTTON" ? <div><Button
                          key={ action.point_to.uid + i}
                          className="btn mt-4 mr-2"
                          color="primary"
                          disabled={ !Boolean(action.point_to.uid) }
                          to={ userRoutes.path + userRoutes.routes.nodeView.path.replace(":treeparam", treeparam).replace(":nodeparam", action.point_to.uid) }
                          tag={Link}
                        >
                          { action.name }
                        </Button>
                        </div>
                        : <Link
                          key={ action.point_to.uid + i}
                          className="panel-link mb-2"
                          disabled={ !Boolean(action.point_to.uid) }
                          to={ userRoutes.path + userRoutes.routes.nodeView.path.replace(":treeparam", treeparam).replace(":nodeparam", action.point_to.uid) }
                        >
                          { action.name }
                        </Link>
                        )) }
                    </div>
                  </>
                  : <div className="text-center">
                    <img src={ emptyIcon } alt="..." />
                    <h6 className="pt-4 text-primary text-uppercase">
                      { t("Oops! no node found") }
                    </h6>
                  </div>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ viewNode, fetchAllScores }, dispatch)
const mapStateToProps = state => state.node

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ViewContentNode))
