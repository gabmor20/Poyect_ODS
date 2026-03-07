import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User} from "./User";


@Entity("incentivos")
export class Incentivos {
  @PrimaryGeneratedColumn()
  id!: number;

  
  @Column({ type: "int" })
  companyId!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "companyId" })
  user!: User;

  @Column({ type: "int" })
  year!: number;

  
  @Column({ type: "decimal", precision: 14, scale: 2 })
  totalDonatedValue!: number;

  @Column({ type: "decimal", precision: 14, scale: 2 })
  calculatedIncentive!: number;

 
  @Column({ type: "boolean", default: false })
  appliedCap!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}