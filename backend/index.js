const express = require('express')
const cors = require('cors');
const app = express()
const port = 8000

app.use(express.json());
app.use(cors());

const UserRouter = require("./user/user.routes");

UserRouter.routesConfig(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`OVS API listening on port ${port}`)
})