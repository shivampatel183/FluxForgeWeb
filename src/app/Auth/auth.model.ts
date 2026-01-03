export class UserEntity {
  displayName: string = '';
  email: string = '';
  passwordHash: string = '';
  createdAt: Date = new Date();
}
