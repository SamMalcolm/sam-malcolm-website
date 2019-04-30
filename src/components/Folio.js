import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';

const axios = require('axios');
const Work = (props) => {
    return (
        <Link to={"/work/" + props._id}>
            <div className="work">
                <div className="workCover" style={{ 'backgroundImage': 'url(\'' + props.thumb_src + '\')' }} ></div>
                <div className="workText">
                    <h3>{props.name}</h3>
                    <p>{props.description}</p>
                </div>
            </div>
        </Link>
    )
}

const Folio = () => {
    const [works, setWorks] = useState([]);
    useEffect(() => {
        axios.get('/api/works').then((resp) => {
            setWorks(resp.data);
        });

    }, [])
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

