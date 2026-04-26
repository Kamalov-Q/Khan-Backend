
export interface WeddingCreatedEvent {
    weddingId: string;
    title: string;
    eventDate: string;
}

export interface WeddingUpdatedEvent {
    weddingId: string;
    updates: Record<string, any>;
}

export interface AssignmentAddedEvent {
    assignmentId: string;
    weddingId: string;
    teamMemberId: string;
    paymentAmount: number;
}

export interface AssignmentUpdatedEvent {
    assignmentId: string;
    weddingId: string;
    teamMemberId: string;
    updates: Record<string, any>;
}

export interface AssignmentRemovedEvent {
    assignmentId: string;
    weddingId: string;
    teamMemberId: string;
}

export interface CalendarUpdatedEvent {
    weddingId: string;
    changes: string;
}