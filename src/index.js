(function(){
    const YT_API = "https://www.googleapis.com/youtube/v3/search";
    $(".current").fadeToggle(1, function(){

    });
    $(".js-main-form-btn").on("click", function(e){
        e.preventDefault();
        var searchValue = $(".js-main-input").val();
        console.log(searchValue);
        initiateAPI(searchValue);
    });

    $(".js-current-weather").on("click", function(e){
        e.preventDefault();
        $(".home").fadeOut(400, function(){
            renderCurrentWeather();
        });
    });

    function renderCurrentWeather()
    {
        $(".current").fadeIn(400, function(){

        });
    }

    $(".js-home").on("click", function(e){
        e.preventDefault();
        $(".current").fadeOut(400, function(){
            $(".home").fadeIn(400, function(){
                renderMainPage();
            });
        });
    });

    function renderMainPage()
    {
        $(".current-weather").fadeOut(400);
    }


    function initiateAPI(searchTerm)
    {
        console.log("Initiating API.");
    }

    function renderHTML(result)
    {
        console.log("Rendering HTML.");
    }


}());
