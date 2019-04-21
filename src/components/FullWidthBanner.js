import React from 'react'

function FullWidthBanner(props) {
    return (
        <div className="smm_fullWidthContainer" style={{ 'backgroundImage': 'url(\'' + props.src + '\')', "backgroundPosition": props.backgroundPosition }}>
            <div className="smm_fullWidthBanner">
                <h1>{props.title}</h1>
                <div className="bannerCover"></div>
            </div>
        </div >
    )
}

export default FullWidthBanner

