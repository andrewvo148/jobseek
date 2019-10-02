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
var Profile = /** @class */ (function () {
    function Profile() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Profile.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return User_1.User; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", User_1.User)
    ], Profile.prototype, "user", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Profile.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsEmail(),
        typeorm_1.Column({
            length: 100
        }),
        __metadata("design:type", String)
    ], Profile.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Profile.prototype, "cvPath", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'text',
            nullable: true
        }),
        __metadata("design:type", String)
    ], Profile.prototype, "description", void 0);
    Profile = __decorate([
        typeorm_1.Entity()
    ], Profile);
    return Profile;
}());
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map