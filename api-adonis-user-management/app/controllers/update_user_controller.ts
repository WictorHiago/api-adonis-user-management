import type { HttpContext } from '@adonisjs/core/http'
import UpdateUserService from '#services/update_user.service'
import { inject } from '@adonisjs/core'

@inject()
export default class UpdateUsersController {
  private updateUserService: UpdateUserService

  constructor() {
    this.updateUserService = new UpdateUserService()
  }

  public async handle({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      const { fullname, email, password } = request.body()

      const user = await this.updateUserService.execute(id, { fullname, email, password })

      return response.status(201).json({ updated: user })
    } catch (error) {
      if (error instanceof Error) {
        return response.badRequest({ error: 'Something went wrong' })
      }
      return response.badRequest({ error: 'Something went wrong' })
    }
  }
}
