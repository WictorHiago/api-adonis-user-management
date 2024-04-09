import type { HttpContext } from '@adonisjs/core/http'
import FindUserService from '#services/find_user.service'
import { inject } from '@adonisjs/core'

@inject()
export default class FindallUsersController {
  constructor(private findUserService: FindUserService) {}

  public async handle({ response }: HttpContext) {
    try {
      const users = await this.findUserService.findAll()

      const usersFomatted = users.map((user) => {
        return {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      })

      return response.status(200).json({ result: usersFomatted })
    } catch (error) {
      if (error instanceof Error) {
        return response.badRequest({ error: error.message })
      }
      return response.badRequest({ error: error })
    }
  }
}
