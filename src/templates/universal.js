import React from "react"

const UniversalTemplate = ({ pageContext }) => {
  return (
    <div>
      {pageContext.pagePath && pageContext.pagePath}
      {pageContext.percentage &&
        `${pageContext.percentage}% of pages hit ok status codes`}
    </div>
  )
}

export default UniversalTemplate
