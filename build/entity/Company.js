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
var User_1 = require("./User");
var class_validator_1 = require("class-validator");
var Province_1 = require("./Province");
var Ward_1 = require("./Ward");
var District_1 = require("./District");
var Job_1 = require("./Job");
var ServiceType;
(function (ServiceType) {
    ServiceType["PRODUCT"] = "product";
    ServiceType["OUTSOURCING"] = "outsourcing";
})(ServiceType = exports.ServiceType || (exports.ServiceType = {}));
var Size;
(function (Size) {
    Size["SIZE1"] = "<50";
    Size["SIZE2"] = "50-100";
    Size["SIZE3"] = "100-200";
    Size["SIZE4"] = ">1000";
})(Size = exports.Size || (exports.Size = {}));
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["MONDAY"] = "monday";
    DayOfWeek["TUESDAY"] = "tuesday";
    DayOfWeek["WEDNESDAY"] = "wednesday";
    DayOfWeek["THURSDAY"] = "thursday";
    DayOfWeek["FRIDAY"] = "friday";
    DayOfWeek["SATURDAY"] = "saturday";
    DayOfWeek["SUNDAY"] = "sunday";
})(DayOfWeek = exports.DayOfWeek || (exports.DayOfWeek = {}));
var Company = /** @class */ (function () {
    function Company(id) {
        this.id = id;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Company.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return User_1.User; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", User_1.User)
    ], Company.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column({
            length: 100
        }),
        class_validator_1.IsNotEmpty(),
        class_validator_1.MaxLength(100),
        __metadata("design:type", String)
    ], Company.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.MaxLength(255),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Company.prototype, "title", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column({
            type: "enum",
            enum: ServiceType
        }),
        __metadata("design:type", String)
    ], Company.prototype, "serviceType", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column({
            type: "enum",
            enum: Size
        }),
        __metadata("design:type", String)
    ], Company.prototype, "size", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Company.prototype, "logo", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Company.prototype, "banner", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.MaxLength(20),
        typeorm_1.Column({
            length: 20
        }),
        __metadata("design:type", String)
    ], Company.prototype, "country", void 0);
    __decorate([
        typeorm_1.Column({
            default: false
        }),
        __metadata("design:type", Boolean)
    ], Company.prototype, "overtime", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column("text"),
        __metadata("design:type", String)
    ], Company.prototype, "description", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Job_1.Job; }, function (job) { return job.company; }),
        __metadata("design:type", Array)
    ], Company.prototype, "jobs", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Province_1.Province; }),
        __metadata("design:type", Province_1.Province)
    ], Company.prototype, "province", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return District_1.District; }),
        __metadata("design:type", District_1.District)
    ], Company.prototype, "district", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Ward_1.Ward; }),
        __metadata("design:type", Ward_1.Ward)
    ], Company.prototype, "ward", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.MaxLength(255),
        typeorm_1.Column({
            length: 255
        }),
        __metadata("design:type", String)
    ], Company.prototype, "street", void 0);
    __decorate([
        typeorm_1.Column({
            type: "simple-array",
            nullable: true
        }),
        __metadata("design:type", Array)
    ], Company.prototype, "skills", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Company.prototype, "topbenefit", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'text'
        }),
        __metadata("design:type", String)
    ], Company.prototype, "benefit", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: DayOfWeek,
            default: DayOfWeek.MONDAY
        }),
        __metadata("design:type", String)
    ], Company.prototype, "startOfWeekWork", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: DayOfWeek,
            default: DayOfWeek.FRIDAY
        }),
        __metadata("design:type", String)
    ], Company.prototype, "endOfWeekWork", void 0);
    Company = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number])
    ], Company);
    return Company;
}());
exports.Company = Company;
//# sourceMappingURL=Company.js.map