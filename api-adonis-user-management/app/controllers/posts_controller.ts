import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async store({ auth, request }: HttpContext) {
    if (!auth.isAuthenticated) {
      return 'Unauthorized create posts ###'
    }

    const { title, content } = request.body()

    const post = await Post.create({
      title,
      content,
    })

    return post
  }
}
