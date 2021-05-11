import React, {FormEvent, useEffect, useState} from "react";
import "./EventEditor.scss"
import CalendarEvent from "../../model/CalendarEvent";


interface Props {
    initialValue: CalendarEvent;
    onSave(event: CalendarEvent) : void;
    onCancel() : void;
}

export default function EventEditor(props: Props) {
    const [day, setDay] = useState(props.initialValue?.day || "");
    const [month, setMonth] = useState(props.initialValue?.month || "");
    const [description, setDescription] = useState(props.initialValue?.description || "");
    const [reminder, setReminder] = useState(props.initialValue?.reminder || "1d");

    useEffect(() => {
        if (props.initialValue == null) return;
        setDay(props.initialValue.day)
        setMonth(props.initialValue.month)
        setDescription(props.initialValue.description)
        setReminder(props.initialValue.reminder)

    }, [props.initialValue])

    return(
        <form onSubmit={e => submit(e)} className="event-editor__form">
            <div className="event-editor__inputs-wrapper">
                <label className="event-editor__input-group">
                    <span className="event-editor__input-label">Datum (TT/MM)</span>
                    <input className="event-editor__date-input" value={day} onChange={e => setDay(e.target.value)}/>
                    <input className="event-editor__date-input" value={month} onChange={e => setMonth(e.target.value)}/>
                </label>

                <label className="event-editor__input-group">
                    <span className="event-editor__input-label">Bezeichnung</span>
                    <input value={description} onChange={e => setDescription(e.target.value)}/>
                </label>

                <label className="event-editor__input-group">
                    <span className="event-editor__input-label">Erinnerung</span>
                    <select value={reminder} onChange={e => setReminder(e.target.value)}>
                        <option value="1d">1 Tag</option>
                        <option value="2d">2 Tage</option>
                        <option value="4d">4 Tage</option>
                        <option value="1w">1 Woche</option>
                        <option value="2w">2 Wochen</option>
                    </select>
                </label>
            </div>

            <div className="event-editor__submit-wrapper">
                <button className="app__light-button">SPEICHERN</button>
                {props.onCancel && <button
                    className="app__light-button"
                    onClick={e => {e.stopPropagation(); props.onCancel();}}>
                    Abbrechen
                </button>}
            </div>
        </form>

    )

    function submit(e: FormEvent) {
        e.preventDefault();

        const id = props.initialValue?.id || Math.random().toString();

        const newEvent = new CalendarEvent(id, description, reminder, day, month);
        props.onSave(newEvent);
    }
}
