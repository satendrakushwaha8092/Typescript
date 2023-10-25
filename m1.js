const express = require("express")
const multer = require("multer")

const { copySales } = require("../service/s2")
const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public")
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname)
  },
})

const uploadStorage = multer({ storage: storage })

// Single file
app.post("/upload", uploadStorage.single("file"), (req, res) => {
  console.log(req.file)
  return res.send("Single file")
})
//Multiple files
app.post("/upload/multiple", uploadStorage.array("file", 10), async (req, res) => {
  console.log(req.files)
  const filepath = await copySales(req.files[0].path, req.files[1].path, req.files[2].path,req.body.date)
  return res.download(filepath)
})

app.listen(3000 || process.env.PORT, () => {
  console.log("Server on...")
})