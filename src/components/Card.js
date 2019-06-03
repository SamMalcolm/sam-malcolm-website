import React from 'react'

const Card = (props) => {

    const closeCard = (e) => {
        e.target.parentElement.classList.remove("ackActive");
        e.target.parentElement.setAttribute('aria-hidden', true);
        // e.target.childNodes[0].style.transform = "rotate(0)";
    }

    const openCard = (e) => {
        e.target.parentElement.classList.add("ackActive");
        e.target.parentElement.setAttribute('aria-hidden', false);
        // e.target.childNodes[0].style.transform = "rotate(180deg)";
    }

    const handleAckClick = (e) => {
        if (e.target.className == "childCardTrigger") {
            e.target = e.target.parentElement;
        }
        if (e.target.parentElement.className.split(" ").indexOf("ackActive") == -1) {
            openCard(e);
        } else {
            closeCard(e);
        }
    }


    return (
        <div className="ackContainer">
            <div className="ackTrigger" tabindex="0" onFocus={openCard} onClick={handleAckClick} aria-role="button">
                <img className="childCardTrigger" width="38" src={props.icon} />
            </div>
            {props.children}
        </div>
    )
}

export default Card

