const fs = require("fs")
const fetch = require("node-fetch")

// const paths = fs.readFileSync("./src/data/paths.txt", "utf8")
// console.log(paths.split("\n"))

const checkStatus = res => {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    console.log("status code was okay")
    return res
  } else {
    console.error("problem")
  }
}

const useFetch = async () => {
  const response = await fetch(`https://gatsbyjs.com/docs`)
  console.log(response)
  checkStatus(response)
}

useFetch()
