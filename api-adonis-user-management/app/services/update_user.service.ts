import User from '#models/user'
import UserDTO from '../userDTO/userDTO.js'

export default class UpdateUserService {
  private user: typeof User

  constructor() {
    this.user = User
  }

  public async execute(id: number, user: UserDTO) {
    const userExist = await this.user.findBy('id', id)

    if (!userExist) {
      throw new Error('User not found')
    }

    const updatedUser = userExist.merge({ ...user }).save()

    return updatedUser
  }
}
