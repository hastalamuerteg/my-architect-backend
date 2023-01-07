import { Architect } from '@prisma/client';

import { ICreateArchitectDTO } from '../dtos/ICreateArchitectDTO';
import { IListArchitectDTO } from '../dtos/IListArchitectDTO';

interface IArchitectsRepository {
  create: (data: ICreateArchitectDTO) => Promise<void>
  findByEmail: (email: string) => Promise<Architect>
  findById: (id: string) => Promise<Architect>
  listArchitects: () => Promise<IListArchitectDTO[]>
}

export { IArchitectsRepository };
