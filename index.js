const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const expertiseRoute = require("./routes/expertise");
const solutionsRoute = require("./routes/solutions");
const categoryRoute = require("./routes/categories");
const caseStudyRoute = require("./routes/caseStudy");
const TeamsRoute = require("./routes/teams");
const contactsRoute = require("./routes/contacts");
const multer = require("multer");
const path = require("path");
const cors = require('cors');
const auth = require("./middleware/auth");

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));

app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
dotenv.config();
// enabling CORS for all requests
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
console.log('images path',path.join(__dirname, "/images"))
const uri = "mongodb+srv://admin:admin@cluster0.5aflz.mongodb.net/?retryWrites=true&w=majority";
console.log('uri',uri)
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log('res',req.file)
  return res.status(200).json(req.file);
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/expertise", expertiseRoute);
app.use("/api/solutions", solutionsRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/teams", TeamsRoute);
app.use("/api/caseStudies", caseStudyRoute);
app.use("/api/contacts", contactsRoute);

app.listen(process.env.PORT || "5000", () => {
  console.log("Backend is running.");
  // console.log(process.env)
});
