// Call an IIFE function which means everything within this function loads immediately upon document load.
(function(){
    // Declare two variables that will be used later on.
    var runThroughCurrent = 0;
    var runOnceSearch = false;

    // "Hide" two classes in order to initiate the navigation process.
    $(".current").fadeToggle(1);
    $(".searchInfo").fadeToggle(1);
    
    // Watch a class for a click, then execute a function upon that click.
    $(".js-main-form-btn").on("click", function(e){
        e.preventDefault();
        var searchValue = $(".js-main-input").val();
        initiateSearch(searchValue);
        $(".js-main-form-btn").trigger("reset");
    });

    // Watch a class for a keypress which in this case is "enter", after that call the click method for a certain class, which executes the above code.
    $(".js-main-input").keypress(function(e){
        var key = e.which;
        if(key === 13)
        {
            e.preventDefault();
            $(".js-main-form-btn").click();
        }
    });

    // Watch a class for a click, then execute a function upon that click.
    $(".js-current-weather").on("click", function(e){
        e.preventDefault();
        $(".home").fadeOut(400, function(){
            renderCurrentWeather();
            initiateAPI("london");
            initiateAPI("paris");
            initiateAPI("stockholm");
        });
    });

    // Function to show the current weather cards upon navigating there.
    function renderCurrentWeather()
    {
        $(".current").fadeIn(400, function(){

        });
    }

    // This function handles the API call upon searching on the main page, it takes the search value and passes that to the API as the variable "q".
    function initiateSearch(q)
    {
        $.ajax({
            method: "GET",
            url: config.API,
            data: {
                APPID: config.API_KEY,
                q: q
            }
        })
        .done(function(result){
            console.log("API call complete");
            if(runOnceSearch === false)
            {
                renderSearchPage(result);
                console.log(q);
                console.log(result);
                runOnceSearch = true;
            }
        });       
    }

    // Handles the main page navigation and appends (inserts) the API information when a call to it has been done.
    function renderSearchPage(api)
    {
        $(".searchInfo").fadeIn(400, function(){

        });

        // Calculate the given temperature from the API to Celsius degrees.
        var temp = Math.floor(api.main.temp - 273.15);

        // Append all API information to specific targets.
        $("#search-t").text(api.name);
        $("#search-de").append(api.weather[0].description);
        $("#search-te").append(temp + "&#8451;");
        $("#search-hu").append(api.main.humidity);
        $("#search-pr").append(api.main.pressure);
        $("#search-wi").append(api.wind.speed + " m/s");
    }

    // Initiate the API call for the "current weather" page, which takes in information about three specific cities in the world and appends that information.
    function initiateAPI(q)
    {
        var target;
        if(q === "london")
        {
            target = "#w1";
        }
        else if(q === "paris")
        {
            target = "#w2";
        }
        else if(q === "stockholm")
        {
            target = "#w3";
        }
        $.ajax({
            method: "GET",
            url: config.API,
            data: {
                APPID: config.API_KEY,
                q: q
            }
        })
        .done(function(result){
            console.log("API call complete");
            if(runThroughCurrent < 3)
            {
                renderCurrentWeatherPage(result, target);
                runThroughCurrent++;
            }
        });
    }

    // Render the "current weather" page and append all the information the API has supplied.
    function renderCurrentWeatherPage(api, target)
    {
        var temp = Math.floor(api.main.temp - 273.15);
        $(target + "-t").text(api.name);
        $(target + "-de").append(api.weather[0].description);
        $(target + "-te").append(temp + "&#8451;");
        $(target + "-hu").append(api.main.humidity);
        $(target + "-pr").append(api.main.pressure);
        $(target + "-wi").append(api.wind.speed + " m/s");
    }

    // Watch for a click on the class specified, this handles visibility of certain classes which in a way manages the client sided navigation itself.
    $(".js-home").on("click", function(e){
        e.preventDefault();
        $(".current").fadeOut(400, function(){
            $(".home").fadeIn(400, function(){
                renderMainPage();
            });
        });
    });

    // Handles visibility for a certain class.
    function renderMainPage()
    {
        $(".current-weather").fadeOut(400);
    }

}());
