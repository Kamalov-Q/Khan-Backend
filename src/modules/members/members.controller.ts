import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { MembersService } from "./members.service";
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enums/user-role.enum";
import { CreateTeamMemberDto } from "./dto/create-member.dto";
import { createPaginatedResponse, createResponse } from "src/common/utils/response.util";
import { UpdateTeamMemberDto } from "./dto/update-member.dto";
import { TeamMemberResponseDto } from "./dto/member-response.dto";

@ApiTags('Team members')
@Controller('members')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class MembersController {
    constructor(private membersService: MembersService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Create a new team member (Admin only)' })
    @ApiResponse({ status: 201, description: 'Team member created successfully', type: TeamMemberResponseDto })
    async createMember(
        @Body() dto: CreateTeamMemberDto
    ) {
        const member = await this.membersService.createMember(dto);
        return createResponse(member, 'Team member created successfully!');
    }

    @Get()
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get all team members with pagination (Admin only)' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Members retrieved successfully' })
    async getAllMembers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        const [members, total] = await this.membersService.getAllMembers(page, limit);
        return createPaginatedResponse(members, total, page, limit);
    }

    @Get(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get team member details by id (Admin only)' })
    @ApiResponse({ status: 200, description: 'Member found', type: TeamMemberResponseDto })
    @ApiResponse({ status: 404, description: 'Member not found' })
    async getMemberById(@Param('id') id: string) {
        const member = await this.membersService.findMemberById(id);
        return createResponse(member);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update team member information (Admin only)' })
    @ApiResponse({ status: 200, description: 'Member updated successfully', type: TeamMemberResponseDto })
    @ApiResponse({ status: 404, description: 'Member not found' })
    async updateMember(
        @Param('id') id: string,
        @Body() dto: UpdateTeamMemberDto
    ) {
        const member = await this.membersService.updateMember(id, dto);
        return createResponse(member, 'Member updated successfully!');
    }

    @Patch(':id/activate')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Activate a team member (Admin only)' })
    @ApiResponse({ status: 200, description: 'Member activated successfully' })
    async activateMember(@Param('id') id: string) {
        const member = await this.membersService.activateMember(id);
        return createResponse(member, 'Member activated successfully!');
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Deactivate a team member (Admin only)' })
    @ApiResponse({ status: 200, description: 'Team member deactivated successfully' })
    async deactivateMember(@Param('id') id: string) {
        await this.membersService.deactivateMember(id);
        return createResponse({ id }, 'Team member deactivated!')
    }
}