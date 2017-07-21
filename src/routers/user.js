import Router from 'koa-router'
import * as userCtrl from '../controllers/user'
import auth from '../middleware/auth'

const router = new Router({
    prefix: '/user'
});

router
    .post('/token', userCtrl.token)
    .post('/login', userCtrl.login)
    .get('/:id', auth.isAuthenticated(), async (ctx, next) => {})
    .put('/:id', auth.isAuthenticated(), async (ctx, next) => {})
    .delete('/:id', auth.isAuthenticated(), async (ctx, next) => {});

export default router
