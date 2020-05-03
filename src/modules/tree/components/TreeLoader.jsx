import React from "react"
import { Col, Card } from "reactstrap"
import ContentLoader from "react-content-loader"

const TreeLoader = () => (
  <Col lg="4" className="pb-5">
    <Card className="card-lift--hover shadow border-0">
      <ContentLoader
        speed={2}
        width={340}
        height={400}
        viewBox="0 0 340 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="33" y="164" rx="3" ry="3" width="226" height="6" />
        <rect x="764" y="206" rx="3" ry="3" width="52" height="6" />
        <circle cx="61" cy="74" r="27" />
        <rect x="38" y="330" rx="5" ry="5" width="54" height="18" />
        <rect x="103" y="329" rx="5" ry="5" width="54" height="18" />
        <rect x="38" y="133" rx="3" ry="3" width="88" height="6" />
        <rect x="171" y="328" rx="5" ry="5" width="54" height="18" />
        <rect x="36" y="241" rx="3" ry="3" width="61" height="10" />
        <rect x="37" y="282" rx="3" ry="3" width="61" height="10" />
        <rect x="126" y="236" rx="5" ry="5" width="54" height="18" />
        <rect x="190" y="236" rx="5" ry="5" width="54" height="18" />
        <rect x="128" y="277" rx="5" ry="5" width="54" height="18" />
        <rect x="191" y="275" rx="5" ry="5" width="54" height="18" />
        <rect x="34" y="176" rx="3" ry="3" width="226" height="6" />
        <rect x="34" y="188" rx="3" ry="3" width="226" height="6" />
      </ContentLoader>
    </Card>
  </Col>
)

export default TreeLoader
