document.addEventListener("DOMContentLoaded", function () {


  // Function to fill the loading squares progressively
  function fillSquares() {
    var squares = document.querySelectorAll(".loading-square");

    // Helper function to play audio and handle errors
    function playAudio(audioPath) {
      var audioPlayer = document.getElementById("audio-player");
      if (audioPlayer) {
        if (audioPath) {
          // Play the specified audio
          new Audio(audioPath).play()
            .then(() => console.log("Audio playback started"))
            .catch(error => console.error("Error playing audio:", error));
        } else {
          // Play the default audio from the audio-player element
          audioPlayer.play()
            .then(() => console.log("Audio playback started"))
            .catch(error => console.error("Error playing audio:", error));
        }
      } else {
        console.error("Audio player not found.");
      }
    }

    var squareIndex = 0;
    var interval = setInterval(function () {
      if (squareIndex < squares.length) {
        squares[squareIndex].style.backgroundColor = "#006400"; // Turn the square dark green
        squareIndex++;
        playAudio("sounds/square.mp3")
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
          playAudio("sounds/loading.mp3");
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

  var toolbar = document.getElementById("toolbar");
  var toggleButton = document.getElementById("toggleButton");
  var image = document.getElementById("toggleButton");
  
  toggleButton.addEventListener("click", function () {
    playAudio("sounds/toggle.wav");
    toolbar.classList.toggle("collapsed");
  
    // Change the image source based on the toolbar state
    if (toolbar.classList.contains("collapsed")) {
      image.src = "images/toggleback.png";
    } else {
      image.src = "images/togglein.png";
      
    }
  });

  const particleCount = 50; // Adjust the number of particles
    const particlesSection = document.getElementById('particles-section');

    for (let i = 0; i < particleCount; i++) {
      createParticle();
    }

    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particlesSection.appendChild(particle);

      const size = 2.5; // Adjust the size of particles
      const duration = 5; // Adjust the duration of particle movement

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animationDuration = `${duration}s`;

      // Animation listener to reset particle position within the visible area
      particle.addEventListener('animationiteration', () => {
        const maxX = particlesSection.clientWidth - size;
        const maxY = particlesSection.clientHeight - size;

        const newInitialX = Math.random() * maxX;
        const newInitialY = Math.random() * maxY;

        particle.style.left = `${newInitialX}px`;
        particle.style.top = `${newInitialY}px`;
      });

      resetParticlePosition(particle, size);
    }

    // Update particle positions when the window is resized
    window.addEventListener('resize', () => {
      const particles = document.querySelectorAll('.particle');
      const size = parseFloat(particles[0].style.width); // Assume all particles have the same size

      particles.forEach((particle) => {
        resetParticlePosition(particle, size);
      });
    });

    function resetParticlePosition(particle, size) {
      const maxX = particlesSection.clientWidth - size;
      const maxY = particlesSection.clientHeight - size;

      const newInitialX = Math.random() * maxX;
      const newInitialY = Math.random() * maxY;

      particle.style.left = `${newInitialX}px`;
      particle.style.top = `${newInitialY}px`;
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

  // New code for the download button
  var downloadImage = document.getElementById("downloadButton");

  if (downloadImage) {
    downloadImage.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default behavior of the anchor tag
      downloadPDF("documents/curriculum.pdf");
    });
  } else {
    console.error("Download image not found.");
  }

  // Function to download PDF
  function downloadPDF(pdfPath) {
    var link = document.createElement("a");
    link.href = pdfPath;
    link.target = "_blank";
    link.download = "CV-Vasco_Bettencourt.pdf";
    link.click();
  }

   
});

//FIRST TOOLBAR BUTTON LOGIC - NICKNAMED:HOME

var scrollToTopButton = document.getElementById("scroll-to-top-button");

  if (scrollToTopButton) {
    scrollToTopButton.addEventListener("click", function () {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
      playAudio("sounds/toolbar.mp3")
    });
  } else {
    console.error("Scroll-to-top button not found.");
  }

  function smoothScrollToTop() {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothScrollToTop);
      window.scrollTo(0, currentScroll - currentScroll / 8);
    }
  }


// SECOND TOOLBAR BUTTON LOGIC - NICKNAMED: INTRODUCTION
var scrollToIntroductionButton = document.getElementById("scroll-to-introduction");

if (scrollToIntroductionButton) {
  scrollToIntroductionButton.addEventListener("click", function () {
    playAudio("sounds/toolbar.mp3");
    smoothScrollToIntroduction();
  });
} else {
  console.error("Scroll-to-introduction button not found.");
}

