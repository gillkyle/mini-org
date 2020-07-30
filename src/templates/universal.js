import React from "react"

const UniversalTemplate = ({ pageContext }) => {
  return <div>{pageContext.pagePath}</div>
}

export default UniversalTemplate
