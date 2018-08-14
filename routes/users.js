const express = require('express');
const errors = require('boom');
const cors = require('./cors');
const middlewares = require('../middlewares');

const User = require('../models/user');

const router = express.Router();
router.use(express.json());

router.route('/')
  /* Set up header Content-Type for response */
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  /* Respond to CORS policy preflight */
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  /* GET users listing. */
  .get(
    cors.corsWithOptions,
    middlewares.authenticate.verifyUser,
    middlewares.authorization.verifyAdmin,
    async (req, res, next) => {
      try {
        const users = await User.find({});

        return res.json({ success: true, users });
      } catch (err) {
        return next(errors.boomify(err));
      }
    },
  );

router.route('/:userId')
  /* Set up header Content-Type for response */
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  /* Respond to CORS policy preflight */
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  /* GET users info. */
  .get(
    cors.corsWithOptions,
    middlewares.authenticate.verifyUser,
    middlewares.misc.loadUser,
    middlewares.authorization.verifyUser,
    (req, res, next) => {
      const { userResource: user } = req;

      return res.json({ success: true, user });
    },
  );

module.exports = router;
