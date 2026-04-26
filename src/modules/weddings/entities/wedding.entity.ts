import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { WeddingStatus } from '../../../common/enums/wedding-status.enum';
import { User } from '../../users/entities/user.entity';
import { Decimal } from 'decimal.js';
import { WeddingAssignment } from 'src/modules/wedding-assignments/entities/wedding-assignment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('weddings')
export class Wedding {
    @ApiProperty({ description: 'The unique identifier of the wedding', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Title or name of the wedding', example: 'Wedding of John & Jane' })
    @Column()
    title: string;

    @ApiProperty({ description: 'Name of the venue', example: 'Grand Ballroom' })
    @Column()
    venueName: string;

    @ApiProperty({ description: 'Date of the event', example: '2026-06-15' })
    @Column({ type: 'date' })
    eventDate: string;

    @ApiProperty({ description: 'Start time of the event', example: '18:00:00' })
    @Column({ type: 'time' })
    startTime: string;

    @ApiProperty({ description: 'End time of the event', example: '23:59:00', required: false })
    @Column({ type: 'time', nullable: true })
    endTime: string;

    @ApiProperty({ description: 'Total price charged for the wedding', example: '15000000.00' })
    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    totalPrice: string | Decimal;

    @ApiProperty({ description: 'Specific clothing requirements', example: ['Suit', 'White shirt'] })
    @Column({ type: 'text', array: true, default: [] })
    clothingRequirements: string[];

    @ApiProperty({ description: 'Additional description or notes', required: false })
    @Column({ type: 'text', nullable: true })
    description: string;

    @ApiProperty({ description: 'Status of the wedding', enum: WeddingStatus, default: WeddingStatus.PLANNED })
    @Column({
        type: 'enum',
        enum: WeddingStatus,
        default: WeddingStatus.PLANNED,
    })
    status: WeddingStatus;

    @ApiProperty({ description: 'Total amount assigned to be paid to team members', example: '8000000.00' })
    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    totalAssignedPayout: string | Decimal;

    @ApiProperty({ description: 'Projected profit for admin', example: '7000000.00' })
    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    adminProfit: string | Decimal;

    @ApiProperty({ description: 'ID of the user who created the record' })
    @Column({ type: 'uuid' })
    createdById: string;

    @ManyToOne(() => User, (user) => user.createdWeddings, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'createdById' })
    createdBy: User;

    @OneToMany(() => WeddingAssignment, (assignment) => assignment.wedding, {
        cascade: true,
    })
    assignments: WeddingAssignment[];

    @ApiProperty({ description: 'Creation timestamp' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Update timestamp' })
    @UpdateDateColumn()
    updatedAt: Date;
}