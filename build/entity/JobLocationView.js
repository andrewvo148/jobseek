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
var District_1 = require("./District");
var JobLocation_1 = require("./JobLocation");
var Province_1 = require("./Province");
var JobLocationView = /** @class */ (function () {
    function JobLocationView() {
    }
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", Number)
    ], JobLocationView.prototype, "id", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], JobLocationView.prototype, "provinceName", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], JobLocationView.prototype, "districtName", void 0);
    JobLocationView = __decorate([
        typeorm_1.ViewEntity({
            expression: function (connection) { return connection.createQueryBuilder()
                .select("jobLocation.id", "id")
                .addSelect("province.name", "provinceName")
                .addSelect("district.name", "districtName")
                .from(JobLocation_1.JobLocation, "jobLocation")
                .leftJoin(Province_1.Province, "province", "\"province\".\"id\" = \"jobLocation\".\"provinceId\"")
                .leftJoin(District_1.District, "district", "\"district\".\"id\" = \"jobLocation\".\"districtId\""); }
        })
    ], JobLocationView);
    return JobLocationView;
}());
exports.JobLocationView = JobLocationView;
//# sourceMappingURL=JobLocationView.js.map