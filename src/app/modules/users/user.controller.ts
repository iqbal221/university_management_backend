import { Response, Request } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response) => {
  const { user } = req.body
  try {
    const result = await userService.createUserService(user)
    res.status(200).json({
      success: true,
      data: result,
      message: 'user created successfully',
    })
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to create user' })
  }
}

export default {
  createUser,
}
