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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var Job_1 = require("../entity/Job");
var typeorm_1 = require("typeorm");
var JobRepository_1 = require("../repository/JobRepository");
var JobLocationRepository_1 = require("../repository/JobLocationRepository");
var JobService = /** @class */ (function () {
    function JobService() {
    }
    JobService.prototype.createOrUpdate = function (job, jobRepository, jobLocationRepository) {
        return __awaiter(this, void 0, void 0, function () {
            var jobL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, jobRepository.save(job)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, jobLocationRepository.findsByJob(job)];
                    case 2:
                        jobL = _a.sent();
                        return [4 /*yield*/, jobLocationRepository.remove(jobL)];
                    case 3:
                        _a.sent();
                        job.jobLocations.forEach(function (jl) {
                            jl.job.id = job.id;
                        });
                        return [4 /*yield*/, jobLocationRepository.save(job.jobLocations)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, job];
                }
            });
        });
    };
    __decorate([
        typeorm_1.Transaction(),
        __param(1, typeorm_1.TransactionRepository()), __param(2, typeorm_1.TransactionRepository()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Job_1.Job, JobRepository_1.JobRepository, JobLocationRepository_1.JobLocationRepository]),
        __metadata("design:returntype", Promise)
    ], JobService.prototype, "createOrUpdate", null);
    return JobService;
}());
exports.JobService = JobService;
//# sourceMappingURL=JobService.js.map