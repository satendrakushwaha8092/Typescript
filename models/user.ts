import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "users",
})
export class users extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  age!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: true,
  })
  gender!: string;
}