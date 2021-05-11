import CalendarEvent from "../model/CalendarEvent";

export default interface CalendarEventService {
    getAll() : Promise<CalendarEvent[]>;
    save(event: CalendarEvent) : Promise<void>;
    update(event: CalendarEvent) : Promise<void>;
    delete(eventId: string) : Promise<void>;
}


