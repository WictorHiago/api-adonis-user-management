import User from '#models/user'

export default class FindUserService {
  private user: typeof User

  constructor() {
    this.user = User
  }

  public async findAll() {
    const users = await this.user.all()

    if (!users) {
      throw new Error('Users not found')
    }

    return users
  }

  public async findById(id: number) {
    const userExist = await this.user.findBy('id', id)

    if (!userExist) {
      throw new Error('User not found')
    }

    return userExist
  }

  public async findByEmail(id: number) {
    const userExist = await this.user.findBy('id', id)

    if (!userExist) {
      throw new Error('User not found')
    }

    return userExist
  }
}
