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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { createPaginatedResponse, createResponse } from 'src/common/utils/response.util';
import { UserResponseDto } from './dto/user-response.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Create a new user (Admin only)' })
    @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 409, description: 'Email or phone number already exists' })
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.createUser(createUserDto);
        return createResponse(user, 'User created successfully');
    }

    @Get()
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get all users with pagination (Admin only)' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
    async getAllUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        const [users, total] = await this.usersService.getAllUsers(page, limit);
        return createPaginatedResponse(users, total, page, limit);
    }

    @Get('me')
    @Roles(UserRole.ADMIN, UserRole.MEMBER)
    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({ status: 200, description: 'Profile retrieved successfully', type: UserResponseDto })
    async getMe(@CurrentUser() user: User) {
        return createResponse(user);
    }

    @Get(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get user by id (Admin only)' })
    @ApiResponse({ status: 200, description: 'User found', type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getUser(@Param('id') id: string) {
        const user = await this.usersService.findById(id);
        return createResponse(user);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update user profile (Admin only)' })
    @ApiResponse({ status: 200, description: 'User updated successfully', type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const user = await this.usersService.updateUser(id, updateUserDto);
        return createResponse(user, 'User updated successfully');
    }

    @Patch(':id/status')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Toggle user active status (Admin only)' })
    @ApiQuery({ name: 'active', type: Boolean })
    @ApiResponse({ status: 200, description: 'Status updated successfully' })
    async toggleUserStatus(
        @Param('id') id: string,
        @Query('active') active: boolean,
    ) {
        const user = await this.usersService.toggleUserStatus(id, active);
        return createResponse(user, 'User status updated');
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Deactivate user (Admin only)' })
    @ApiResponse({ status: 200, description: 'User deactivated' })
    async deleteUser(@Param('id') id: string) {
        await this.usersService.toggleUserStatus(id, false);
        return createResponse({ id }, 'User deactivated');
    }
}