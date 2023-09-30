const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const port =  process.env.PORT || 5000;  //5000 개발할때, heroku에서의 포트는 알 수 없음.

//key.js에서 개발 ,배포를 판단하여 처리
const config = require("./server/config/key.js")

app.use(express.static(path.join(__dirname, './client/build')))
// 4.xx부터는 내장이라 별도의 설치 없고 body값이 undefined로 나오는것을 방지하기 위함.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/image",express.static("./image"));

app.use("/api/post", require("./server/Router/Post.js"))
app.use("/api/user", require("./server/Router/User.js"))
app.use("/api/calendar", require("./server/Router/Calendar.js"))
app.listen(port, () => {
  mongoose
    .connect(
      config.mongoURI 
    )
    .then(() => {
      console.log(`Example app listening on port ${port}`)
      console.log(`MongDb Connection..`)
    })
    .catch((err) => {
      console.log(` ${err}`)
    })
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html')) //path를 사용하여 __dirname은 현재 경로를 의미함.
})

app.get('*', (req, res) => {
  //*처리를 하면 모든 경로를 받는다.
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})
