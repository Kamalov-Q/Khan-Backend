import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { WeddingAssignmentsService } from "./wedding-assignments.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enums/user-role.enum";
import { AssignTeamMembersDto } from "./dto/assign-team-members.dto";
import { createResponse } from "src/common/utils/response.util";
import { UpdateWeddingAssignmentDto } from "./dto/update-assignment.dto";


@ApiTags('Wedding Assignments')
@Controller('wedding-assignments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class WeddingAssignmentsController {
    constructor(private readonly assignmentsService: WeddingAssignmentsService) { }

    @Post('wedding/:weddingId/assignments')
    @Roles(UserRole.ADMIN)
    async assignTeamMembers(@Param('weddingId') weddingId: string, @Body() dto: AssignTeamMembersDto) {
        const assignments = await this.assignmentsService.assignTeamMembers(weddingId, dto);
        return createResponse(assignments, 'Assignments created successfully!');
    }

    @Get('weddings/:weddingId/assignments')
    @Roles(UserRole.ADMIN)
    async getWeddingAssignments(@Param('weddingId') weddingId: string) {
        const assignments = await this.assignmentsService.findAssignmentsByWedding(weddingId);
        return createResponse(assignments);
    }

    @Get(':assignmentId')
    @Roles(UserRole.ADMIN)
    async getAssignment(@Param('assignmentId') assignmentId: string) {
        const assignment = await this.assignmentsService.findAssigmentById(assignmentId);
        return createResponse(assignment);
    }

    @Patch(':assignmentId')
    @Roles(UserRole.ADMIN)
    async updateAssignment(@Param('assignmentId') assignmentId: string, @Body() dto: UpdateWeddingAssignmentDto) {
        const assignment = await this.assignmentsService.updateAssignment(assignmentId, dto);
        return createResponse(assignment, 'Assignment updated successfully!');
    }

    @Delete(':assignmentId')
    @Roles(UserRole.ADMIN)
    async removeAssignment(@Param('assignmentId') assignmentId: string) {
        await this.assignmentsService.removeAssignment(assignmentId);
        return createResponse({ id: assignmentId }, 'Assignment deleted successfully!');
    }
}