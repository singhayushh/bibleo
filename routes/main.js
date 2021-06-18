const router = require('express').Router();
const m = require('../controllers/main');

router.get('/', m.RenderIndex);

router.get('/dashboard', m.RenderDashboard);

router.get('/dashboard/favourites', m.RenderFavourites);

router.get('/dashboard/have-read', m.RenderHaveRead);

router.get('/dashboard/to-read', m.RenderToRead);

router.get('/dashboard/reading-now', m.RenderReadingNow);

router.get('/my-account', m.RenderAccount);

router.post('/upload', m.Upload);

router.get('/profile/:username', m.RenderProfile);

router.get('/change-avatar', m.RenderEditAvatar);

router.post('/change-avatar', m.EditAvatar);

router.post('/logout', m.Logout);

router.post('/add-book', m.AddBook);

router.post('/delete-book', m.DeleteBook);

router.get('/edit-book', m.RenderEditBook);

router.post('/edit-book', m.EditBook);

module.exports = router;