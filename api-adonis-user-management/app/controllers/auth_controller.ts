import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const { email, password } = request.body()

    try {
      if (!email || !password) {
        return 'Email and password are required'
      }

      const user = await User.findBy('email', email)

      if (!user) {
        return 'User not found'
      }

      const isPasswordValid = await hash.verify(user.password, password)

      if (!isPasswordValid) {
        return response.status(400).send({ message: 'Email or Password is invalid' })
      }

      await User.findByOrFail('id', user.id)
      const token = await User.accessTokens.create(user)

      if (token instanceof Error) {
        return response.status(400).send({ message: token.message })
      }

      return response.status(201).json({ token })
    } catch (error: any) {
      return response.status(400).send({ message: error.message })
    }
  }
}
