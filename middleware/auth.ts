import { Context } from '@nuxt/types'
import { UserType } from '.prisma/client'

export default async function (ctx: Context) {
  const showAuth = () => {
    ctx.redirect({
      path: ctx.from ? ctx.from.path : '/',
      query: { auth: ctx.route.path },
    })
  }

  // if we somehow don't have a route, let the request through
  if (!ctx.route) {
    // console.warn('no route')
    return
  }

  // Get the auth cookie (if it's present)
  const authCookie = ctx.app.$cookies.get('session')

  // If there's no auth cookie we know we can go right to login
  // we know the page requires auth of some kind at this point

  // Attempt to verify authentication cookie
  try {
    const auth: UserType = ctx.route.meta?.auth ?? ctx.route.meta?.[0]?.auth
    if (!authCookie) {
      // eslint-disable-next-line no-console
      console.warn('[middleware/cookie-auth/server] no auth cookie')
      // return ctx.redirect('/error/unauthorized')
      return showAuth()
    }

    // Perform an actual auth check
    if (ctx.$auth.value.user === null) {
      const result = await ctx.$crosswalk.get('/user')()
      ctx.$auth.value.loggedin = true
      ctx.$auth.value.user = result
    } else {
      await ctx.$crosswalk.get('/auth/check')()
      ctx.$auth.value.loggedin = true
    }

    if (auth) {
      const equalOrGreater = {
        USER: ['USER', 'AGENT', 'ADMIN'],
        AGENT: ['AGENT', 'ADMIN'],
        ADMIN: ['ADMIN'],
      }

      if (!equalOrGreater[auth].includes(ctx.$auth.value.user.type)) {
        return ctx.redirect('/error/unauthorized')
        // return showAuth()
      }
    }
  } catch (err) {
    // If a 401 was returned the cookie is likely expired/invalid

    // console.error(err)
    if (!err.response) {
      return ctx.redirect('/error/server-error')
    } else if (err.response.status === 401) {
      ctx.app.$cookies.remove('session')
      return showAuth()
    } else if (err.response.status === 403) {
      return ctx.redirect('/error/unauthorized')
    }

    // If login failed because the backend server had an error then we need to make sure
    // If the auth check fails, then user is not logged in, so redirect
    // ctx.redirect(FRONTEND_URLS.login)
  }
}
