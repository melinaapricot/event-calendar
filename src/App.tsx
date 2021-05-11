import React, {useState} from "react";
import './Styles/App.scss';
import Calendar from "./Components/Calendar/Calendar";
import Article from "./Components/Article/Article";
import Menu from "./Components/Menu/Menu";
import Header from "./Components/Header/Header";
import DummyCalendarEventService from "./network/DummyCalendarEventService";



function App() {

    const [eventService, setEventService] = useState(() => new DummyCalendarEventService());


    const url = window.location.pathname.toLowerCase();
     return (
         <main className="app__main">
            <Header/>
            <section className="app__main--central">
                <div className="app__overlay" />
                <Menu currentUrl={url}/>
                {renderPageContent(url)}
                <div className="app__main--right"/>
            </section>
         </main>
     );

    function renderPageContent(path: string) {
        switch (path) {
            case  "/":
            case "/home":
            case "":
            case "/article":
                return <Article/>;
            case "/calendar":
                return <Calendar eventService={eventService}/>
            default:
                return <div><h1>Page not found: "{window.location.pathname}"</h1></div>
        }
    }
}


export default App;
