import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Nationality from "./Nationality";

@Entity("author")
export default class Author {
  @PrimaryGeneratedColumn("uuid")
  id_author: string;

  @Column({ length: "255" })
  name: string;

  @Column({ length: "500", nullable: true })
  description: string;

  @Column({ length: "255", nullable: true })
  flag: string;

  @Column({ nullable: true })
  code: number;

  @OneToOne(() => Nationality, (nationality) => nationality.id_nationality, {
    eager: true,
  })
  @JoinColumn({ name: "id_nationality" })
  nationality: Nationality;

  @Column("timestamptz")
  created_at: Date;

  @Column("timestamptz")
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deleted_at: Date;

  @BeforeInsert()
  getCreateDate() {
    this.created_at = new Date();
  }

  @BeforeUpdate()
  getUpdateDate() {
    this.updated_at = new Date();
  }
}
