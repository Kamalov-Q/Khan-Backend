import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { WeddingAssignmentsService } from "./wedding-assignments.service";
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enums/user-role.enum";
import { AssignTeamMembersDto } from "./dto/assign-team-members.dto";
import { createResponse } from "src/common/utils/response.util";
import { UpdateWeddingAssignmentDto } from "./dto/update-assignment.dto";
import { AssignmentResponseDto } from "./dto/assignment-response.dto";

@ApiTags('Wedding Assignments')
@Controller('wedding-assignments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class WeddingAssignmentsController {
    constructor(private readonly assignmentsService: WeddingAssignmentsService) { }

    @Post('wedding/:weddingId/assignments')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Assign team members to a wedding (Admin only)' })
    @ApiResponse({ status: 201, description: 'Assignments created successfully', type: [AssignmentResponseDto] })
    async assignTeamMembers(@Param('weddingId') weddingId: string, @Body() dto: AssignTeamMembersDto) {
        const assignments = await this.assignmentsService.assignTeamMembers(weddingId, dto);
        return createResponse(assignments, 'Assignments created successfully!');
    }

    @Get('weddings/:weddingId/assignments')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get all assignments for a specific wedding (Admin only)' })
    @ApiResponse({ status: 200, description: 'Assignments retrieved successfully', type: [AssignmentResponseDto] })
    async getWeddingAssignments(@Param('weddingId') weddingId: string) {
        const assignments = await this.assignmentsService.findAssignmentsByWedding(weddingId);
        return createResponse(assignments);
    }

    @Get(':assignmentId')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get assignment details by id (Admin only)' })
    @ApiResponse({ status: 200, description: 'Assignment found', type: AssignmentResponseDto })
    @ApiResponse({ status: 404, description: 'Assignment not found' })
    async getAssignment(@Param('assignmentId') assignmentId: string) {
        const assignment = await this.assignmentsService.findAssigmentById(assignmentId);
        return createResponse(assignment);
    }

    @Patch(':assignmentId')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update assignment details (Admin only)' })
    @ApiResponse({ status: 200, description: 'Assignment updated successfully', type: AssignmentResponseDto })
    @ApiResponse({ status: 404, description: 'Assignment not found' })
    async updateAssignment(@Param('assignmentId') assignmentId: string, @Body() dto: UpdateWeddingAssignmentDto) {
        const assignment = await this.assignmentsService.updateAssignment(assignmentId, dto);
        return createResponse(assignment, 'Assignment updated successfully!');
    }

    @Delete(':assignmentId')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Remove an assignment (Admin only)' })
    @ApiResponse({ status: 200, description: 'Assignment deleted successfully' })
    @ApiResponse({ status: 404, description: 'Assignment not found' })
    async removeAssignment(@Param('assignmentId') assignmentId: string) {
        await this.assignmentsService.removeAssignment(assignmentId);
        return createResponse({ id: assignmentId }, 'Assignment deleted successfully!');
    }
}