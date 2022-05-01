import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';

function Offset50px() {
    return (
        <div className="row offset50px"></div>
    );
}

function Certificates() {
    let data = require("./json/certificates.json");
    let sortedData = data.sort((a, b) => Date.parse(a.date) > Date.parse(b.date) ? -1 : 1);
    sortedData = sortedData.filter((item) => item.title !== "null");

    let [isMobile, setIsMobile] = useState(true);

    const mobileComponent = () => (
        <>
            {
                sortedData.map((item, index) => (
                    <div key={index} id="certificate">
                        <img className="d-block w-100" src={process.env.PUBLIC_URL + '/' + item.image_dir} alt={item.title} loading="lazy" />
                        <h1 className="title_certificate">${item.title}</h1>
                        <hr />
                        <p className="item_description">${item.date}</p>
                    </div>
                )
                )
            }
        </>
    )

    const desktopComponent = () => (
        <>
            {
                sortedData.map((item, index) => (
                    <div key={index} id="certificate" className="wow slideInUp">
                        <img className="d-block w-100 hover_scale" src={process.env.PUBLIC_URL + '/' + item.image_dir} alt={item.title} loading="lazy" />
                        <h1 className="title_certificate">{item.title}</h1>
                        <hr />
                        <p className="item_description">{item.date}</p>
                    </div>
                )
                )
            }
        </>
    )

    useEffect(() => {
        function updateResize() {
            if (window.innerWidth < 768)
                setIsMobile(true);
            else setIsMobile(false);
        }
        updateResize();
        window.addEventListener("resize", updateResize);

        return window.removeEventListener("resize", updateResize);
    }, [])

    return (
        isMobile ? (
            <div id="certificates" className="grid">
                {mobileComponent()}
            </div>
        ) : (
            <div id="certificates" className="grid">
                {desktopComponent()}
            </div>
        )
    );
}

export default function Certificate() {
    return (
        <>
            <Offset50px />
            <Certificates />
        </>
    )
}