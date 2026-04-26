import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
} from 'typeorm';
import { AssignmentStatus } from '../../../common/enums/assignment-status.enum';
import { Wedding } from '../../weddings/entities/wedding.entity';
import { User } from '../../users/entities/user.entity';
import { Decimal } from 'decimal.js';
import { ApiProperty } from '@nestjs/swagger';

@Entity('wedding_assignments')
@Unique(['weddingId', 'teamMemberId'])
export class WeddingAssignment {
    @ApiProperty({ description: 'The unique identifier of the assignment', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'The ID of the wedding', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @Column({ type: 'uuid' })
    weddingId: string;

    @ManyToOne(() => Wedding, (wedding) => wedding.assignments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'weddingId' })
    wedding: Wedding;

    @ApiProperty({ description: 'The ID of the team member', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @Column({ type: 'uuid' })
    teamMemberId: string;

    @ManyToOne(() => User, (user) => user.assignments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'teamMemberId' })
    teamMember: User;

    @ApiProperty({ description: 'Payment amount for this assignment', example: '500000.00' })
    @Column({ type: 'decimal', precision: 12, scale: 2 })
    paymentAmount: string | Decimal;

    @ApiProperty({ description: 'Status of the assignment', enum: AssignmentStatus, default: AssignmentStatus.ASSIGNED })
    @Column({
        type: 'enum',
        enum: AssignmentStatus,
        default: AssignmentStatus.ASSIGNED,
    })
    assignmentStatus: AssignmentStatus;

    @ApiProperty({ description: 'Additional notes for the assignment', required: false, example: 'Need to bring equipment' })
    @Column({ type: 'text', nullable: true })
    notes: string;

    @ApiProperty({ description: 'Creation timestamp' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Update timestamp' })
    @UpdateDateColumn()
    updatedAt: Date;
}