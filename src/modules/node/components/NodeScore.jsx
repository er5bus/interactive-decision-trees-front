import React from 'react'
import { Card, CardHeader, Table } from "reactstrap"
import { useTranslation } from 'react-i18next'


const NodeScore = ({ scores, result }) => {

  const { t } = useTranslation()

  return (
    <Card className="shadow mb-3">
      <CardHeader className="border-0">
        <h3 className="mb-0">{ t('Tree Score List') }</h3>
      </CardHeader>
      <Table className="table-hover table-flush" responsive>
        <thead>
          <tr>
            <th scope="col"> { t('Score') } </th>
            <th scope="col"> { t('Score Description') } </th>
            <th scope="col"> { t('Value') } </th>
          </tr>
        </thead>
        <tbody>
          {
            scores && scores.length ? scores.map((score, i) =>
              <tr key={i}>
                <td>{ score.label }</td>
                <td>{ score.description }</td>
                <td>{ result[score.value] || 0 }</td>
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
  )
}


export default NodeScore
