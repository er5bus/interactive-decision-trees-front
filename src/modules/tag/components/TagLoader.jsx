import React from "react"
import { Card, Col } from "reactstrap"

import ContentLoader from "react-content-loader"

const TagLoader = () => (
  <Col lg="4" className="pb-5">
    <Card className="card-lift--hover shadow border-0">
      <ContentLoader
        speed={2}
        width={340}
        height={290}
        viewBox="0 0 340 290"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="36" y="164" rx="3" ry="3" width="226" height="6" />
        <rect x="764" y="206" rx="3" ry="3" width="52" height="6" />
        <circle cx="61" cy="74" r="27" />
        <rect x="38" y="218" rx="5" ry="5" width="54" height="18" />
        <rect x="107" y="217" rx="5" ry="5" width="54" height="18" />
        <rect x="38" y="133" rx="3" ry="3" width="88" height="6" />
      </ContentLoader>
    </Card>
  </Col>
)


export default TagLoader
