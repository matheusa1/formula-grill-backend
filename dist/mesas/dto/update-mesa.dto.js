"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMesaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_mesa_dto_1 = require("./create-mesa.dto");
class UpdateMesaDto extends (0, mapped_types_1.PartialType)(create_mesa_dto_1.CreateMesaDto) {
}
exports.UpdateMesaDto = UpdateMesaDto;
//# sourceMappingURL=update-mesa.dto.js.map