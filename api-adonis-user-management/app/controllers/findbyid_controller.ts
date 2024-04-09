import type { HttpContext } from '@adonisjs/core/http'
import FindUserService from '#services/find_user.service'
import { inject } from '@adonisjs/core'

@inject()
export default class FindByIdController {
  constructor(private findUserService: FindUserService) {}

  public async handle({ params, response }: HttpContext) {
    try {
      const { id } = params

      const user = await this.findUserService.findById(id)
      return response.status(200).json({ result: user })
    } catch (error) {
      if (error instanceof Error) {
        return response.badRequest({ error: error.message })
      }
      return response.badRequest({ error: error })
    }
  }
}
