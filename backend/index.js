const express = require('express')
const cors = require('cors');
const app = express()
const port = 8000

app.use(express.json());
app.use(cors());

const UserRouter = require("./user/user.routes");
const CandidateRouter = require("./candidate/candidate.routes");

UserRouter.routesConfig(app);
CandidateRouter.routesConfig(app);

app.listen(port, () => {
  console.log(`OVS API listening on port ${port}`)
})