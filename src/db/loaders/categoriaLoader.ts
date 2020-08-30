import * as DataLoader from 'dataloader';
import { getRepository } from 'typeorm';

import Categoria from '../models/Categoria.entity';

const batchCategorias = async (categoriasIds: number[]) => {
  const categorias = await getRepository(Categoria).findByIds(categoriasIds);

  const categoriaIdMap: { [categoriaId: number]: Categoria } = {}

  categorias.forEach(categoria => {
    categoriaIdMap[categoria.id] = categoria;
  });

  return categoriasIds.map(categoriaId => categoriaIdMap[categoriaId]);
}

export default () => new DataLoader(batchCategorias);

