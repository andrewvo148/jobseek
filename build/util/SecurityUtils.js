"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SecurityUtils = /** @class */ (function () {
    function SecurityUtils() {
    }
    SecurityUtils.getCurrentUser = function (req) {
        return req.user && req.user.data;
    };
    return SecurityUtils;
}());
exports.SecurityUtils = SecurityUtils;
// decorator
function Secured(roles) {
    return function (target, propertyName, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log(args[0].user);
            if (args[0].user && args[0].user.data && !roles.includes(args[0].user.data.role)) {
                return args[1].status(403).json("Access denined!");
            }
            return originalMethod.apply(this, args);
        };
    };
}
exports.Secured = Secured;
//# sourceMappingURL=SecurityUtils.js.map