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
var Review = /** @class */ (function () {
    function Review() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Review.prototype, "id", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Review.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column({
            type: "enum",
            enum: [1, 2, 3, 4, 5]
        }),
        __metadata("design:type", Number)
    ], Review.prototype, "star", void 0);
    Review = __decorate([
        typeorm_1.Entity()
    ], Review);
    return Review;
}());
exports.Review = Review;
//# sourceMappingURL=Review.js.map