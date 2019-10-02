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
var Province = /** @class */ (function () {
    function Province(id, code, name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Province.prototype, "id", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.MaxLength(20),
        typeorm_1.Column({
            length: 20,
            unique: true
        }),
        __metadata("design:type", String)
    ], Province.prototype, "code", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.MaxLength(50),
        typeorm_1.Column({
            length: 50
        }),
        __metadata("design:type", String)
    ], Province.prototype, "name", void 0);
    Province = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number, String, String])
    ], Province);
    return Province;
}());
exports.Province = Province;
//# sourceMappingURL=Province.js.map