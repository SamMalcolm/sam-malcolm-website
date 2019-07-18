import React from 'react';

const About = () => {
    return (
        <div className="bio_container">
            <div className="bio_img">
                <div className="avatar">
                    <img src="/assets/profile/headshot.jpg" />
                </div>
            </div>
            <div className="bio_body">
                <h1>SAM MALCOLM</h1>
                <p>My Name is Sam Malcolm and I am a multi-disciplinary digital media designer from Melbourne, Australia. </p>
                <p>I currently work at RMIT University in the central Learning and Teaching Design team focusing on improving the student and teacher experience. This role has involved me conducting photography and videography of high stakes clients including former Prime-Minister Julia Gillard and the Deputy Vice-Chancellor. The role has also involved building enterprise scale web applications to enable more efficient processes.</p>
                <p>My focus areas are photo/video and full stack web programming, but I also have a vested interest in 3D modelling, music production and composition and motion graphics. Under the <i>works</i> section of this site I have some examples of my work in these areas. Under the <i>music</i> section there are examples of some of my own originally composed and performed music.</p>
                <p>In my spare time I love walking and playing with my dogs, watching films, playing boardgames and playing competitive snooker and billiards. </p>
                <p>I love learning new things and expanding my skill set. I usually spend my train trips committing an inordinate amount of time to Lynda.com, which has held me in good stead for my career.</p>
                <p>If you want to collaborate on a project, have a chat about film, or organise a game of snooker feel free to engage with me on social media or you can use the contact form on this site. I look foward to hearing from you.</p>
                <p>Thanks!</p>
                <div className="sig">
                    <img src="/assets/profile/Sig.png" />
                </div>
            </div>
            <div className="divider"></div>
            <h3>SKILLS</h3>
            <div className="bottomSection">
                <div className="frameworks">
                    <h4>Frameworks</h4>
                    <ul>
                        <li>PHP</li>
                        <li>JavaScript</li>
                        <li>CSS</li>
                        <li>HTML</li>
                        <li>NodeJS</li>
                        <li>React</li>
                        <li>MySQL</li>
                        <li>MongoDB</li>
                        <li>Oracle</li>
                        <li>Docker</li>
                        <li>Linux</li>
                        <li>Apache</li>
                    </ul>
                </div>
                <div className="cert">
                    <h4>Education</h4>
                    <ul>
                        <li>2016: Bachelor of Design (Digital Media) With Distinction</li>
                        <li>2013: Certificate III in Interactive Digital Media</li>
                        <li>2012: Certificate II in Information Technology</li>
                    </ul>
                    <h4>Lynda:</h4>
                    <ul>
                        <li>Learning Paths:
                        <ul>
                                <li>Become a MERN stack developer</li>
                            </ul>
                        </li>
                        <li>Certificates:
                        <ul>
                                <li>JavaScript Essential Training</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About;

