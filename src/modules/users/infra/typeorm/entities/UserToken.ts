import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from "typeorm";
import User from "@modules/users/infra/typeorm/entities/User";

@Entity("user_token")
export default class UserToken {
  @PrimaryGeneratedColumn("uuid")
  id_user_token: string;

  @ManyToOne(() => User, (user) => user.id_user)
  @JoinColumn({ name: "id_user" })
  id_user: string;

  @Column()
  token: string;

  @Column()
  created_at: Date;

  @BeforeInsert()
  newToken() {
    this.token = Math.random().toString(36).substring(2, 8);
  }

  @BeforeInsert()
  getDate() {
    this.created_at = new Date();
  }
}
