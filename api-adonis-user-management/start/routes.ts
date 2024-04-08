/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import User from '#models/user'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import PostsController from '#controllers/posts_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/users', async ({ request }) => {
  const data = request.only(['full_name', 'email', 'password'])
  const user = await User.create(data)

  return user
})

// router.post('/users/:id/tokens', async ({ params }) => {
//   // const user = await User.findByOrFail(params.id)
//   const user = await User.findByOrFail('id', params.id)

//   const token = await User.accessTokens.create(user)

//   return {
//     type: 'bearer',
//     token: token.value!.release(),
//   }
// })

// router.get('/dashboard', [DashboardController, 'index']).use(
//   middleware.auth({
//     guards: ['api'],
//   })
// )

router.post('/post/add', [PostsController, 'store']).use(
  middleware.auth({
    guards: ['api'],
  })
)
