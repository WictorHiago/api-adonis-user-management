import User from '#models/user'

export default class DeleteUserService {
  private user: typeof User

  constructor() {
    this.user = User
  }

  public async execute(id: number) {
    const user = await this.user.findBy('id', id)

    if (!user) {
      throw new Error('User not found')
    }

    return await user.delete()
  }
}
