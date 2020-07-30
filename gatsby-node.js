const fs = require("fs")
const fetch = require('node-fetch');

const isStatusAnError = res => {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    return false
  } else {
    return true
  }
}


exports.createPages = async ({ actions: { createPage, createRedirect }, reporter }) => {
  const pathsText = fs.readFileSync("./src/data/paths.txt", "utf8")
  const paths = pathsText.split("\n")

  const problemPaths = []
  paths.forEach(path => {
    createPage({
      path,
      component: require.resolve("./src/templates/universal.js"),
      context: {
        pagePath: path,
      },
    })

    const response = await fetch(`https://gatsbyjs.com${path}`);
    if (isStatusAnError(response)) {
      problemPaths.push(path)
    }

    createRedirect({
      fromPath: path,
      toPath: `https://gatsbyjs.com${path}`,
      isPermanent: true,
      redirectInBrowser: true,
    })
  })

  reporter.warn(`${problemPaths.lengh}/${paths.length} were problematic: 
  ${paths}
  `)
}
