import express from 'express'
import { categoriesController } from './controllers/categoriesController';
import { seriesController } from './controllers/seriesController';
import { episodesController } from './controllers/episodesController';
import { authController } from './controllers/authController';
import { ensureAuth, ensureAuthByQuery } from './middlewares/authMiddleware';
import { favoritesController } from './controllers/favoritesController';
import { likesController } from './controllers/likesController';
import { usersController } from './controllers/usersController';

const router = express.Router();

router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)

router.get('/series/featured', ensureAuth, seriesController.featured)
router.get('/series/newest', seriesController.newest)
router.get('/series/search', ensureAuth, seriesController.search)
router.get('/series/popular', ensureAuth, seriesController.popular)
router.get('/series/:id', ensureAuth, seriesController.show)

router.get('/episodes/stream', ensureAuthByQuery, episodesController.stream)
router.get('/episodes/:id/watchTime', ensureAuth, episodesController.getWatchTime)
router.post('/episodes/:id/watchTime', ensureAuth, episodesController.setWatchTime)

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login)

router.post('/favorites', ensureAuth, favoritesController.save)
router.get('/favorites', ensureAuth, favoritesController.index)
router.delete('/favorites/:id', ensureAuth, favoritesController.remove)

router.post('/likes', ensureAuth, likesController.save)
router.delete('/likes/:id', ensureAuth, likesController.remove)

router.get('/users/current', ensureAuth, usersController.show)
router.put('/users/current', ensureAuth, usersController.update)
router.put('/users/current/password', ensureAuth, usersController.updatePassword)
router.get('/users/current/watching', ensureAuth, usersController.watching)
export { router }