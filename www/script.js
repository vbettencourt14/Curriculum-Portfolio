document.addEventListener("DOMContentLoaded", function () {

  

  // Function to fill the loading squares progressively
  function fillSquares() {
    var squares = document.querySelectorAll(".loading-square");
    var cogwheel = document.getElementById("rotating-image");

    // Helper function to play audio and handle errors
    function playAudio() {
      var audioPlayer = document.getElementById("audio-player");
      if (audioPlayer) {
        audioPlayer.play()
          .then(() => console.log("Audio playback started"))
          .catch(error => console.error("Error playing audio:", error));
      } else {
        console.error("Audio player not found.");
      }
    }

    var squareIndex = 0;
    var interval = setInterval(function () {
      if (squareIndex < squares.length) {
        squares[squareIndex].style.backgroundColor = "#006400"; // Turn the square dark green
        squareIndex++;
      } else {
        clearInterval(interval);

        // After the last square turns dark green, wait for 1 second, then brighten all squares
        setTimeout(function () {
          squares.forEach(square => {
            square.style.backgroundColor = "#00ff00"; // Turn all squares bright green
          });

          // After the loading bar is complete, initiate the fade-out process
          setTimeout(function () {
            fadeOutLoadingBarAndCogwheel();
          }, 1000); // Wait for 1 second after the last square turns dark green

          // Play the audio after the loading bar is complete
          playAudio();
        }, 1000); // Wait for 1 second after the last square turns dark green
      }
    }, 1000); // Set the duration for each square to fill (adjust as needed)
  }

  // Function to initiate the loading process
  function startLoading() {
    // After 1 second, start filling the loading squares
    setTimeout(fillSquares, 1000); // Set the loading duration in milliseconds
  }

  // Function to fade out the loading bar and cogwheel
  function fadeOutLoadingBarAndCogwheel() {
    var loadingContent = document.getElementById("loading-content");
  
    if (loadingContent) {
      loadingContent.style.transition = "opacity 1s ease"; // Set transition for loading content
      loadingContent.style.opacity = "0";
  
      // After the fade-out, hide the loading container and fade in the portfolio section
      setTimeout(function () {
        var loadingContainer = document.getElementById("loading-container");
        if (loadingContainer) {
          loadingContainer.style.display = "none";
  
          // Show and fade in the portfolio section
          var portfolioSection = document.getElementById("portfolio-section");
          if (portfolioSection) {
            portfolioSection.style.transition = "opacity 1s ease"; // Set transition for portfolio section
            portfolioSection.style.opacity = "1"; // Set opacity to 1 directly
          } else {
            console.error("Portfolio section not found.");
          }
        } else {
          console.error("Loading container not found.");
        }
      }, 1000); // Set the duration of the transition in milliseconds
    } else {
      console.error("Loading content not found.");
    }
  }

  // Function to handle button click
  function handleButtonClick() {
    var startContainer = document.getElementById("start-container");
    var loadingContainer = document.getElementById("loading-container");
    var startAudio = document.getElementById("start-audio");

    if (startContainer && loadingContainer && startAudio) {
      // Play the start button audio
      startAudio.play();

      // Hide the start container immediately
      startContainer.style.display = "none";

      // Show the loading container after a brief delay
      setTimeout(function () {
        loadingContainer.style.display = "flex";

        // Start the loading process
        startLoading();
      }, 500); // Adjust the delay time in milliseconds
    } else {
      console.error("Start or loading container or start audio not found.");
    }
  }

  // Call handleButtonClick when the user clicks on the start button
  var startButton = document.getElementById("start-button");
  if (startButton) {
    startButton.addEventListener("click", handleButtonClick);
  } else {
    console.error("Start button not found.");
  }

  // Function to rotate the image
  function rotateImage() {
    var rotatingImage = document.getElementById("rotating-image");
    if (rotatingImage) {
      var rotation = 0;

      // Function to perform rotation animation
      function rotate() {
        rotation += 1; // Adjust the rotation speed as needed
        rotatingImage.style.transform = "rotate(" + rotation + "deg)";
        requestAnimationFrame(rotate);
      }

      // Start the rotation animation
      rotate();
    } else {
      console.error("Rotating image not found.");
    }
  }

  rotateImage();

  
});

function toggleTheme() {
  var body = document.body;
  body.classList.toggle("light-mode");

  var themeIcon = document.getElementById("theme-icon");

  // Toggle the image source based on the theme
  if (themeIcon) {
    if (body.classList.contains("light-mode")) {
      themeIcon.src = "images/moon.png"; // Change to moon image path
      // Change body background color to white and font color to black
      body.style.backgroundColor = "white";
      body.style.color = "black";
      // Play MP3 when switching to light mode
      playAudio("mp3/lightmode.mp3");
    } else {
      themeIcon.src = "images/sun.png"; // Change to sun image path
      // Reset body background color and font color to default values
      body.style.backgroundColor = "black";
      body.style.color = "white";
      // Play MP3 when switching to dark mode
      playAudio("mp3/lightmode.mp3");
    }
  }
}

// Helper function to play audio
function playAudio(audioPath) {
  var audio = new Audio(audioPath);
  audio.play()
    .then(() => console.log("Audio playback started"))
    .catch(error => console.error("Error playing audio:", error));
}



