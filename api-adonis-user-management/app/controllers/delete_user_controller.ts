import { HttpContext } from '@adonisjs/core/http'
import DeleteUserService from '#services/delete_user.service'
import { inject } from '@adonisjs/core'

@inject()
export default class DeleteUserController {
  private deleteUserService: DeleteUserService

  constructor() {
    this.deleteUserService = new DeleteUserService()
  }

  public async handle({ params, response }: HttpContext) {
    try {
      const { id } = params
      await this.deleteUserService.execute(id)

      return response.status(201).json({ deleted: 'User deleted' })
    } catch (error) {
      if (error instanceof Error) {
        return response.badRequest({ error: error.message })
      }
      return response.badRequest({ error: error })
    }
  }
}
