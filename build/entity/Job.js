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
var class_validator_1 = require("class-validator");
var Company_1 = require("./Company");
var JobLocation_1 = require("./JobLocation");
var CandidateApplied_1 = require("./CandidateApplied");
var Currency;
(function (Currency) {
    Currency["USD"] = "usd";
    Currency["VND"] = "vnd";
})(Currency = exports.Currency || (exports.Currency = {}));
var SalaryType;
(function (SalaryType) {
    SalaryType["ATTRACTIVE"] = "attractive";
    SalaryType["NEGOTIATION"] = "negotiation";
})(SalaryType = exports.SalaryType || (exports.SalaryType = {}));
var IncomeType;
(function (IncomeType) {
    IncomeType["GROSS"] = "gross";
    IncomeType["NET"] = "net";
})(IncomeType = exports.IncomeType || (exports.IncomeType = {}));
var Job = /** @class */ (function () {
    function Job(id) {
        this.id = id;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Job.prototype, "id", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.MaxLength(255),
        typeorm_1.Column({
            length: 255
        }),
        __metadata("design:type", String)
    ], Job.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column({
            length: 255
        }),
        __metadata("design:type", String)
    ], Job.prototype, "slug", void 0);
    __decorate([
        class_validator_1.IsArray(),
        class_validator_1.ArrayMinSize(1),
        typeorm_1.Column("simple-array"),
        __metadata("design:type", Array)
    ], Job.prototype, "tags", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column({
            type: 'text'
        }),
        __metadata("design:type", String)
    ], Job.prototype, "description", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column({
            type: 'text'
        }),
        __metadata("design:type", String)
    ], Job.prototype, "requiremention", void 0);
    __decorate([
        class_validator_1.IsArray(),
        class_validator_1.ArrayMinSize(1),
        class_validator_1.ArrayMaxSize(3),
        typeorm_1.OneToMany(function (type) { return JobLocation_1.JobLocation; }, function (jobLocation) { return jobLocation.job; }, {
            cascade: false,
            persistence: false,
        }),
        __metadata("design:type", Array)
    ], Job.prototype, "jobLocations", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Company_1.Company; }, function (company) { return company.jobs; }, {
            nullable: false
        }),
        typeorm_1.JoinColumn({ name: "companyId" }),
        __metadata("design:type", Company_1.Company)
    ], Job.prototype, "company", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return CandidateApplied_1.CandidateApplied; }, function (candidateApplied) { return candidateApplied.job; }),
        __metadata("design:type", Array)
    ], Job.prototype, "candidateApplieds", void 0);
    __decorate([
        typeorm_1.Column({
            type: "timestamp with time zone",
            nullable: true
        }),
        __metadata("design:type", typeorm_1.Timestamp)
    ], Job.prototype, "publishedDated", void 0);
    __decorate([
        typeorm_1.Column({
            default: false
        }),
        __metadata("design:type", Boolean)
    ], Job.prototype, "isPublished", void 0);
    __decorate([
        typeorm_1.Column({
            type: "numeric",
            precision: 11,
            scale: 2,
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Job.prototype, "salaryMin", void 0);
    __decorate([
        typeorm_1.Column({
            type: "numeric",
            precision: 11,
            scale: 2,
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Job.prototype, "salaryMax", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column({
            type: "enum",
            enum: IncomeType
        }),
        __metadata("design:type", String)
    ], Job.prototype, "incomeType", void 0);
    __decorate([
        typeorm_1.Column({
            type: "enum",
            enum: SalaryType,
            nullable: true
        }),
        __metadata("design:type", String)
    ], Job.prototype, "salaryType", void 0);
    __decorate([
        typeorm_1.Column({
            type: "enum",
            enum: Currency,
            nullable: true
        }),
        __metadata("design:type", String)
    ], Job.prototype, "currency", void 0);
    Job = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number])
    ], Job);
    return Job;
}());
exports.Job = Job;
//# sourceMappingURL=Job.js.map