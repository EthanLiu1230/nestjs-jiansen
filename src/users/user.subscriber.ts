import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from './user.entity';

import { genSalt, hash } from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    await UserSubscriber.digestUserPassword(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    await UserSubscriber.digestUserPassword(event.entity);
  }

  private static async digestUserPassword(user: User) {
    const { password } = user;
    const salt = await genSalt();
    user.password = await hash(password, salt);
    user.salt = salt;
  }
}
