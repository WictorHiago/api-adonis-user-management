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
import FindByIdController from '#controllers/findbyid_controller'
import FindallUsersController from '#controllers/findall_user_controller'
import FindbyEmailController from '#controllers/findbyemail_controller'
import UpdateUsersController from '#controllers/update_user_controller'
import DeleteUserController from '#controllers/delete_user_controller'

router.group(() => {
  router
    .get('/dashboard', async ({ response }) => {
      response.status(200).json({
        message:
          '🎉✨🎉 Congratulations 🎉✨🎉, you are authenticated, this is dashboard protected',
      })
    })
    .use(middleware.auth({ guards: ['api'] }))
})

router
  .group(() => {
    router.post('/users/add', [CreateUserController, 'handle'])
    router.post('/users/login', [AuthController, 'login'])
    router.get('/users', [FindallUsersController, 'handle'])
    router.get('/users/:id', [FindByIdController, 'handle'])
    router.get('/users/email/:id', [FindbyEmailController, 'handle'])
    router
      .put('/users/update/:id', [UpdateUsersController, 'handle'])
      .use(middleware.auth({ guards: ['api'] }))
    router.delete('/users/delete/:id', [DeleteUserController, 'handle'])
  })
  .prefix('/api/v1')
