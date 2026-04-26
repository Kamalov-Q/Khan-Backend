import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "src/common/enums/user-role.enum";
import { WeddingAssignment } from "src/modules/wedding-assignments/entities/wedding-assignment.entity";
import { Wedding } from "src/modules/weddings/entities/wedding.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('users')
export class User {
    @ApiProperty({ description: 'The unique identifier of the user', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
    @Column()
    fullName: string;

    @ApiProperty({ description: 'Email address of the user', example: 'john@example.com' })
    @Column({ unique: true })
    email: string;

    @ApiProperty({ description: 'Phone number of the user', example: '+998901234567', required: false })
    @Column({ unique: true, nullable: true })
    phoneNumber: string;

    @ApiProperty({ description: 'Hashed password of the user' })
    @Column()
    passwordHash: string;

    @ApiProperty({ description: 'Role of the user', enum: UserRole, default: UserRole.MEMBER })
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.MEMBER,
    })
    role: UserRole;

    @ApiProperty({ description: 'Position label (e.g. Doirachi)', required: false })
    @Column({ type: 'varchar', nullable: true })
    roleLabel?: string;

    @ApiProperty({ description: 'Whether the user is active', default: true })
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty({ description: 'Last login timestamp', required: false })
    @Column({ type: 'timestamp', nullable: true })
    lastLoginAt: Date;

    @ApiProperty({ description: 'Creation timestamp' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Update timestamp' })
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Wedding, (wedding) => wedding.createdBy)
    createdWeddings: Wedding[];

    @OneToMany(() => WeddingAssignment, (assignment) => assignment.teamMember)
    assignments: WeddingAssignment[];
}