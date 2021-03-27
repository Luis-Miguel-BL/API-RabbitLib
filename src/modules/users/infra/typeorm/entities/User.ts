import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import bcrypt from "bcryptjs";
import authConfig from "@shared/config/auth";
import { Exclude } from "class-transformer";
import { sign } from "jsonwebtoken";

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column({ length: "200" })
  name: string;

  @Column({ length: "100" })
  email: string;

  @Column({ nullable: true, length: "255" })
  @Exclude()
  password: string;

  @Column({ type: "varchar", array: true })
  permissions: string[];

  @Column({ type: "date", nullable: true })
  date_birth: Date;

  @Column("timestamptz")
  created_at: Date;

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deleted_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  }

  @BeforeInsert()
  getDate() {
    this.created_at = new Date();
  }

  async isValidPassword(password: string): Promise<boolean> {
    const isValidPassword = await bcrypt.compare(password, this.password);
    return isValidPassword;
  }

  generateToken(): string {
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(this.id_user),
      jwtid: process.env.APP_SECRET,
      expiresIn,
      audience: this.permissions,
    });
    return token;
  }
}
