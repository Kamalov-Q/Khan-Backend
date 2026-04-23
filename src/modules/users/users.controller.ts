import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Delete,
    Param,
    Query,
    UseGuards,
    Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { createPaginatedResponse, createResponse } from 'src/common/utils/response.util';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.createUser(createUserDto);
        return createResponse(user, 'User created successfully');
    }

    @Get()
    @Roles(UserRole.ADMIN)
    async getAllUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        const [users, total] = await this.usersService.getAllUsers(page, limit);
        return createPaginatedResponse(users, total, page, limit);
    }

    @Get(':id')
    @Roles(UserRole.ADMIN)
    async getUser(@Param('id') id: string) {
        const user = await this.usersService.findById(id);
        return createResponse(user);
    }

    @Get('me')
    @Roles(UserRole.ADMIN, UserRole.MEMBER)
    async getMe(@Req() req: any) {
        const user = await this.usersService.findById(req.user.userId);
        return createResponse(user);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN)
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const user = await this.usersService.updateUser(id, updateUserDto);
        return createResponse(user, 'User updated successfully');
    }

    @Patch(':id/status')
    @Roles(UserRole.ADMIN)
    async toggleUserStatus(
        @Param('id') id: string,
        @Query('active') active: boolean,
    ) {
        const user = await this.usersService.toggleUserStatus(id, active);
        return createResponse(user, 'User status updated');
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    async deleteUser(@Param('id') id: string) {
        await this.usersService.toggleUserStatus(id, false);
        return createResponse({ id }, 'User deactivated');
    }
}