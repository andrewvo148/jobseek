"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var AuthController = /** @class */ (function () {
    function AuthController() {
        this.userRepository = typeorm_1.getRepository(User_1.User);
    }
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map