function smoothScrollToIntroduction() {
  var targetPosition = 778; // Replace this with the actual position of the introduction section
  var duration = 0; // Set the duration of the smooth scroll (in milliseconds)

  var start = null;
  var initialY = document.documentElement.scrollTop || document.body.scrollTop;

  function step(timestamp) {
    if (!start) {
      start = timestamp;
    }

    var progress = timestamp - start;
    var ease = progress / duration;

    var newY = initialY + (targetPosition - initialY) * ease;

    window.scrollTo(0, newY);

    if (progress < duration) {
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetPosition); // Snap to the target position at the end
    }
  }

  window.requestAnimationFrame(step);
}

// THIRD TOOLBAR BUTTON LOGIC - NICKNAMED: CERTIFICATES
var scrollToCertificatesButton = document.getElementById("scroll-to-certificates");

if (scrollToCertificatesButton) {
  scrollToCertificatesButton.addEventListener("click", function () {
    playAudio("sounds/toolbar.mp3");
    smoothScrollToCertificates();
  });
} else {
  console.error("Scroll-to-introduction button not found.");
}

function smoothScrollToCertificates() {
  var targetPosition = 2840; // Replace this with the actual position of the introduction section
  var duration = 0; // Set the duration of the smooth scroll (in milliseconds)

  var start = null;
  var initialY = document.documentElement.scrollTop || document.body.scrollTop;

  function step(timestamp) {
    if (!start) {
      start = timestamp;
    }

    var progress = timestamp - start;
    var ease = progress / duration;

    var newY = initialY + (targetPosition - initialY) * ease;

    window.scrollTo(0, newY);

    if (progress < duration) {
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetPosition); // Snap to the target position at the end
    }
  }

  window.requestAnimationFrame(step);
}

// FOURTH TOOLBAR BUTTON LOGIC - NICKNAMED: PROJECTS
var scrollToProjectsButton = document.getElementById("scroll-to-projects");

if (scrollToProjectsButton) {
  scrollToProjectsButton.addEventListener("click", function () {
    playAudio("sounds/toolbar.mp3");
    smoothScrollToProjects();
  });
} else {
  console.error("Scroll-to-introduction button not found.");
}

function smoothScrollToProjects() {
  var targetPosition = 4700; // Replace this with the actual position of the introduction section
  var duration = 0; // Set the duration of the smooth scroll (in milliseconds)

  var start = null;
  var initialY = document.documentElement.scrollTop || document.body.scrollTop;

  function step(timestamp) {
    if (!start) {
      start = timestamp;
    }

    var progress = timestamp - start;
    var ease = progress / duration;

    var newY = initialY + (targetPosition - initialY) * ease;

    window.scrollTo(0, newY);

    if (progress < duration) {
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetPosition); // Snap to the target position at the end
    }
  }

  window.requestAnimationFrame(step);
}

function toggleTheme() {
  var body = document.body;
  body.classList.toggle("light-mode");

  var themeIcon = document.getElementById("theme-icon");
  var curriculum = document.getElementById("curriculum-button");
  var dcual = document.getElementById("dcual");
  var dividers = document.getElementsByClassName("divider");

  // Toggle the image source based on the theme
  if (themeIcon) {
    if (body.classList.contains("light-mode")) {
      themeIcon.src = "images/moon.png";
      curriculum.src = "images/curriculum2.png";
      body.style.backgroundColor = "rgb(239, 181, 72)";
      body.style.color = "black";
      dcual.src = "images/dcual2.png";

      // Iterate through dividers and update each one
      for (var i = 0; i < dividers.length; i++) {
        dividers[i].src = "images/divider2.png";
      }

      playAudio("sounds/on.mp3");
    } else {
      themeIcon.src = "images/sun.png";
      curriculum.src = "images/curriculum1.png";
      body.style.backgroundColor = "black";
      body.style.color = "white";
      dcual.src = "images/dcual1.png";

      // Iterate through dividers and update each one
      for (var i = 0; i < dividers.length; i++) {
        dividers[i].src = "images/divider1.png";
      }

      playAudio("sounds/off.mp3");
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


function changeImage() {
  const image = document.getElementById("turn");

  // Add a class to hide the image (opacity: 0)
  image.classList.add("hidden");

  // Use setTimeout to wait for the transition effect to be applied
  setTimeout(() => {
    // Change the image source after the transition is complete
    if (image.src.endsWith("images/hydra.png")) {
      image.src = "images/mm.jpg";
    } else {
      image.src = "images/hydra.png";
    }

    // Remove the hidden class to make the image visible again
    image.classList.remove("hidden");
  }, 500); // Adjust the delay to match the transition duration
}

