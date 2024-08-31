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
exports.MesasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let MesasService = class MesasService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createMesaDto) {
        const { code } = createMesaDto;
        const codeAlreadyExists = await this.prisma.mesas.findUnique({
            where: {
                code,
            },
        });
        if (codeAlreadyExists) {
            throw new common_1.ConflictException('Código da mesa já existe... Parece que temos um safety car na pista!');
        }
        const mesa = await this.prisma.mesas.create({
            data: createMesaDto,
        });
        return mesa;
    }
    findAll() {
        return this.prisma.mesas.findMany();
    }
    async findOne(id) {
        const mesa = await this.prisma.mesas.findUnique({
            where: { id },
        });
        if (!mesa) {
            throw new common_1.NotFoundException(`Mesa com ID ${id} não encontrada... Parece que você perdeu essa curva!`);
        }
        return mesa;
    }
    async update(id, updateMesaDto) {
        const mesa = await this.prisma.mesas.findUnique({
            where: { id },
        });
        if (!mesa) {
            throw new common_1.NotFoundException(`Mesa com ID ${id} não encontrada... Parece que essa corrida não vai terminar bem!`);
        }
        return this.prisma.mesas.update({
            where: { id },
            data: updateMesaDto,
        });
    }
    async remove(id) {
        const mesa = await this.prisma.mesas.findUnique({
            where: { id },
        });
        if (!mesa) {
            throw new common_1.NotFoundException(`Mesa com ID ${id} não encontrada... Bandeira vermelha, operação abortada!`);
        }
        return this.prisma.mesas.delete({
            where: { id },
        });
    }
};
exports.MesasService = MesasService;
exports.MesasService = MesasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MesasService);
//# sourceMappingURL=mesas.service.js.map