import React, {useEffect, useState} from "react";
import CalendarEvent from "../../model/CalendarEvent";
import "./Calendar.scss";
import CalendarEventService from "../../network/CalendarEventService";
import EventEditor from "../EventEditor/EventEditor";

interface Props {
    eventService: CalendarEventService;
}

export default function Calendar(props: Props) {
    const [eventToEdit, setEventToEdit] = useState(null as CalendarEvent);
    const [eventList, setEventList] = useState([] as CalendarEvent[]);

    useEffect(loadEvents, [])

    return(
        <div className="calendar">
            <EventEditor onSave={saveEvent} initialValue={null} onCancel={null}/>
            {renderEntries()}
            {eventToEdit && <div>
                <EventEditor onSave={updateEvent} initialValue={eventToEdit} onCancel={() => setEventToEdit(null)}/>
                I edit event {eventToEdit.id}
            </div>}
            <div className="calendar__corner--left"></div>
            <div className="calendar__corner--right"></div>
        </div>
    );



    function renderEntries() {
        return <div className="calendar__grid">
            <div className="calendar__grid-header">Datum</div>
            <div className="calendar__grid-header">Bezeichnung</div>
            <div className="calendar__grid-header">Erinnerung</div>
            <div className="calendar__grid-header">Aktion</div>


            {eventList.map(el =>
                <React.Fragment key={el.id}>
                    <div className="date-column">
                        {el.day}.
                        {el.month}.
                    </div>
                    <div className="description-column">{el.description}</div>
                    <div className="reminder-column">{getTextForReminderCode(el.reminder)}</div>
                    <div className="buttons-column">
                        <button
                            className="app__light-button"
                            onClick={() => setEventToEdit(el)}
                            style={{marginRight: "16px"}}>
                            Bearbeiten
                        </button>
                        <button className="app__light-button" onClick={() => deleteEvent(el.id)}>Löschen</button>
                    </div>
                </React.Fragment>)
            }
        </div>;
    }

    function saveEvent(ce: CalendarEvent) {
        props.eventService
            .save(ce)
            .then(() => loadEvents())
            .catch(err => window.alert(err.message))
    }

    function updateEvent(ce: CalendarEvent) {
        props.eventService
            .update(ce)
            .then(() => loadEvents())
            .catch(err => window.alert(err.message))
    }

    function deleteEvent(eventId: string) {
        props.eventService
            .delete(eventId)
            .then(() => loadEvents())
            .catch(err => window.alert(err.message))
    }

    function loadEvents() {
        props.eventService
            .getAll()
            .then(events => setEventList(events))
            .catch(err => window.alert(err.message))
    }

    function getTextForReminderCode(code: string) : string {
        switch (code) {
            case "1d": return "1 Tag";
            case "2d": return "2 Tage";
            case "4d": return "4 Tage";
            case "1w": return "1 Woche";
            case "2w": return "2 Wochen";
            default: return "-";
        }
    }
}
