// Toggle mobile navigation
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const closeBtn = document.querySelector(".close-btn");

  hamburger.addEventListener("click", function () {
    mobileNav.classList.toggle("active");
  });

  closeBtn.addEventListener("click", function () {
    mobileNav.classList.remove("active");
  });
});




document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const textContainer = document.querySelector(".text-container");
  const homeBtn = document.querySelector(".home-btn");
  const sideFeatures = document.querySelector(".side-features");
  const text1 = document.querySelector(".text1");
  const text2 = document.querySelector(".text2");

  textContainer.style.opacity = "0";
  homeBtn.style.opacity = "0";
  sideFeatures.style.opacity = "0";

  //Function to Create Image Strips Dynamically
  function createImageStrips(containerSelector, imageSrc, numStrips = 6, positionOptions = {}) {
      const container = document.querySelector(containerSelector);
      if (!container) return console.error(`Container "${containerSelector}" not found`);

      container.style.position = "relative";
      container.style.overflow = "hidden";
      container.innerHTML = "";

      let strips = [];
      for (let i = 0; i < numStrips; i++) {
          let strip = document.createElement("div");
          strip.classList.add("strip");
          strip.style.backgroundImage = `url(${imageSrc})`;
          strip.style.backgroundSize = `100% ${numStrips * 100}%`;
          strip.style.backgroundPosition = `center ${(100 / (numStrips - 1)) * i}%`;
          strip.style.height = `${100 / numStrips}%`;
          strip.style.width = "100%";
          strip.style.position = "absolute";
          strip.style.top = `${(100 / numStrips) * i}%`;
          strip.style.overflow = "hidden";
          strip.style.transformOrigin = "top";
          strip.style.clipPath = "inset(0% 0% 100% 0%)"; 
          strip.style.left = positionOptions.left || "0";
          // strip.style.zIndex = positionOptions.zIndex || "1";

          container.appendChild(strip);
          strips.push(strip);
      }

      return strips;
  }

  // Function to Animate Image Strips with Wipe-Down Effect
  function animateWipeDown(strips, containerSelector, moveDown = "30%") {
      gsap.set(strips, { opacity: 1 });

      gsap.to(strips, {
          clipPath: "inset(0% 0% 0% 0%)", 
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
              gsap.timeline()
                  .to(containerSelector, { y: moveDown, duration: 0.5, ease: "power3.out" }, 0)
                  .to(".text-container", { opacity: 1, duration: 0, ease: "power3.out" }, 0)
                  .fromTo(".text1 span", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.02, stagger: 0.03, ease: "power3.out" })
                  .fromTo(".text2 span", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.02, stagger: 0.03, ease: "power3.out" });

              gsap.timeline().fromTo([".home-btn", ".side-features"], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
          },
      });
  }

  // Function to Animate Image Strips with Wipe-Down on Scroll
  function animateWipeDownOnScroll(strips, containerSelector) {
      gsap.set(strips, { opacity: 1 });

      gsap.to(strips, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
              trigger: containerSelector,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
          },
      });
  }

  // Function to Split Text for Letter-by-Letter Animation
  function splitTextIntoSpans(element) {
      let originalText = element.innerHTML.trim();
      element.innerHTML = "";
      originalText.split("").forEach((char) => {
          let span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          element.appendChild(span);
      });
  }

  splitTextIntoSpans(text1);
  splitTextIntoSpans(text2);
  splitTextIntoSpans(document.querySelector(".container4-heading1"));
  splitTextIntoSpans(document.querySelector(".container4-heading2"));
  

  // Animate `.text-container2 h3` on Scroll
gsap.fromTo(
  "span",
  { opacity: 0, y: 20 },
  {
      opacity: 1,
      y: 0,
      duration: 0.02,
      stagger: 0.03,
      ease: "power3.out",
      scrollTrigger: {
          trigger: ".text-container2",
          start: "top 80%",
          end: "top 50%",
         
      }
  }
)
 


  //Apply Animation to Different Images
  let strips1 = createImageStrips(".image-container", "Images/pic.webp");
  let stripsPic5 = createImageStrips(".pic2", "Images/pic5.png");
  let stripsPic6 = createImageStrips(".pic4", "Images/pic6.png");
  let stripsPic7 = createImageStrips(".pic5", "Images/pic7.webp");

  // Run `animateWipeDown` Immediately When DOM Loads
  animateWipeDown(strips1, ".image-container", "30%");
  // Run `animateWipeDownOnScroll` for `stripsPic5` when scrolling
  animateWipeDownOnScroll(stripsPic5, ".pic2");
  animateWipeDownOnScroll(stripsPic6, ".pic4");
  animateWipeDownOnScroll(stripsPic7, ".pic5");

  // Scroll Animations for Other Elements
  gsap.from(".pic1, .pic3, .bg-text", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.4,
      scrollTrigger: {
          trigger: ".container-second",
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
      }
  });

  gsap.from(".note1, .note2", {
      opacity: 0,
      duration: 3,
      ease: "power3.out",
      scrollTrigger: {
          trigger: ".container-second",
          toggleActions: "play none none reverse",
      }
  });
 
});


