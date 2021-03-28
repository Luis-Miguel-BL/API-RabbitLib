import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("nationality")
export default class Nationality {
  @PrimaryGeneratedColumn("uuid")
  id_nationality: string;

  @Column({ length: "255" })
  description: string;

  @Column({ length: "255", nullable: true })
  flag: string;

  @Column({ nullable: true })
  code: number;

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
