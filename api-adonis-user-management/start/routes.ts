/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import CreateUserController from '#controllers/create_user_controller'
import AuthController from '#controllers/auth_controller'
import User from '#models/user'

router
  .get('/dashboard', async () => {
    return {
      hello: 'você esta logado',
    }
  })
  .use(middleware.auth({ guards: ['api'] }))

router
  .get('/tokens', async ({ auth }) => {
    return User.accessTokens.all(auth.user!)
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

router.post('users/add', [CreateUserController, 'handle'])
router.post('users/login', [AuthController, 'login'])
