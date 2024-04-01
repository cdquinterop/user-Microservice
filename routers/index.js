const { Router } = require("express");

const{
    createUser,
    loginUser
} = require("../controllers/controller-user");

const{
    listEntryExit

} = require("../controllers/controller-detail");

const router = Router();

/*Endpoin de Usuario*/
router.post("/api/v1/user", createUser);
router.post("/api/v1/login", loginUser);

/*Endpoin de Ingresos y Egresos*/
router.get("/api/v1/detail/:userId", listEntryExit);

module.exports = router;