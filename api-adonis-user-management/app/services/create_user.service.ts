import User from '#models/user'
import UserDTO from '../userDTO/userDTO.js'

export default class CreateUserService {
  private user: typeof User

  constructor() {
    this.user = User
  }

  public async execute(user: UserDTO) {
    const userExist = await this.user.findBy('email', user.email)

    if (userExist) {
      return new Error('User already exists')
    }

    return await this.user.create(user)
  }
}
