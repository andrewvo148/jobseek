"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var ProvinceRepository_1 = require("../repository/ProvinceRepository");
var SecurityUtils_1 = require("../util/SecurityUtils");
var class_validator_1 = require("class-validator");
var Province_1 = require("../entity/Province");
var ProvinceController = /** @class */ (function () {
    function ProvinceController() {
        this.provinceRepository = typeorm_1.getCustomRepository(ProvinceRepository_1.ProvinceRepository);
    }
    ProvinceController.prototype.all = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var provinces, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.provinceRepository.all()];
                    case 1:
                        provinces = _a.sent();
                        res.json(provinces);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, res.status(500).json(e_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProvinceController.prototype.save = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, province, errors, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        updated = false;
                        province = new Province_1.Province();
                        province.id = req.body.id;
                        province.code = req.body.code;
                        province.name = req.body.name;
                        return [4 /*yield*/, class_validator_1.validate(province)];
                    case 1:
                        errors = _a.sent();
                        if (errors.length > 0) {
                            console.log(errors);
                            res.status(400).json(errors);
                            return [2 /*return*/];
                        }
                        if (province.id) {
                            updated = true;
                        }
                        return [4 /*yield*/, this.provinceRepository.createOrUpdate(province)];
                    case 2:
                        province = _a.sent();
                        console.log(province);
                        if (updated) {
                            res.status(200).json(province);
                        }
                        return [2 /*return*/, res.status(201).json(province)];
                    case 3:
                        e_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json(e_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        SecurityUtils_1.Secured(['admin']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ProvinceController.prototype, "save", null);
    return ProvinceController;
}());
exports.ProvinceController = ProvinceController;
//# sourceMappingURL=ProvinceController.js.map