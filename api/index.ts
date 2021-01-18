import bodyParser from 'body-parser'
import App from 'express'

import Homes from './homes'

const app = App()

app.use(bodyParser.json())
app.use(Homes)

export default app
