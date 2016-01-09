$(document).ready(function(){



    if(localStorage.getItem('_id') == null){
        alert("You are not logged in.\n Please login to continue");
        window.location.replace("/");
    }


});
function logout(){
    localStorage.clear();
    window.location.href="/";

}

window.onbeforeunload = function() {
    localStorage.removeItem(key);
    return '';
};