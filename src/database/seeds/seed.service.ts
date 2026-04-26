import { Injectable, Logger } from "@nestjs/common";
import { UserRole } from "src/common/enums/user-role.enum";
import { MembersService } from "../../modules/members/members.service";
import { UsersService } from "../../modules/users/users.service";

@Injectable()
export class SeedService {
    private logger = new Logger('SeedService');

    constructor(
        private usersService: UsersService,
        private teamMembersService: MembersService
    ) { }

    async seed() {
        this.logger.log(`Starting seed ...`);

        try {
            // Create an Admin
            await this.createAdmin();

            // Create Team Members
            await this.createTeamMembers();

            this.logger.log('Seed completed successfully!');
        } catch (err) {
            this.logger.error('Failed to seed database', err);
            throw err;
        }

    }

    private async createAdmin() {
        try {
            const admin = await this.usersService.findOneByEmail('admin@wedding.com');
            if (admin) {
                this.logger.log(`Admin user already exists`);
                return;
            }
            await this.usersService.createUser({
                fullName: `Sunnatov G'olibxon`,
                email: 'admin@wedding.com',
                password: 'AdminPassword123',
                role: UserRole.ADMIN
            });

            this.logger.log(`Admin user successfully seeded!`);
        } catch (error) {
            this.logger.error(`Failed to seed admin user`, error);
        }
    }

    private async createTeamMembers() {
        const teamMembers = [
            {
                fullName: 'User1',
                email: 'user1@gmail.com',
                phoneNumber: '+998901234567',
                roleLabel: 'Doirachi',
                password: 'UserPassword123'
            },
            {
                fullName: 'User2',
                email: 'user2@gmail.com',
                phoneNumber: '+998901234568',
                roleLabel: 'Surnaychi',
                password: 'UserPassword123'
            },
            {
                fullName: 'User3',
                email: 'user3@gmail.com',
                phoneNumber: '+998901234569',
                roleLabel: 'Karnaychi',
                password: 'UserPassword123'
            },
            {
                fullName: 'User4',
                email: 'user4@gmail.com',
                phoneNumber: '+998901234570',
                roleLabel: 'Jarchi',
                password: 'UserPassword123'
            },
            {
                fullName: 'User5',
                email: 'user5@gmail.com',
                phoneNumber: '+998901234571',
                roleLabel: 'Naychi',
                password: 'UserPassword123'
            },
        ]

        for (const member of teamMembers) {
            try {
                const existing = await this.usersService.findOneByEmail(member.email);
                if (existing) {
                    this.logger.log(`${member.roleLabel} already exists`);
                    continue;
                }

                await this.teamMembersService.createMember(member);
                this.logger.log(`${member.roleLabel} created!`);

            } catch (error) {
                this.logger.error(`Failed to seed ${member.roleLabel} user`, error);
            }
        }
    }

}