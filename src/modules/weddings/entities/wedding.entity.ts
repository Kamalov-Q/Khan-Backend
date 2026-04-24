import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    ForeignKey,
} from 'typeorm';
import { WeddingStatus } from '../../../common/enums/wedding-status.enum';
import { User } from '../../users/entities/user.entity';
import { Decimal } from 'decimal.js';

@Entity('weddings')
export class Wedding {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    venueName: string;

    @Column({ type: 'date' })
    eventDate: string;

    @Column({ type: 'time' })
    startTime: string;

    @Column({ type: 'time', nullable: true })
    endTime: string;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    totalPrice: string | Decimal;

    @Column({ type: 'text', array: true, default: [] })
    clothingRequirements: string[];

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: WeddingStatus,
        default: WeddingStatus.PLANNED,
    })
    status: WeddingStatus;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    totalAssignedPayout: string | Decimal;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    adminProfit: string | Decimal;

    @ForeignKey(() => User)
    @Column({ type: 'uuid' })
    createdById: string;

    @ManyToOne(() => User, (user) => user.createdWeddings, {
        onDelete: 'CASCADE',
    })
    createdBy: User;

    @OneToMany(() => WeddingAssignment, (assignment) => assignment.wedding, {
        cascade: true,
    })
    assignments: WeddingAssignment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}