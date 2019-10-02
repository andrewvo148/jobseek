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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Job_1 = require("./Job");
var Province_1 = require("./Province");
var District_1 = require("./District");
var Ward_1 = require("./Ward");
var JobLocation = /** @class */ (function () {
    function JobLocation(id, job, province, district, ward) {
        this.id = id;
        this.job = job;
        this.province = province;
        this.district = district;
        this.ward = ward;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], JobLocation.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Job_1.Job; }, function (job) { return job.jobLocations; }),
        __metadata("design:type", Job_1.Job)
    ], JobLocation.prototype, "job", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Province_1.Province; }),
        __metadata("design:type", Province_1.Province)
    ], JobLocation.prototype, "province", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return District_1.District; }),
        __metadata("design:type", District_1.District)
    ], JobLocation.prototype, "district", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Ward_1.Ward; }),
        __metadata("design:type", Ward_1.Ward)
    ], JobLocation.prototype, "ward", void 0);
    JobLocation = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number, Job_1.Job, Province_1.Province, District_1.District, Ward_1.Ward])
    ], JobLocation);
    return JobLocation;
}());
exports.JobLocation = JobLocation;
//# sourceMappingURL=JobLocation.js.map