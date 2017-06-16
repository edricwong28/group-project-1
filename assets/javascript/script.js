 // MATERIALIZE SCRIPTS
 //______________________________________________________________________________________________________________________________
  $(document).ready(function(){
      $('.parallax').parallax();
      Materialize.updateTextFields();
      $('select').material_select();
      $('.carousel').carousel({dist:0});
      $('.carousel.carousel-slider').carousel({fullWidth: true});
      $('.slider').slider();        
      // $('select').material_select('destroy');
  });



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

  // handles the sign in button press
  function signIn () {
    if (firebase.auth().currentUser) {

      firebase.auth().signOut();
    } else {
      var email = $("#email").val().trim();
      var password = $("#password").val().trim();
      if (email.length < 4) {
        alert("Please enter an email address. ");
        return;
      }
      if (password.length < 4) {
        alert("Please enter a password. ");
        return;
      }

      //sign in with email and password
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

        //handle errors here
        var errorCode = error.code;
        var errorMessage = error.message;

        if(errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);

      });

    }
  }


  //handles the sign up button press
  function signUp() {
    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    if(email.length < 4) {
      alert("Please enter an email address.");
      return;
    }
    if (password.length < 4) {
      alert("Please enter a password.");
      return;
    }

    //sign in with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    
    //handle errors
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == "auth/weak-password") {
      alert("The password is too weak. ");
    } else {
      alert(errorMessage);
    }

    console.log(error);

    });
  }

  //Send email verification to user

  function sendEmailVerification() {

    firebase.auth().currentUser.sendEmailVerification().then(function() {
      alert("Email Verification Sent!");
    });
  }

  //reset password
  function sendPasswordReset() {
    var email = $("#email").val().trim();

    firebase.auth().sendPasswordResetEmail(email).then(function() {
      alert("Password Reset Email Sent!");
    }).catch(function(error) {
      //handle errors
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == "auth/invalid-email") {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

//ADDING SCRIPTS FOR MATERIALZIE BEHAVIOR
//_______________________________________________________________________________________________________________________________

  $(document).ready(function(){
      $('.carousel').carousel();
  });

  $(document).ready(function() {
    $('select').material_select();
  });

  $('select').material_select('destroy');

  $(document).ready(function(){
      $('.parallax').parallax();
  });
