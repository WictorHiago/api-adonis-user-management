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
import FindByIdController from '#controllers/findbyid_controller'
import FindallUsersController from '#controllers/findall_user_controller'
import FindbyEmailController from '#controllers/findbyemail_controller'
import UpdateUsersController from '#controllers/update_user_controller'

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

router.post('/users/add', [CreateUserController, 'handle'])
router.post('/users/login', [AuthController, 'login'])
router.get('/users', [FindallUsersController, 'handle'])
router.get('/users/:id', [FindByIdController, 'handle'])
router.get('/users/email/:id', [FindbyEmailController, 'handle'])
router.put('/users/update/:id', [UpdateUsersController, 'handle'])
