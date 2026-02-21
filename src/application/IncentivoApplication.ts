import { IncentivoAdapter } from "../infaestructure/adapter/IncentivoAdapter";

export class IncentivoApplication {

  constructor(
    private readonly incentivoAdapter: IncentivoAdapter
  ) {}

  async getAll() {
    return await this.incentivoAdapter.findAll();
  }

  async getById(id: number) {
    return await this.incentivoAdapter.findById(id);
  }

  async getByEntrega(id_entrega: number) {
    return await this.incentivoAdapter.findByEntrega(id_entrega);
  }
}