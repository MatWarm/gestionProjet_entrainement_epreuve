module.exports = (server) => {
    const userController = require("../controllers/userController");


    server.post("/createUser", userController.createUser);

    server.get("/findUserByUsername",userController.findUserByUsername);

    server.post("/veriflogin",userController.veriflogin);


}