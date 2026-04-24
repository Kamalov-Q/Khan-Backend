import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { MembersService } from "./members.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enums/user-role.enum";
import { CreateTeamMemberDto } from "./dto/create-member.dto";
import { createPaginatedResponse, createResponse } from "src/common/utils/response.util";
import { UpdateTeamMemberDto } from "./dto/update-member.dto";


@ApiTags('Team members')
@Controller('members')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class MembersController {
    constructor(private membersService: MembersService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    async createMember(
        @Body() dto: CreateTeamMemberDto
    ) {
        const member = await this.membersService.createMember(dto);
        return createResponse(member, 'Team member created successfully!');
    }

    @Get()
    @Roles(UserRole.ADMIN)
    async getAllMembers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        const [members, total] = await this.membersService.getAllMembers(page, limit);

        return createPaginatedResponse(members, total, page, limit);
    }

    @Get(':id')
    @Roles(UserRole.ADMIN)
    async getMemberById(@Param('id') id: string) {
        const member = await this.membersService.findMemberById(id);
        return createResponse(member);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN)
    async updateMember(
        @Param('id') id: string,
        @Body() dto: UpdateTeamMemberDto
    ) {
        const member = await this.membersService.updateMember(id, dto);
        return createResponse(member, 'Member updated successfully!');
    }

    @Patch(':id/activate')
    @Roles(UserRole.ADMIN)
    async activateMember(@Param('id') id: string) {
        const member = await this.membersService.activateMember(id);
        return createResponse(member, 'Member activated successfully!');
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    async deactivateMember(@Param('id') id: string) {
        await this.membersService.deactivateMember(id);
        return createResponse({ id }, 'Team member deactivated!')
    }

}