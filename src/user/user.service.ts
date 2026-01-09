import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class UserService {
  constructor(private readonly firebase: FirebaseService) {}

  private get users() {
    return this.firebase.db.collection('users');
  }

  async create(dto: CreateUserDto) {
    const data = {
      name: dto.name,
      age: dto.age,
    };

    const docRef = await this.users.add(data);
    return { id: docRef.id, ...data };
  }


  async findAll() {
    const snapshot = await this.users.get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async findOne(id: string) {
    const doc = await this.users.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

async update(id: string, dto: UpdateUserDto) {
  const cleanDto = Object.fromEntries(
    Object.entries(dto).filter(([_, v]) => v !== undefined),
  );

  await this.users.doc(id).update(cleanDto);
  return { id, ...cleanDto };
}


  async remove(id: string) {
    await this.users.doc(id).delete();
    return { deleted: true };
  }
}
