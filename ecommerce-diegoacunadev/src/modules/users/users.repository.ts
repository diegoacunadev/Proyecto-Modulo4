// import { Injectable } from '@nestjs/common';
// import { User } from './entities/user.entity';
// import { UserResponseDto } from './dto/user-response.dto';

// @Injectable()
// export class UsersRepository {
//   private Users: User[] = [
//     {
//       id: 1,
//       email: 'juan.perez@example.com',
//       name: 'Juan Pérez',
//       password: '123456',
//       address: 'Calle 10 #45-23',
//       phone: '+57 3001234567',
//       country: 'Colombia',
//       city: 'Bogotá',
//     },
//     {
//       id: 2,
//       email: 'maria.gomez@example.com',
//       name: 'María Gómez',
//       password: 'password123',
//       address: 'Cra 15 #67-89',
//       phone: '+57 3012345678',
//       country: 'Colombia',
//       city: 'Medellín',
//     },
//     {
//       id: 3,
//       email: 'pedro.ramirez@example.com',
//       name: 'Pedro Ramírez',
//       password: 'securePass!',
//       address: 'Av 30 #12-34',
//       phone: '+57 3023456789',
//       country: 'Colombia',
//       city: 'Cali',
//     },
//     {
//       id: 4,
//       email: 'luisa.martinez@example.com',
//       name: 'Luisa Martínez',
//       password: 'luisa2025',
//       address: 'Calle 50 #8-12',
//       phone: '+57 3034567890',
//       country: 'Colombia',
//       city: 'Barranquilla',
//     },
//     {
//       id: 5,
//       email: 'andres.castillo@example.com',
//       name: 'Andrés Castillo',
//       password: 'qwerty123',
//       address: 'Cra 25 #90-15',
//       phone: '+57 3045678901',
//       country: 'Colombia',
//       city: 'Cartagena',
//     },
//     {
//       id: 6,
//       email: 'carolina.sanchez@example.com',
//       name: 'Carolina Sánchez',
//       password: 'caroPass2025',
//       address: 'Av 80 #22-05',
//       phone: '+57 3056789012',
//       country: 'Colombia',
//       city: 'Bucaramanga',
//     },
//     {
//       id: 7,
//       email: 'oscar.mendoza@example.com',
//       name: 'Oscar Mendoza',
//       password: 'oscar1234',
//       address: 'Calle 100 #45-09',
//       phone: '+57 3067890123',
//       country: 'Colombia',
//       city: 'Pereira',
//     },
//   ];

//   getUsers(page = 1, limit = 5): UserResponseDto[] {
//     const startIndex = (page - 1) * limit;
//     const endIndex = startIndex + limit;

//     const paginatedUsers = this.Users.slice(startIndex, endIndex);

//     return paginatedUsers.map((user) => {
//       const newUser = { ...user };
//       delete newUser.password;
//       return newUser;
//     });
//   }

//   getUserById(id: number) {
//     const user = this.Users.find((user) => user.id === id);
//     if (!user) return null;
//     const newUser = { ...user };
//     delete newUser.password;
//     return newUser;
//   }

//   deleteUser(id: number) {
//     const index = this.Users.findIndex((user) => user.id === id);
//     if (index === -1) return null;
//     const deleted = this.Users[index];
//     this.Users.splice(index, 1);
//     return deleted;
//   }

//   updateUser(id: number, updatedData: Partial<User>) {
//     const userIndex = this.Users.findIndex((user) => user.id === id);
//     if (userIndex === -1) return null;
//     this.Users[userIndex] = { ...this.Users[userIndex], ...updatedData };
//     return this.Users[userIndex];
//   }

//   createUser(user: User) {
//     const newId =
//       this.Users.length > 0 ? Math.max(...this.Users.map((u) => u.id)) + 1 : 1;
//     const newUser = { ...user, id: newId };
//     this.Users.push(newUser);
//     return {
//       users: delete newUser.password,
//       createdUser: { ...newUser },
//     };
//   }
// }
