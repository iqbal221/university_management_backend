import cors from 'cors'
import express, { Application } from 'express'
import { UserRoute } from './app/modules/users/user.route'
import globalErrorHandler from './middleware/globalErrorHandler'

const app: Application = express()

//middleware
app.use(cors())

//parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// api end point
app.use('/api/v1/user', UserRoute)


// app.get('/',(req: Request, res: Response, next:NextFunction) => {
//   next("Error voi pichi..")
// })

//global error handling
app.use(globalErrorHandler)

export default app
