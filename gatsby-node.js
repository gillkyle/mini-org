const fs = require("fs")

const { loadYaml } = require(`./src/utils/load-yaml`)
const redirects = loadYaml(`./redirects.yaml`)
const cloudRedirects = loadYaml(`./cloud-redirects.yaml`)
const startersRedirects = require(`./starter-redirects.json`)

exports.createPages = async ({ actions: { createPage, createRedirect } }) => {
  // take all entries from the .org source map and make pages from them
  const pathsText = fs.readFileSync("./src/data/paths.txt", "utf8")
  const paths = pathsText.split("\n")

  await paths.forEach(async path => {
    await createPage({
      path,
      component: require.resolve("./src/templates/universal.js"),
      context: {
        pagePath: path,
      },
    })
  })

  /**
   * ============================================================================
   * REDIIRECTS
   * NOTE: Order matters!! Higher specificity comes first
   * ============================================================================
   */

  // historic one-off redirects from .org
  //  these redirects need to continue to live in gatsbyjs.org and
  //  need to be adjusted to forward all traffic to .com instead of
  //  using relative links for the toPath
  redirects.forEach(redirect => {
    createRedirect({ isPermanent: true, ...redirect, force: true })
  })

  Object.entries(startersRedirects).forEach(([fromSlug, toSlug]) => {
    createRedirect({
      fromPath: `/starters${fromSlug}`,
      toPath: `https://gatsbyjs.com/starters${toSlug}`,
      isPermanent: true,
      force: true,
    })
  })

  // one-off redirects for .com
  //  pages that don't line up 1 to 1 with data stored in WP
  cloudRedirects.forEach(redirect => {
    createRedirect({ isPermanent: true, ...redirect, force: true })
  })

  // splat redirects
  await createRedirect({
    fromPath: `/packages/*`,
    toPath: `https://gatsbyjs.com/plugins/:splat`,
    isPermanent: true,
    force: true,
  })
  await createRedirect({
    fromPath: `/creators/*`,
    toPath: `https://gatsbyjs.com/partner/`,
    isPermanent: true,
    force: true,
  })

  // catch all redirect
  //  this needs to be the last redirect created or it'll match everything
  await createRedirect({
    fromPath: `/*`,
    toPath: `https://gatsbyjs.com/:splat`,
    isPermanent: true,
    force: true,
  })
}
