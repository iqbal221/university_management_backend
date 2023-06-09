import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

const createUserService = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateUserId()

  user.id = id

  // dafault passwor
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const CreatedUser = await User.create(user)

  if (!CreatedUser) {
    throw new Error('Failed to create user')
  }
  return CreatedUser
}

export default {
  createUserService,
}
