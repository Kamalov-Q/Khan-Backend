
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ForeignKey,
    Unique,
} from 'typeorm';
import { AssignmentStatus } from '../../../common/enums/assignment-status.enum';
import { Wedding } from '../../weddings/entities/wedding.entity';
import { User } from '../../users/entities/user.entity';
import { Decimal } from 'decimal.js';

@Entity('wedding_assignments')
@Unique(['weddingId', 'teamMemberId'])
export class WeddingAssignment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ForeignKey(() => Wedding)
    @Column({ type: 'uuid' })
    weddingId: string;

    @ManyToOne(() => Wedding, (wedding) => wedding.assignments, {
        onDelete: 'CASCADE',
    })
    wedding: Wedding;

    @ForeignKey(() => User)
    @Column({ type: 'uuid' })
    teamMemberId: string;

    @ManyToOne(() => User, (user) => user.assignments, {
        onDelete: 'CASCADE',
    })
    teamMember: User;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    paymentAmount: string | Decimal;

    @Column({
        type: 'enum',
        enum: AssignmentStatus,
        default: AssignmentStatus.ASSIGNED,
    })
    assignmentStatus: AssignmentStatus;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}