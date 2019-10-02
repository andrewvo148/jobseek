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
var District_1 = require("./District");
var Ward = /** @class */ (function () {
    function Ward(id, code, name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Ward.prototype, "id", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.MaxLength(20),
        typeorm_1.Column({
            length: 20,
            unique: true
        }),
        __metadata("design:type", String)
    ], Ward.prototype, "code", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.MaxLength(50),
        typeorm_1.Column({
            length: 50
        }),
        __metadata("design:type", String)
    ], Ward.prototype, "name", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return District_1.District; }),
        __metadata("design:type", District_1.District)
    ], Ward.prototype, "district", void 0);
    Ward = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number, String, String])
    ], Ward);
    return Ward;
}());
exports.Ward = Ward;
//# sourceMappingURL=Ward.js.map