import type { HttpContext } from '@adonisjs/core/http'
import CreateUserService from '#services/create_user.service'
import { inject } from '@adonisjs/core'
import User from '#models/user'

@inject()
export default class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  public async handle({ request, response }: HttpContext) {
    try {
      const { fullname, email, password } = request.body()

      if (!fullname || !email || !password) {
        return response.status(400).send({ message: 'Name, email and password are required' })
      }

      const user = await this.createUserService.execute({ fullname, email, password })

      if (user instanceof Error) {
        return response.status(400).send({ message: user.message })
      }

      const token = await User.accessTokens.create(user)
      const token_user = {
        type: 'Bearer',
        value: token.value!.release(),
      }

      return response.status(201).json({ created: user, token: token_user })
    } catch (error: any) {
      return response.badRequest({ error: error.message })
    }
  }
}
