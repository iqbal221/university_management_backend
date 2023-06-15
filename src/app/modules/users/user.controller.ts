import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'


const createUser = async (req: Request, res: Response,next:NextFunction) => {
  const { user } = req.body
  try {
    const result = await UserService.createUserService(user)
    res.status(200).json({
      success: true,
      data: result,
      message: 'user created successfully',
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUser,
}
