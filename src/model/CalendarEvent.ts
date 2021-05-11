
export default class CalendarEvent {
    constructor(
        public id: string,
        public description: string,
        public reminder: string,
        public day: string,
        public month: string
    ) {}
}

