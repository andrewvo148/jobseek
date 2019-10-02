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
var User_1 = require("./User");
var Job_1 = require("./Job");
var CandidateApplied = /** @class */ (function () {
    function CandidateApplied() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], CandidateApplied.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }),
        __metadata("design:type", User_1.User)
    ], CandidateApplied.prototype, "user", void 0);
    __decorate([
        class_validator_1.MaxLength(50),
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column({
            length: 100
        }),
        __metadata("design:type", String)
    ], CandidateApplied.prototype, "name", void 0);
    __decorate([
        class_validator_1.MaxLength(50),
        class_validator_1.IsEmail(),
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column({
            length: 50
        }),
        __metadata("design:type", String)
    ], CandidateApplied.prototype, "email", void 0);
    __decorate([
        class_validator_1.MaxLength(255),
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CandidateApplied.prototype, "cvPath", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'text',
            nullable: true
        }),
        __metadata("design:type", String)
    ], CandidateApplied.prototype, "description", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.ManyToOne(function (type) { return Job_1.Job; }, function (job) { return job.candidateApplieds; }, {
            nullable: false
        }),
        __metadata("design:type", Job_1.Job)
    ], CandidateApplied.prototype, "job", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'time without time zone'
        }),
        __metadata("design:type", Date)
    ], CandidateApplied.prototype, "applyDatedAt", void 0);
    CandidateApplied = __decorate([
        typeorm_1.Entity()
    ], CandidateApplied);
    return CandidateApplied;
}());
exports.CandidateApplied = CandidateApplied;
//# sourceMappingURL=CandidateApplied.js.map