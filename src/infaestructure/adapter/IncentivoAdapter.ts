import { AppDataSource } from "../config/data_base";
import { Incentivo } from "../entities/Incentivo";

export class IncentivoAdapter {

  private incentivoRepo = AppDataSource.getRepository(Incentivo);

  async findAll() {
    return await this.incentivoRepo.find({
      relations: ["entrega"],
      order: { id_incentivo: "DESC" },
    });
  }

  async findById(id_incentivo: number) {
    return await this.incentivoRepo.findOne({
      where: { id_incentivo },
      relations: ["entrega"],
    });
  }

  async findByEntrega(id_entrega: number) {
    return await this.incentivoRepo.findOne({
      where: { id_entrega },
      relations: ["entrega"],
    });
  }
}