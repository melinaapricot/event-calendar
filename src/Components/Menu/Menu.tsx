import React from "react";
import "./menu.scss"


interface Props {
    currentUrl: string;
}

export default function Menu(props: Props) {
    return(
        <nav className="menu__navigation">
            <a className={"menu__navigation--link" + getCurrentUrlClass(props.currentUrl, "/article")} href="/article">Artikel</a>
            <a className={"menu__navigation--link" + getCurrentUrlClass(props.currentUrl, "/calendar")} href="/calendar">Kalender</a>
        </nav>
    )
}

function getCurrentUrlClass(currentUrl: string, targetUrl: string) {
    if (currentUrl === targetUrl) return " menu__navigation--current";
    else return "";
}
