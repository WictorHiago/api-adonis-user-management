import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  public async index({ auth }: HttpContext) {
    if (!auth.isAuthenticated) {
      return 'Unauthorized ###'
    }

    const users = await User.all()

    return users
  }
}
