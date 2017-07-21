(function(){
    const YT_API = "https://www.googleapis.com/youtube/v3/search";
    var runThroughCurrent = 0;
    var runOnceSearch = false;

    // 

    $(".current").fadeToggle(1);
    $(".searchInfo").fadeToggle(1);
    

    $(".js-main-form-btn").on("click", function(e){
        e.preventDefault();
        var searchValue = $(".js-main-input").val();
        initiateSearch(searchValue);
        $(".js-main-form-btn").trigger("reset");
    });

    $(".js-main-input").keypress(function(e){
        var key = e.which;
        if(key === 13)
        {
            e.preventDefault();
            $(".js-main-form-btn").click();
        }
    });

    $(".js-current-weather").on("click", function(e){
        e.preventDefault();
        $(".home").fadeOut(400, function(){
            renderCurrentWeather();
            initiateAPI("london");
            initiateAPI("paris");
            initiateAPI("stockholm");
        });
    });

    function renderCurrentWeather()
    {
        $(".current").fadeIn(400, function(){

        });
    }

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

    function renderSearchPage(api)
    {
        $(".searchInfo").fadeIn(400, function(){

        });

        var temp = Math.floor(api.main.temp - 273.15);

        $("#search-t").text(api.name);
        $("#search-de").append(api.weather[0].description);
        $("#search-te").append(temp + "&#8451;");
        $("#search-hu").append(api.main.humidity);
        $("#search-pr").append(api.main.pressure);
        $("#search-wi").append(api.wind.speed + " m/s");
    }

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

}());
