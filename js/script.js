// page transitions
// $(document).ready(function(){
//     // $("main-section").hide(0);
//     // $("main-section").fadeIn(900);
//     if($(".main-section").css("opacity") == "0"){
//       $(".main-section").animate({opacity: "0.5"});
//       $(".main-section").animate({opacity: "1"});
//     }
//   });


// hover over images
document.getElementByClass("github").onmouseover = function() {githubmouseOver()};
document.getElementByClass("github").onmouseout = function() {githubmouseOut()};

function githubmouseOver() {
    if ( document.URL.includes("scenario1.html") || document.URL.includes("scenario2.html") || document.URL.includes("scenario3.html") ) {
        //Code here
        document.getElementById("github").src = "../../assets/icons/github2.svg";
    }else{
        document.getElementById("github").src = "assets/icons/github2.svg";
    }
}

function githubmouseOut() {
    if ( document.URL.includes("scenario1.html") || document.URL.includes("scenario2.html") || document.URL.includes("scenario3.html") ) {
        //Code here
        document.getElementById("github").src = "../../assets/icons/github.svg";
    }else{
        document.getElementById("github").src = "assets/icons/github.svg";
    }
}

