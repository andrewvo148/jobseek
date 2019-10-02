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
var Company_1 = require("./Company");
var JobView = /** @class */ (function () {
    function JobView() {
    }
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", Number)
    ], JobView.prototype, "id", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], JobView.prototype, "title", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], JobView.prototype, "slug", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], JobView.prototype, "description", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], JobView.prototype, "companyTitle", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], JobView.prototype, "logo", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", String)
    ], JobView.prototype, "tags", void 0);
    __decorate([
        typeorm_1.ViewColumn(),
        __metadata("design:type", Date)
    ], JobView.prototype, "publishedDated", void 0);
    JobView = __decorate([
        typeorm_1.ViewEntity({
            expression: function (connection) { return connection.createQueryBuilder()
                .select("job.id", "id")
                .addSelect("job.title", "title")
                .addSelect("job.slug", "slug")
                .addSelect("job.tags", "tags")
                .addSelect("job.salaryMin", "salaryMin")
                .addSelect("job.salaryMax", "salaryMax")
                .addSelect("job.incomeType", "incomeType")
                .addSelect("job.salaryType", "salaryType")
                .addSelect("job.publishedDated", "publishedDated")
                .addSelect("job.description", "description")
                .addSelect("company.title", "companyTitle")
                .addSelect("company.topbenefit", "topbenefit")
                .addSelect("company.logo", "logo")
                .from(Job_1.Job, "job")
                .leftJoin(Company_1.Company, "company", "\"company\".\"id\" = \"job\".\"companyId\"")
                .where("job.isPublished = true"); }
        })
    ], JobView);
    return JobView;
}());
exports.JobView = JobView;
//# sourceMappingURL=JobView.js.map