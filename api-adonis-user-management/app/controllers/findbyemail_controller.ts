import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import FindUserService from '#services/find_user.service'
@inject()
export default class FindbyEmailsController {
  constructor(private findByEmailService: FindUserService) {}

  public async handle({ params, response }: HttpContext) {
    try {
      const { id } = params

      const user = await this.findByEmailService.findByEmail(id)
      return response.status(200).json({ result: user })
    } catch (error) {
      if (error instanceof Error) {
        return response.badRequest({ error: error.message })
      }
      return response.status(400).json({ error: error })
    }
  }
}
