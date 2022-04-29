import './css/normalize.css';
import './css/bootstrap.min.css';
import './css/mdb.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home"
import Certificate from './Certificate';

function Navbar() {
    // hamburger button handler
    let [isNavOpen, setIsNavOpen] = useState(false);
    let navButtonHandler = () => setIsNavOpen(!isNavOpen);

    //route handler
    let [isHome, setIsHome] = useState(true);
    let [isCertificate, setIsCertificate] = useState(false);
    let [isPortfolio, setIsPortfolio] = useState(false);
    let [isContactInfo, setIsContactInfo] = useState(false);
    let navigate = useNavigate();
    let navButtonClickHandler = (event) => {
        if (event.target.id === "home_link") {
            setIsHome(true);
            setIsCertificate(false);
            navigate(process.env.PUBLIC_URL);
        }
        else if (event.target.id === "certificate_link") {
            setIsCertificate(true);
            setIsHome(false);
            setIsPortfolio(false);
            navigate("certificate");
        }
    }

    //const navigate = useNavigate();
    // fetch("https://ipinfo.io", {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     }
    // }).then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         if (data.status !== 429) {
    //             document.getElementById("location").innerText = data.country;
    //         } else {
    //             document.getElementById("location").innerText = 'TW';
    //         }
    //     });

    useEffect(() => {
        async function scrollToPortfolio() {
            if (!/certificate/.test(window.location.href)) {
                window.scroll({
                    top: document.getElementById("works_area").getBoundingClientRect().y - 85,
                    behavior: 'smooth'
                });
            } else {
                document.getElementById("home_link").click();
                await new Promise(r => setTimeout(r, 200));
                scrollToPortfolio();
            }
        }

        const onScroll = () => {
            if (!/certificate/.test(window.location.href)) {
                if (document.getElementById("works_area").getBoundingClientRect().y < 100) {
                    setIsPortfolio(true);
                } else {
                    setIsPortfolio(false);
                }
            }
            if (document.getElementById("foot").getBoundingClientRect().y < window.innerHeight * 0.9) {
                setIsContactInfo(true);
            } else {
                setIsContactInfo(false);
            }
        }
        document.getElementById('portfolio_link').addEventListener("click", scrollToPortfolio);
        window.addEventListener("scroll", onScroll);

        return () => {
            document.getElementById('portfolio_link').removeEventListener("click", scrollToPortfolio);
            window.removeEventListener("scroll", onScroll);
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-color fixed-top">
            <button className="navbar-toggler third-button" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation" onClick={navButtonHandler}>
                <div className={isNavOpen ? "animated-icon2 open" : "animated-icon3"}><span></span><span></span><span></span></div>
            </button>

            <a className="navbar-brand" href={process.env.PUBLIC_URL}><img src={process.env.PUBLIC_URL + "/img/nav_logo.png"} alt="logo" /></a>

            {/* <!--網頁選單--> */}
            <div className={isNavOpen ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarSupportedContent">
                <div className="container">
                    <div className="row">
                        {/* <!--top icon--> */}
                        <div className="col navbar-nav nav-icon justify-content-end">
                            <div className="row">
                                <img className="col" src={process.env.PUBLIC_URL + "/img/icon_where.png"} alt="location" />
                                <p id="location" className="col text-center">TW</p>
                            </div>
                        </div>
                        <div className="w-100"></div>
                        {/* <!--導航選單--> */}
                        <ul className="col navbar-nav ml-auto justify-content-end">
                            <li className="nav-item">
                                <button id="home_link" className={"nav-link" + (isHome ? ' nav_clicked' : '')} onClick={navButtonClickHandler}>首頁</button>
                            </li>
                            <li className="nav-item">
                                <button id="portfolio_link" className={"nav-link" + (isPortfolio ? ' nav_clicked' : '')}>作品集</button>
                            </li>
                            <li className="nav-item">
                                <button id="certificate_link" className={"nav-link" + (isCertificate ? ' nav_clicked' : '')} onClick={navButtonClickHandler}>證書集</button>
                            </li>
                            <li className="nav-item">
                                <a id="contact_link" className={"nav-link" + (isContactInfo ? ' nav_clicked' : '')} href="#foot">聯絡方式</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function Footer() {

    useEffect(() => {
        function DrawFooterLine(event) {
            let canvas = document.getElementById('line');
            let ctx = canvas.getContext("2d");

            canvas.height = 150;
            canvas.width = 300;

            if (window.innerWidth >= 990) {   // draw vertical line in computer webside
                ctx.beginPath()
                ctx.moveTo(300, 40)
                ctx.lineTo(300, 110)
            }
            else if (window.innerWidth >= 768) {   // draw vertical line in tab webside
                ctx.beginPath()
                ctx.moveTo(280, 40)
                ctx.lineTo(280, 110)
            }
            else {   //draw horizontal line in phone website
                canvas.height = 15;
                ctx.beginPath()
                ctx.moveTo(30, 1)
                ctx.lineTo(260, 1)
            }
            ctx.strokeStyle = "white"
            ctx.stroke()

        };
        DrawFooterLine();
        window.addEventListener("resize", DrawFooterLine);

        return () => window.removeEventListener("resize", DrawFooterLine);
    }, []);

    return (
        <footer id="foot">
            <div className="row foot-bg align-items-center">
                <div className="col-md-3">
                    <div className="row justify-content-center">
                        <img id="foot_logo" src={process.env.PUBLIC_URL + "/img/nav_logo.png"} alt="foot logo"/>
                    </div>
                </div>
                <canvas id="line"></canvas>

                <div className="col-md-9 table_foot_section">
                    <div className="row">
                        <div className="col-6 row">
                            <h2 className="col-md-6">認識我</h2>
                            <ul className="col-md-6">
                                <li><a href="https://www.facebook.com/weibin1898/" target="_blank" rel="noreferrer">Facebook</a></li>
                                <li><a href="https://www.instagram.com/wei_bin/" target="_blank" rel="noreferrer">Instagram</a></li>
                                <li><a href="https://github.com/HengWeiBin" target="_blank" rel="noreferrer">Github</a></li>
                                <li><a href={process.env.PUBLIC_URL + "/104.pdf"} target="_blank" rel="noreferrer">104 履歷</a></li>
                            </ul>
                        </div>
                        <div className="col-6 row align-items-center">
                            <h2 className="col-md-6">聯係我</h2>
                            <ul className="col-md-6">
                                <li><a href="mailto:wbsc1898@hotmail.com">wbsc1898@hotmail.com</a></li>
                                <li id="Tel">Tel: (+886)0916180245</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <p className="col-4 col-md-3">
                Copyright 2022. All rights reserved.
            </p>
        </footer>
    )
}

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path={process.env.PUBLIC_URL} element={
                        <>
                            <Navbar />
                            <Home />
                        </>
                    }></Route>
                    <Route exact path={process.env.PUBLIC_URL + '/certificate'} element={
                        <>
                            <Navbar />
                            <Certificate />
                        </>
                    }></Route>
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    );
}