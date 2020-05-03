import React from "react"
import { Card, Col } from "reactstrap"
import ContentLoader from "react-content-loader"

const NodeLoader = () => (
  <Col lg="4" className="pb-5">
    <Card className="card-lift--hover shadow">
      <ContentLoader
        speed={2}
        width={340}
        height={340}
        viewBox="0 0 340 340"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="33" y="164" rx="3" ry="3" width="226" height="6" />
        <rect x="764" y="206" rx="3" ry="3" width="52" height="6" />
        <circle cx="61" cy="74" r="27" />
        <rect x="34" y="272" rx="5" ry="5" width="54" height="18" />
        <rect x="103" y="272" rx="5" ry="5" width="54" height="18" />
        <rect x="38" y="133" rx="3" ry="3" width="88" height="6" />
        <rect x="171" y="271" rx="5" ry="5" width="54" height="18" />
        <rect x="34" y="176" rx="3" ry="3" width="226" height="6" />
        <rect x="34" y="188" rx="3" ry="3" width="226" height="6" />
        <rect x="32" y="224" rx="10" ry="10" width="54" height="18" />
        <rect x="101" y="224" rx="10" ry="10" width="54" height="18" />
      </ContentLoader>
    </Card>
  </Col>
)

export default NodeLoader
