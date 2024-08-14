// function style selection option and out before selection
function selection(link) {
    var options = document.querySelectorAll('#links a');
    options[0].className = "";
    options[1].className = "";
    options[2].className = "";
    options[3].className = "";
    options[4].className = "";
    link.className = "selection"
    
    // menu desapere after choice
    var x = document.getElementById("nav");
    x.className = "";
}
//  responsiveMenu()
function responsiveMenu() {
    var x = document.getElementById("nav");
    if(x.className === "") {
        x.className = "responsive";
    } else{
        x.className = "";
    }
}

scrollHandler();
line.style.display = 'block';
window.addEventListener('scroll', scrollHandler)