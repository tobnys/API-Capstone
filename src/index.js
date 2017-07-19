// https://openweathermap.org/current
// https://openweathermap.org/api



(function(){
    const YT_API = "https://www.googleapis.com/youtube/v3/search";

    $(".js-main-form-btn").on("click", function(e){
        e.preventDefault();
        var searchValue = $(".js-main-input").val();
        console.log(searchValue);
        initiateAPI(searchValue);
    });


    function initiateAPI(searchTerm)
    {
        console.log("Initiating API.");
    }

    function renderHTML(result)
    {
        console.log("Rendering HTML.");
    }


}());
