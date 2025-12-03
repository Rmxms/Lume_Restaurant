document.addEventListener("DOMContentLoaded", function () {
    const slides = [
      [
        "../pics/p1.JPG",
        "../pics/p11.AVIF",
        "../pics/p111.JPG"
      ],
      [
        "../pics/p2.JPG",
        "../pics/p22.JPG",
        "../pics/p222.JPG"
      ]
    ];
  
    const indices = [0, 0];
  
    document.querySelectorAll(".about-slider").forEach(slider => {
      const sliderId = parseInt(slider.getAttribute("data-slider"), 10);
      const img = slider.querySelector("img");
  
      slider.querySelectorAll(".about-slider-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const dir = parseInt(btn.getAttribute("data-dir"), 10); // -1 or 1
          const images = slides[sliderId];
  
          let i = indices[sliderId] + dir;
          if (i < 0) i = images.length - 1;
          if (i >= images.length) i = 0;
  
          indices[sliderId] = i;
          img.src = images[i];
        });
      });
    });
  });
  