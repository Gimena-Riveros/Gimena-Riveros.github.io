const description = document.querySelector(".tooltip");

document.querySelectorAll('path').forEach((element)=>
    element.addEventListener('mouseover',(event)=>{
        event.target.className = ("enabled");
        description.classList.add("active");
        description.innerHTML = event.target.id;
    })
);
document.querySelectorAll('path').forEach((element)=>
    element.addEventListener("mouseout", ()=> {
        description.classList.remove("active");
    })
);
document.onmousemove = (e) =>{
    description.style.left = e.pageX + "px";
    description.style.top = (e.pageY - 70) + "px";
}



$(document).ready(function() {

    $("#svgItalia").click(function(evt) {
      switch(evt.target.id) {
        case "Calabria":
          $("#info").html("<p>CALABRIA : </p> <p></br>Regio Calabria Catanzaro</p> <p>Cosenza</p> <p>Crotone</p> <p>ViBo Valentia.</p>");
          break;
        case "Sicilia":
          $("#info").html("<p>SICILIA : </p> <p></br>Palermo</p> <p>Agrigento</p> <p>Caltanissetta</p> <p>Catania</p> <p>Enna</p> <p>Messina</p> <p>Ragusa</p> <p>Siracusa Trapani.</p>");
          break;
        case "Sardegna":
          $("#info").html("<p>SARDEGNA : </p> <p></br>Cagliari</p> <p>Nuoro</p> <p>Oristano</p> <p>Sassari</p> <p>Sud Sardegna.</p>");
          break;
        case "Piemonte":
          $("#info").html("<p>PIEMONTE : </p> <p></br>Torino</p> <p>Alessandria</p> <p>Asti</p> <p>Biella</p> <p>Cuneo</p> <p>Ivrea</p> <p>Novara</p> <p>Vercelli</p> <p>Verbano Cuosio Ossola.</p>");
          break;
        case "Toscana":
          $("#info").html("<p>TOSCANA : </p> <p></br>Firenze</p> <p>Arrezo</p> <p>Livorno</p> <p>Grosseto</p> <p>Lucca</p> <p>Massa Carrara</p> <p>Pisa</p> <p>Pistoia</p> <p>Prato</p> <p>Siena.</p>");
          break;
          default:
            break;
      }
    });
    
});