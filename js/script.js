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
document.getElementsByClass("github").onmouseover = function() {githubmouseOver()};
document.getElementsByClass("github").onmouseout = function() {githubmouseOut()};

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

// onclick right answer showCorrect()
function showCorrect(){
    //hide scenario by id="scene"
    $("#scene").slideUp(0);
    //show explanation by id="right-answer"
    $("#right-answer").slideDown(0);
}

// onclick wrong answer showWrong()
function showWrong(){
    //hide scenario by id="scene"
    $("#scene").slideUp(0);
    //show explanation by id="wrong-answer"
    $("#wrong-answer").slideDown(0);
}



    