/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const router = Router();

router.post(
	"/new",
	[
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").not().isEmpty(),
		check("password", "El password es obligatorio").isLength({ min: 6 }),
	],
	createUser
);

router.post(
	"/",
	[
		check("email", "El email es obligatorio").not().isEmpty(),
		check("password", "El debe ser de mínimo 6 carácteres").isLength({ min: 6 }),
	],
	loginUser
);

router.get("/renew", renewToken);

module.exports = router;