function animateWipeDiagonalOnScroll(selector) {
  gsap.fromTo(
      selector,
      { 
          clipPath: "polygon(0% 100%, 0% 100%, 0% 100%)"
      },
      {
         clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)", 
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
              trigger: selector,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
          }
      }
  );
}

animateWipeDiagonalOnScroll(".text3");


function fadeInOnScroll(selector) {
  gsap.fromTo(
      selector,
      { opacity: 0, y: 20 }, 
      {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
              trigger: selector,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse", 
          }
      }
  );
}

fadeInOnScroll(".note5");


function wipeUpOnScroll(selector) {
  gsap.fromTo(
      selector,
      { clipPath: "inset(100% 0% 0% 0%)",  opacity: 0, y: 40 }, 
      {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1, y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
              trigger: selector,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse", 
          }
      }
  );
}

wipeUpOnScroll(".note3");
wipeUpOnScroll(".note4");

function addZoomInEffect(selector, scaleStart = 1.5, duration = 1.5) {
  gsap.fromTo(
      selector,
      { scale: scaleStart, opacity: 0 }, 
      {
          scale: 1, 
          opacity: 1,
          duration: duration, 
          ease: "power3.out",
          scrollTrigger: {
              trigger: selector,
              start: "top 80%", 
              end: "top 50%",
              toggleActions: "play none none reverse",
          }
      }
  );
}

addZoomInEffect(".pic10");


// ✅ Apply slide-up & fade-in effect to .note6
function addSlideUpFadeInEffect(selector, yStart = 40, duration = 1.5) {
  gsap.fromTo(
      selector,
      { y: yStart, opacity: 0 }, 
      {
          y: 0, 
          opacity: 1, 
          duration: duration, 
          scrollTrigger: {
              trigger: selector,
              start: "top 85%", 
              end: "top 50%",
              toggleActions: "play none none reverse",
          }
      }
  );
}

addSlideUpFadeInEffect(".note6");


// ✅ Apply slide-in effect to .bg-text2 (slides in from left)
function addSlideInEffect(selector, direction = "left", xStart = 100, duration = 2) {
  const xValue = direction === "left" ? -xStart : xStart; // Slide from left or right

  gsap.fromTo(
      selector,
      { x: xValue, opacity: 0 }, 
      {
          x: 0, 
          opacity: 1, 
          duration: duration, 
          ease: "power3.out",
          scrollTrigger: {
              trigger: selector,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
          }
      }
  );
}


addSlideInEffect(".bg-text2", "left");
addSlideInEffect(".bg-text3", "right");


// Fix selector by adding a dot for class selection
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);
  
    function slideInOnScroll(selector, delayFactor = 0.2, startTrigger = "top 100%") {
      gsap.utils.toArray(selector).forEach((item, index) => {
        // Set initial state
        gsap.set(item, { opacity: 0, x: 100 });
  
        gsap.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * delayFactor, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: startTrigger, 
            toggleActions: "play none none none",
          },
        });
      });
    }
  
    slideInOnScroll(".product-item");  
  });

  function infiniteSlide(selector, direction = "left", duration = 10) {
    gsap.set(selector, { x: direction === "left" ? "100%" : "-100%" });
  
    gsap.to(selector, {
      x: direction === "left" ? "-100%" : "100%",
      duration: duration,
      repeat: -1,
      ease: "linear",
    });
  }
  

  infiniteSlide(".bg-text5", "left", 8); 
  infiniteSlide(".bg-text6", "right", 8); 

  
  function animateImageChange(selector, images, duration = 3) {
    let index = 0;
    const imgElement = document.querySelector(selector);
  
    function changeImage() {
      gsap.to(imgElement, {
        opacity: 0,
        duration: 0.5,
        onComplete: function () {
          index = (index + 1) % images.length;
          imgElement.src = images[index];
          gsap.to(imgElement, { opacity: 1, duration: 0.5 });
        },
      });
    }
  
    setInterval(changeImage, duration * 1000);
  }
  
  animateImageChange(".pic13", ["Images/pic10.webp", "Images/pic8.webp"], 3);
  