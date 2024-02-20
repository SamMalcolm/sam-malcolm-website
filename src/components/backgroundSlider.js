const backgroundSlides = () => {
    var backgrounds = document.querySelectorAll("div.smm-background");
    var bg_counter = 0;


    // console.log(image_index);
    var nav_links = document.querySelectorAll(".nav-links > a");
    // var firstBG = document.querySelectorAll("div.smm-background")[image_index];
    var firstBG = backgrounds[0];
    document.querySelector("path.st3").style.fill = firstBG.getAttribute("data-highlight");
    document.querySelector("text.st1").style.fill = firstBG.getAttribute("data-text");
    for (var b = 0; b < nav_links.length; b++) {
        nav_links[b].style.color = firstBG.getAttribute("data-text");
        nav_links[b].style.color = firstBG.getAttribute("data-text");
        nav_links[b].children[0].children[0].style.backgroundColor = firstBG.getAttribute("data-highlight");
    }

    const bg_timer = setInterval(function () {
        console.log("Counter: " + bg_counter);
        for (let i = 0; i < backgrounds.length; i++) {
            if (bg_counter == 1) {
                console.log("Appear All: " + bg_counter);
                backgrounds[i].style.opacity = '1';
            } else {
                if (bg_counter == i * 2 || bg_counter == (i * 2) + 1) {
                    for (var c = 0; c < backgrounds.length; c++) {
                        if (backgrounds[c].getAttribute("data-bg") < backgrounds[i].getAttribute("data-bg")) {
                            backgrounds[c].style.opacity = '0';
                        }
                    }
                    console.log("Active BG: " + backgrounds[i])
                    backgrounds[i].style.opacity = '1';
                    document.querySelector("nav").style.backgroundColor = backgrounds[i].getAttribute("data-nav");
                    document.querySelector("path.st3").style.fill = backgrounds[i].getAttribute("data-highlight");
                    document.querySelector("text.st1").style.fill = backgrounds[i].getAttribute("data-text");
                    for (var b = 0; b < nav_links.length; b++) {
                        nav_links[b].style.color = backgrounds[i].getAttribute("data-text");
                        nav_links[b].style.color = backgrounds[i].getAttribute("data-text");
                        nav_links[b].children[0].children[0].style.backgroundColor = backgrounds[i].getAttribute("data-highlight");
                    }
                }
            }

        }
        if (bg_counter == (backgrounds.length * 2) - 1) {
            bg_counter = 0;
        } else {
            bg_counter++;
        }
        sessionStorage.setItem("counter_index", bg_counter);

    }, 5000);
}
export default backgroundSlides;



