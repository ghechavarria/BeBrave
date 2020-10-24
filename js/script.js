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
    document.getElementById("github").src = "assets/icons/github2.svg";
}

function githubmouseOut() {
    document.getElementById("github").src = "assets/icons/github.svg"
}

