  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAvYUBg47CmdjD-J_-XYOcD_Xi2ekHg7lI",
    authDomain: "netflix-group-project-1.firebaseapp.com",
    databaseURL: "https://netflix-group-project-1.firebaseio.com",
    projectId: "netflix-group-project-1",
    storageBucket: "netflix-group-project-1.appspot.com",
    messagingSenderId: "179076092851"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();
  
  //when SUBMIT is clicked, save inputs into variables
  $("#submitbtn").click(function(event){

    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    var city = $("#city").val().trim();
    var keyword = $("#keyword").val().trim();
    var actor = $("#actor").val().trim();

    console.log(email);
    console.log(password);
    console.log(city);
    console.log(keyword);
    console.log(actor);

    // create "temporary" object for holding user's data
    newObject = {
      email: email,
      password: password,
      city: city,
      keyword: keyword,
      actor: actor
    };

    // Uploads  data to the database, this will "trigger" the "child_added" event
    database.ref().push(newObject);

    alert("success!");

    //Clears input boxes
      $("#email").val("");
      $("#password").val("");
      $("#city").val("");
      $("#keyword").val("");
      $("#actor").val("");

  getflix();

  

  });

    //MATERIALIZE SCRIPTS
  $(document).ready(function(){
      $('.carousel').carousel({dist:0});
      $('.parallax').parallax();
      Materialize.updateTextFields();
      $('select').material_select();
      $('.carousel.carousel-slider').carousel({fullWidth: true});
      $('.slider').slider();        
      // $('select').material_select('destroy');
  });
     

    function getflix(){ 

      console.log("WORKGIN!")

      var key = "819174faa3fc447084b0d2c6d4bf1418";
      //WEATHER DATA WILL USE CITY INPUT FROM FIREBASE OBJECT
      var URL = "http://api.openweathermap.org/data/2.5/weather?q=" + newObject.city + "&APPID=" + key;
   
      var netflixURL = "https://netflixroulette.net/api/api.php?" + "actor=" + newObject.actor;
     
      // var req = new XMLHttpRequest();

      var getWeather = $.ajax({
          url: URL,
          method: "GET"
          })

      var getNetflix = $.ajax ({
          url: netflixURL,
          method: "GET"

          // req.open('GET', netflixURL + actor + true);
          // req.addEventListener("load", function() {
          //     var response = JSON.parse(req.responseText);
          //     console.log(response);
          // });
          // req.send(null);
          })
 
   //MULTIPLE AJAX CALLS METHOD
   $.when(getWeather, getNetflix).done(function(r1, r2) {

       r1 = r1[0];
      //r2[0] is pointing to the "parent" array, which holds mulipltle objects
       r2 = r2[0];

      $(".city").html(r1.name);
      $(".temp").html(r1.main.temp);
      $(".main").html(r1.weather[0].main);
      $(".description").html(r1.weather[0].description);
             //FOR WEATHER ICON IMAGE TO DISPLAY
       var iconCode = r1.weather[0].icon;
       var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
       var icon = $("<img>").attr("src", iconURL);
      $(".icon").html(icon);
      
      // $(".show").append(r2[0].show_title);
      // $(".show").append(r2[1].show_title);
      // $(".show").append(r2[2].show_title);
      // $(".show").append(r2[3].show_title);
      // $(".show").append(r2[4].show_title);

      console.log(r1.main.temp);
      console.log(r1.weather[0].main);
      console.log(r1.weather[0].description);
      console.log(r1.weather[0].icon);

      console.log(r1);
      console.log(r2[0]);
      console.log(r2);

      console.log("TESTING!!!!");
      console.log(r2[1].category);



          for(i=0; i < r2.length; i++){

             if(r1.weather[0].main == "Clear" && (r2[i].category == "Action & Adventure" || r2[i].category == "Comedies")){

                var results = document.getElementById("results")
                var newDiv = document.createElement("div")

                var imgURL = r2[i].poster;
                var imgDiv = $('<a id="imgDiv" class="carousel-item">');
                var img = $("<img>").attr("src", imgURL);

                newDiv.innerHTML = r2[i].show_title;

                // results.appendChild(newDiv);

                $(".imgDiv").html(img);
                $(".carousel").prepend(imgDiv)
                $("#results").prepend(newDiv);
                
   
              }

              else if((r1.weather[0].main == "Clouds" || r1.weather[0].main == "Haze") && (r2[i].category == "Dramas" || r2[i].category == "Thrillers")){
                var results = document.getElementById("results")
                var newDiv = document.createElement("div")
                var imgURL = r2[i].poster;
                var img = $("<img>").attr("src", imgURL);

                newDiv.innerHTML = r2[i].show_title;

                // results.appendChild(newDiv);

                $("#imgCarousel").prepend(img);
                $("#results").prepend(newDiv);
                

              }

              else if((r1.weather[0].main == "Rain" || r1.weather[0].main == "Thunderstorm") && (r2[i].category == "Oscar-winning Movies" || r2[i].category == "Sci-Fi & Fantasy" || r2[i].category == "Faith & Spirituality")){
                var results = document.getElementById("results");
                var newDiv = document.createElement("div");
                var imgURL = r2[i].poster;
                var img = $("<img>").attr("src", imgURL);

                newDiv.innerHTML = r2[i].show_title;

                // results.appendChild(newDiv);

                $("#imgCarousel").prepend(img);
                $("#results").prepend(newDiv);
                
                

              }

          }
       
         


     });
    }

