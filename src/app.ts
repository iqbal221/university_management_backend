import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import userRouter from './app/modules/users/user.route'

const app: Application = express()

//middleware
app.use(cors())

//parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// api end point
app.use('/api/v1/users/', userRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
