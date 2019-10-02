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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Company_1 = require("../entity/Company");
var SecurityUtils_1 = require("../util/SecurityUtils");
var class_validator_1 = require("class-validator");
var CompanyRepository_1 = require("../repository/CompanyRepository");
var Province_1 = require("../entity/Province");
var District_1 = require("../entity/District");
var Ward_1 = require("../entity/Ward");
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
var imageFilter = function (req, file, cb) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // accept .doc .docx, .pdf files up to 1MB
        if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
            console.log("wrong");
            return [2 /*return*/, cb(new Error("Error upload cv"), false)];
        }
        cb(null, true);
        return [2 /*return*/];
    });
}); };
var upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: 1048576 }
}).single('file');
var CompanyController = /** @class */ (function () {
    function CompanyController() {
        this.companyRepository = typeorm_1.getCustomRepository(CompanyRepository_1.CompanyRepository);
    }
    CompanyController.prototype.all = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var page, size, offset, allCompanys, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(req.query);
                        page = req.query.page || 0;
                        size = req.query.size || 20;
                        offset = page * size;
                        console.log("page: " + page + ", size: " + size + ", offset: " + offset);
                        return [4 /*yield*/, this.companyRepository.find({
                                where: {
                                    isPublished: true,
                                },
                                relations: ['province', 'district', 'ward'],
                                // 'jobLocations.district', 'jobLocations.ward'],
                                skip: page,
                                take: 20
                            })];
                    case 1:
                        allCompanys = _a.sent();
                        res.json(allCompanys);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res.status(500).json({ status: 500, message: e_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CompanyController.prototype.save = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, company, errors, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        updated = false;
                        company = new Company_1.Company();
                        company.user = SecurityUtils_1.SecurityUtils.getCurrentUser(request);
                        console.log(SecurityUtils_1.SecurityUtils.getCurrentUser(request));
                        console.log(request.user);
                        company.id = request.body.id;
                        company.name = request.body.name;
                        company.country = request.body.country;
                        company.startOfWeekWork = request.body.startOfWeekWork;
                        company.endOfWeekWork = request.body.endOfWeekWork;
                        company.serviceType = request.body.serviceType;
                        company.description = request.body.description;
                        company.size = request.body.size;
                        company.province = new Province_1.Province(request.body.provinceid);
                        company.district = new District_1.District(request.body.districtid);
                        company.ward = new Ward_1.Ward(request.body.wardid);
                        company.street = request.body.street;
                        company.skills = request.body.skills;
                        company.topbenefit = request.body.topbenefit;
                        company.benefit = request.body.benefit;
                        return [4 /*yield*/, class_validator_1.validate(company)];
                    case 1:
                        errors = _a.sent();
                        if (errors.length > 0) {
                            response.status(400).json(errors);
                            return [2 /*return*/];
                        }
                        if (company.id) {
                            updated = true;
                        }
                        return [4 /*yield*/, this.companyRepository.createOrUpdate(company)];
                    case 2:
                        company = _a.sent();
                        if (updated) {
                            response.status(200).json(company);
                            return [2 /*return*/];
                        }
                        response.status(201).json(company);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        response.status(500).json({ status: 500, message: e_2.getMessage() });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // @Secured(['employers', 'admin'])
    // async uploadLogo(request: Request, response: Response, next: NextFunction) {
    //     let self = this;
    //      upload(request, response, async function (err) {
    //          try {
    //              console.log(request.body);
    //              if (err) {
    //                  console.log("error");
    //                  response.status(400).json(err);
    //                  return;
    //              }
    //              console.log(candidateApplied);
    //              let errors = await validate(candidateApplied);
    //              if (errors.length > 0) {
    //                  // delete file
    //                  console.log(request.file.path);
    //                  await unlinkSync(request.file.path);
    //                  response.status(400).json(errors);
    //                  return;
    //              }
    //              // console.log(candidateApplied);
    //              response.json(candidateApplied);
    //          } catch (e) {
    //              await unlinkSync(request.file.path);
    //              response.status(500).json(e);
    //          }
    //     });
    // }
    CompanyController.prototype.topCompany = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        SecurityUtils_1.Secured(['employers', 'admin']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], CompanyController.prototype, "save", null);
    return CompanyController;
}());
exports.CompanyController = CompanyController;
//# sourceMappingURL=CompanyController.js.map