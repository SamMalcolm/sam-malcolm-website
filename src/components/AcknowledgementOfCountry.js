import React from 'react'

const AcknowledgementOfCountry = (props) => {

    const handleAckClick = (e) => {
        if (e.target.parentElement.className.split(" ").indexOf("ackActive") == -1) {
            e.target.parentElement.classList.add("ackActive");
            e.target.parentElement.setAttribute('aria-hidden', false);
        } else {
            e.target.parentElement.classList.remove("ackActive");
            e.target.parentElement.setAttribute('aria-hidden', true);
        }
    }

    const handleFocusEnter = (e) => {
        if (e.target.parentElement.className.split(" ").indexOf("ackActive") == -1) {
            e.target.parentElement.classList.add("ackActive");
            e.target.parentElement.setAttribute('aria-hidden', false);
        }
    }
    const handleFocusLeave = (e) => {
        if (!e.target.parentElement.className.split(" ").indexOf("ackActive") == -1) {
            e.target.parentElement.classList.remove("ackActive");
            e.target.parentElement.setAttribute('aria-hidden', true);
        }
    }

    return (
        <div className="ackContainer">
            <div className="ackTrigger" tabindex="0" onFocus={handleAckClick} onBlur={handleFocusLeave} onClick={handleAckClick} aria-role="button">&laquo;</div>
            <div className="ackImage">
                <img src="/assets/ui_images/ack.png" />
            </div>
            <div className="ackText">
                <h3>Acknowledgement Of Country</h3>
                <p>I would like to acknowledge the traditional owners of the land on which I conduct the business of being a developer and designer. I would like to pay my respect to their elders past, present and future.</p>
                <p>If you would like to learn more about indigenous culture please click <a href="#">here</a></p>
            </div>

        </div>
    )
}

export default AcknowledgementOfCountry

