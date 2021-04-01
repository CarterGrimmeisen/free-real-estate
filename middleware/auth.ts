import { Context } from '@nuxt/types'

export default async function (ctx: Context) {
  // if we somehow don't have a route, let the request through
  if (!ctx.route) {
    return
  }

  // Get the auth cookie (if it's present)
  const authCookie = ctx.app.$cookies.get('session')

  // If there's no auth cookie we know we can go right to login
  // we know the page requires auth of some kind at this point
  if (!authCookie) {
    console.warn('[middleware/cookie-auth/server] no auth cookie')
    return
  }

  // Attempt to verify authentication cookie
  try {
    // Perform an actual auth check
    if (ctx.$auth.value.user === null) {
      const result = await ctx.$crosswalk.get('/user')()
      ctx.$auth.value.loggedin = true
      ctx.$auth.value.user = result
    } else {
      await ctx.$crosswalk.get('/auth/check')()
      ctx.$auth.value.loggedin = true
    }

    const authenticate: 'USER' | 'AGENT' | 'ADMIN' =
      ctx.route.meta?.authenticate

    if (authenticate) {
      const equalOrGreater = {
        USER: ['USER', 'AGENT', 'ADMIN'],
        AGENT: ['AGENT', 'ADMIN'],
        ADMIN: ['ADMIN'],
      }

      if (!equalOrGreater[authenticate].includes(ctx.$auth.value.user.type)) {
        ctx.redirect('/error/unauthorized')
      }
    }
    // Ensure that the auth check was actually successful
    // if (result.data.status !== 'success' || result.data.data !== true) {
    //   throw new Error('Unexpected error during auth check')
    // }

    // // Redirect to app if our cookie is still valid and we're trying to hit login
    // if (authCookie && ctx.route.path === FRONTEND_URLS.login) {
    //   ctx.redirect(FRONTEND_URLS.app)
    //   return
    // }
    return
  } catch (err) {
    // If a 401 was returned the cookie is likely expired/invalid
    if (err.response.status === 401) {
      ctx.app.$cookies.remove('session')
      ctx.$auth.value.error = true
    }

    // If login failed because the backend server had an error then we need to make sure
    // If the auth check fails, then user is not logged in, so redirect
    // ctx.redirect(FRONTEND_URLS.login)
  }
}
