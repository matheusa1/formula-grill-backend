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
exports.CreateMesaDto = void 0;
const class_validator_1 = require("class-validator");
class CreateMesaDto {
}
exports.CreateMesaDto = CreateMesaDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Código da mesa é obrigatório',
    }),
    (0, class_validator_1.IsString)({
        message: 'O código da mesa deve ser uma string',
    }),
    __metadata("design:type", String)
], CreateMesaDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsInt)({
        message: 'A quantidade de assentos deve ser um número inteiro',
    }),
    (0, class_validator_1.Min)(1, {
        message: 'A quantidade de assentos deve ser pelo menos 1',
    }),
    __metadata("design:type", Number)
], CreateMesaDto.prototype, "seats", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({
        message: 'A disponibilidade deve ser um valor booleano',
    }),
    __metadata("design:type", Boolean)
], CreateMesaDto.prototype, "status", void 0);
//# sourceMappingURL=create-mesa.dto.js.map