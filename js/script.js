"use strict";
let deviceWidth = document.documentElement.clientWidth;

$(document).ready(main);

//handle activity when browser resize
window.onresize = function () {
    deviceWidth = document.documentElement.clientWidth; //update deviceWidth
    main();
};
window.addEventListener("scroll", NavbarButtonEffect);

$("#portfolio_link").click("portfolio", NavbarButtonControl);
$("#contact_link").click("contact", NavbarButtonControl);

async function readJson(dir) {
    try {
        let data = await fetch(dir);
        data = await data.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function PrintWorks() {
    let works = "";
    let data = await readJson("json/portfolio.json");

    for (let i = 0; i < data.length; i++) {
        let work, link = "";

        if (data[i].link != "#") {
            link = `<a class="description" href="${data[i].link}" target="_blank">前往查看 ></a>`;
        }

        if (deviceWidth < 768) {
            work = `<div id="work${i}" class="container align-items-center card default-gradient">
                        <div class="row wow bounceInLeft">
                            <img class="work_pic" src="${data[i].image_dir}">
                        </div>
                        <div class="row justify-content-center wow bounceInRight">
                            <h1 class="title">${data[i].title}</h1>
                            <p class="description">${data[i].description}</p>
                            ${link}
                        </div>
                    </div>
                    `
        } else {
            work = `<div id="work${i}" class="container card default-gradient">
                        <div class="row align-items-start">
                            <div class="col-md-6 wow bounceInLeft">
                                <img class="work_pic" src="${data[i].image_dir}">
                            </div>
                            <div class="col-md-6 wow bounceInRight">
                                <h1 class="title">${data[i].title}</h1>
                                <p class="description">${data[i].description}</p>
                                ${link}
                            </div>
                        </div>
                    </div>
                    `
        }
        works += work;
    }

    $("#works_area").html(works);
}

function PrintCertificates() {
    let titles = ["Shrimp Risotto", "Bolognese Pasta", "Kewa Salad"];
    let subtitles = ["藍鑽蝦燴飯", "帕薩尼肉醬意大利麵", "Kewa沙拉"];
    let images = ["prawn_rice", "spaghetti", "salad"]
    let works = "";

    for (let i = 0; i < titles.length; i++) {
        let work;
        if (deviceWidth < 768) {
            work = `<div class="item wow slideInUp">
                        <div id="cheese_cake" class="carousel slide carousel-fade" data-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img class="d-block w-100" src="./img/pastry_1.png" alt="First slide">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="./img/pastry_1-1.png" alt="Second slide">
                                </div>
                            </div>
                        </div>
                        <h1 class="title_cake">Cheese Cake</h1>
                        <hr>
                        <p class="item_description">(餅乾/奶油/乳酪/糖/雞蛋)</p>
                    </div>
                    `
        } else {
            work = `<div class="item wow slideInUp">
                        <div id="cheese_cake" class="carousel slide carousel-fade" data-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img class="d-block w-100" src="./img/pastry_1.png" alt="First slide">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="./img/pastry_1-1.png" alt="Second slide">
                                </div>
                            </div>
                        </div>
                        <h1 class="title_cake">Cheese Cake</h1>
                        <hr>
                        <p class="item_description">(餅乾/奶油/乳酪/糖/雞蛋)</p>
                    </div>
                    `
        }
        works += work;
    }

    $("#certificates").html(works);
}

//footer 畫綫
function DrawFooterLine(event) {
    let canvas = document.getElementById('line');
    let ctx = canvas.getContext("2d");

    canvas.height = 150;
    canvas.width = 300;

    if (deviceWidth >= 990) {   // draw vertical line in computer webside
        ctx.beginPath()
        ctx.moveTo(300, 40)
        ctx.lineTo(300, 110)
    }
    else if (deviceWidth >= 768) {   // draw vertical line in tab webside
        ctx.beginPath()
        ctx.moveTo(280, 40)
        ctx.lineTo(280, 110)
    }
    else {   //draw horizontal line in phone website
        canvas.height = 15;
        ctx.beginPath()
        ctx.moveTo(30, 7)
        ctx.lineTo(260, 7)
    }
    ctx.strokeStyle = "white"
    ctx.stroke()

};

function NavbarButtonControl(event) {
    let destination;
    if (event.data == "portfolio") destination = "works_area";
    else if (event.data == "contact") destination = "foot_logo";

    //Redirect to home page if this link is clicked at another page
    if (event.data != "contact" && (location.pathname.endsWith("/index.html") || location.pathname.endsWith("/"))) {
        window.location.href = `index.html#${destination}`;
    }
    //else scroll to Portfolio section
    $('html, body').animate({
        scrollTop: $(`#${destination}`).offset().top - 85
    }, 500);
}

function NavbarButtonEffect(event) {
    if (/certificate.html/.test(window.location.href)) {
        $("#certificate_link").addClass("nav_clicked")

    } else if ((location.pathname.endsWith("/index.html") || location.pathname.endsWith("/")) && event) {
        if (this.scrollY > $("#works_area").offset().top - 100) {
            $(".profile_area").addClass("d-fadeout");//hide profile area when scroll down
            $("#portfolio_link").addClass("nav_clicked");// Show "clicked(作品集)" on navbar when user reached bottom
        } else {
            $(".profile_area").removeClass("d-fadeout");
            $("#portfolio_link").removeClass("nav_clicked");
        }
    }
    // Show "clicked(聯絡方式)" on navbar when user reached bottom
    try {
        if (this.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight - 1) {
            $("#contact_link").addClass("nav_clicked");
        } else {
            $("#contact_link").removeClass("nav_clicked");
        }
    } catch (e) {
        if (e instanceof TypeError) {
            $("#contact_link").addClass("nav_clicked");
        }
    }
}

function main() {
    if (location.pathname.endsWith("/index.html") || location.pathname.endsWith("/")) PrintWorks();
    PrintCertificates();
    NavbarButtonEffect();
    new WOW().init();

    //Country Code 顯示
    $.get("https://ipinfo.io", function (response) {
        console.log(response.city, response.country);
        $(".location p").html(response.country);
    },
        "jsonp");

    //hamburger button animation
    $('.first-button').on('click', function () {

        $('.animated-icon1').toggleClass('open');
    });
    $('.second-button').on('click', function () {

        $('.animated-icon2').toggleClass('open');
    });
    $('.third-button').on('click', function () {

        $('.animated-icon3').toggleClass('open');
    });

    DrawFooterLine();
}
