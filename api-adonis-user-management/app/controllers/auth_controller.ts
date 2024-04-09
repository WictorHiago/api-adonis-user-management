import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const { email, password } = request.body()

    try {
      const userExist = await User.findBy('email', email)
      if (!userExist) {
        return response.status(400).send({ message: 'Email or Password is invalid' })
      }

      const isPasswordValid = await hash.verify(userExist.password, password)

      if (!isPasswordValid) {
        return response.status(400).send({ message: 'Email or Password is invalid' })
      }

      const user = await User.findByOrFail('id', userExist.id)
      const token = await User.accessTokens.create(user)

      return response
        .status(200)
        .json({ authorized: 'Success', token: `Bearer ${token.value?.release()}` })
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
