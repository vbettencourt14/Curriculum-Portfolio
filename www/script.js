document.addEventListener("DOMContentLoaded", function () {

  // Function to fill the loading squares progressively
  function fillSquares() {
    var squares = document.querySelectorAll(".loading-square");
    var cogwheel = document.getElementById("cogwheel");

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

        // After the last square turns dark green, play the audio
        setTimeout(function () {
          squares.forEach(square => {
            square.style.backgroundColor = "#00ff00"; // Turn all squares bright green
          });

          // Hide the cogwheel
          if (cogwheel) {
            cogwheel.style.display = "none";
          }

          // Play the audio
          playAudio();

          // After the loading bar is complete, hide the loading container
          var loadingContainer = document.getElementById("loading-container");
          if (loadingContainer) {
            loadingContainer.style.opacity = "0";
            setTimeout(function () {
              loadingContainer.style.display = "none";

              // Show and fade in the portfolio section
              var portfolioSection = document.getElementById("portfolio-section");
              if (portfolioSection) {
                portfolioSection.style.opacity = "1"; // Set opacity to 1 directly
              } else {
                console.error("Portfolio section not found.");
              }
            }, 1000); // Set the duration of the transition in milliseconds
          } else {
            console.error("Loading container not found.");
          }
        }, 1000); // Wait for 1 second after the last square turns dark green
      }
    }, 1000); // Set the duration for each square to fill (adjust as needed)
  }

  // Function to initiate the loading process
  function startLoading() {
    // After 1 seconds, start filling the loading squares
    setTimeout(fillSquares, 1000); // Set the loading duration in milliseconds
  }

  // Call startLoading when the user clicks on the document
  document.addEventListener("click", startLoading);

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

  rotateImage()
});
