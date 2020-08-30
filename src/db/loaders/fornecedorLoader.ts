import * as DataLoader from 'dataloader';
import { getRepository } from 'typeorm';

import Fornecedor from '../models/Fornecedor.entity';

const batchFornecedores = async (fornecedoresIds: number[]) => {
  const fornecedores = await getRepository(Fornecedor).findByIds(fornecedoresIds);

  const fornecedorIdMap: { [fornecedorId: number]: Fornecedor } = {}

  fornecedores.forEach(fornecedor => {
    fornecedorIdMap[fornecedor.id] = fornecedor;
  });

  return fornecedoresIds.map(fornecedorId => fornecedorIdMap[fornecedorId]);
}

export default () => new DataLoader(batchFornecedores);

