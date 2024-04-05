const { Router } = require("express");

const{
    createUser,
    loginUser,
    authenticateToken
} = require("../controllers/controller-auth");


const router = Router();

/*Endpoin de Usuario*/
router.post("/api/v1/user", createUser);
router.get("/api/v1/auth", authenticateToken);
router.post("/api/v1/login", loginUser);



module.exports = router;