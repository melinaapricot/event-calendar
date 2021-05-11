import CalendarEventService from "./CalendarEventService";
import CalendarEvent from "../model/CalendarEvent";


export default class DummyCalendarEventService implements CalendarEventService {
    private events: CalendarEvent[] = this.loadFromLocalStorage();

    getAll(): Promise<CalendarEvent[]> {
        return Promise.resolve(this.events.slice());
    }


    delete(eventId: string): Promise<void> {
        const indexToRemove = this.events.findIndex(el => el.id === eventId);
        if (indexToRemove === -1) {
            return Promise.reject(new Error(`Id ${eventId} not found`))
        } else {
            this.events.splice(indexToRemove, 1);
            this.saveToLocalStorage(this.events);
            return Promise.resolve();
        }
    }

    save(event: CalendarEvent): Promise<void> {
        const eventWithSameId = this.events.find(el => el.id === event.id);
        if (eventWithSameId != null) {
            return Promise.reject(new Error(`Id ${event.id} already exists`))
        } else {
            this.events.push(event);
            this.saveToLocalStorage(this.events);
            return Promise.resolve();
        }
    }

    update(event: CalendarEvent): Promise<void> {
        const indexToUpdate = this.events.findIndex(el => el.id === event.id);
        if (indexToUpdate === -1) {
            return Promise.reject(new Error(`id ${event.id} not found`));
        } else {
            this.events[indexToUpdate] = event;
            this.saveToLocalStorage(this.events);
            return Promise.resolve();
        }
    }

    private saveToLocalStorage(data: CalendarEvent[]) : void {
        const serializedData = JSON.stringify(data);
        window.localStorage.setItem("CALENDAR_EVENT_DATA", serializedData);
    }

    private loadFromLocalStorage() : CalendarEvent[] {
        const data = window.localStorage.getItem("CALENDAR_EVENT_DATA") || "[]";
        return JSON.parse(data);
    }
}
