import { TypedRouter } from 'crosswalk'
import API from './api'
import { ensureHomeExists, ensureShowingExists } from './util/homes'

function register(router: TypedRouter<API>) {
  router.router.use('/homes', ensureHomeExists())

  router.router.use('/homes/:mlsn/showings', ensureShowingExists())
}

export default { register }
