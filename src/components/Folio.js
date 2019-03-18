import React, { useState, useEffect } from 'react'
const axios = require('axios');
const Work = (props) => {
    return (
        <div className="work">
            <div className="workCover" style={{ 'backgroundImage': 'url(\'' + props.background_image + '\')' }} ></div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    )
}

const Folio = () => {
    const [works, setWorks] = useState([]);
    useEffect(() => {
        axios.get('/api/works').then((res) => {
            setWorks(res);
        });

    })
    return (
        <div className="folioContainer">
            {works.map((work) => {
                return (
                    <Work {...work} />
                )
            })}
        </div>
    )
}


export default Folio

