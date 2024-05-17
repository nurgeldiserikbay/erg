document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".anim_slideInUp").forEach(function (elem) {
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function () {
        animate(elem)
      },
      once: true
    });
  });

  gsap.utils.toArray(".anim_left").forEach(function (elem) {
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function () {
        animate(elem, {
          x: -1000,
          y: 0
        })
      },
      once: true
    });
  });

  gsap.utils.toArray(".anim_right").forEach(function (elem) {
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function () {
        animate(elem, {
          x: 1000,
          y: 0
        })
      },
      once: true
    });
  });

  gsap.utils.toArray(".rect").forEach(function (elem) {
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function () {
        elem.classList.add("active");
      },
      once: true
    });
  });

  let currentPage = 0;
  let height = window.innerHeight;
  let logo = document.querySelector("#logo");
  let scrolling = false;

  window.addEventListener("resize", () => {
    height = window.innerHeight;
    scrolling = true;
    let currentScroll = document.body.scrollTop;
    scroll(currentScroll, currentPage * height);
  });

  document.addEventListener("keydown", (e) => {
    let currentScroll = document.body.scrollTop;
    if (e.keyCode === 40) {
      if (currentPage + 1 <= 7) {
        currentPage += 1;
      }
    } else if (e.keyCode === 38) {
      if (currentPage - 1 >= 0) {
        currentPage -= 1;
      }
    }
    scroll(currentScroll, currentPage * height);
    if (currentPage > 0) {
      logo.classList.add("active");
    } else {
      logo.classList.remove("active");
    }
  })

  function scroll(currentScroll, to) {
    scrolling = true;
    const delta = 10;
    let dir = currentScroll > to ? -1 : 1;
    let step = Math.abs((to - currentScroll) / delta);
    let interval = null;
    let scrollTop = document.body.scrollTop;

    function animateFunc() {
      if (step > 1) {
        step -= 1;
        scrollTop += dir * delta;
        document.body.scrollTop = scrollTop;
      } else {
        scrolling = false;
        document.body.scrollTop = to;
        clearInterval(interval);
      }
    }

    interval = setInterval(animateFunc, 4);
  }

  document.body.addEventListener("wheel", (e) => {
    if (scrolling) {
      return
    }
    let currentScroll = document.body.scrollTop;
    if (e.deltaY > 0) {
      if (currentPage + 1 <= 7) {
        currentPage += 1;
      }
    } else {
      if (currentPage - 1 >= 0) {
        currentPage -= 1;
      }
    }
    scroll(currentScroll, currentPage * height);
    if (currentPage > 0) {
      logo.classList.add("active");
    } else {
      logo.classList.remove("active");
    }
  })

  let firstVideo = document.querySelector(".first-video");
  let closeBtn = firstVideo.querySelector(".close-btn");
  let video = firstVideo.querySelector("video");
  let btn = firstVideo.querySelector(".play-btn");

  firstVideo.addEventListener("click", () => {
    firstVideo.style.cssText = "position: fixed; left:0; top: 0; width: 100vw; height: 100vh;z-index: 10;";
    closeBtn.classList.remove("hide");
    if (video.paused) {
      video.play();
      btn.classList.add("hide");
    } else {
      video.pause();
      btn.classList.remove("hide");
    }
    video.addEventListener("ended", () => {
      btn.classList.remove("hide");
      video.currentTime = 0;
      firstVideo.style.cssText = null;
      closeBtn.classList.add("hide");
    });
  })

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!video.paused) {
      video.pause();
    }
    firstVideo.style.cssText = null;
    closeBtn.classList.add("hide");
    btn.classList.remove("hide");
  });
});

function animate(elem, dir) {
  let delay = elem.dataset.delay || 0;
  let x = dir ? dir.x : 0,
    y = dir ? dir.y : 200;
  gsap.fromTo(elem, {
    x: x,
    y: y,
    autoAlpha: 0
  }, {
    duration: 1.5,
    delay: delay,
    x: 0,
    y: 0,
    autoAlpha: 1,
    ease: "circ",
    overwrite: "auto"
  });
}