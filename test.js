document.addEventListener("DOMContentLoaded", function () {
  let videoContainer = document.querySelector(".animation-video"),
    video = videoContainer.querySelector(".animation-video video"),
    testWrapper = videoContainer.querySelector(".test_wrapper"),
    blocks = videoContainer.querySelectorAll(".blocks"),
    instruction = videoContainer.querySelector(".instruction"),
    btnToSecondPart = videoContainer.querySelector(".btnToSecondPart"),
    totalVideo = videoContainer.querySelector(".total-video"),
    mainSection = document.querySelector('#main'),
    totalVideoImg = document.querySelector('.total-video-img');

  let step = null,
    start = false,
    clickedBlocks = null;

  videoContainer.addEventListener('click', () => {
    videoContainer.classList.add('active');
    video.play();
    mainSection.classList.add('hide');
    blocks.forEach((elem) => {
      elem.classList.remove("hide");
    });
  })

  video.addEventListener('ended', () => {
    step = 1;
    testWrapper.classList.remove("hide");
    instruction.querySelector("span").innerText = "Ознакомьтесь с основными видами строповки. Наведите курсором мыши на каждый вид строповки";
    instruction.classList.remove("hide");
  });

  testWrapper.addEventListener('click', (e) => {
    e.stopPropagation();
  })

  instruction.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
      instruction.classList.add("hide");
      if (clickedBlocks === null) clickedBlocks = [];
      start = true;
    }
  });

  blocks.forEach((elem) => {
    elem.addEventListener("mouseover", (e) => {
      if (!start || step !== 1) return;
      let video = elem.querySelector("video");
      video.play();
      if (!clickedBlocks.includes(elem.dataset.id)) {
        elem.classList.add("active");
        clickedBlocks.push(elem.dataset.id);
      }
      if (clickedBlocks.length === 3) {
        btnToSecondPart.classList.remove("hide");
      }
    })
  });

  btnToSecondPart.addEventListener('click', () => {
    step = 2;
    start = false;
    blocks.forEach((elem) => {
      elem.classList.remove('active');
      let video = elem.querySelector("video");
      video.currentTime = 0;
    });
    videoContainer.classList.add("second-part");
    totalVideoImg.classList.remove("hide");
    btnToSecondPart.classList.add("hide");
    instruction.querySelector("span").innerText = "Выберите и нажмите на подходящий вид строповки для данного груза";
    instruction.classList.remove("hide");
  });

  let correct = false;
  let played = false;

  blocks.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      if (!start || step !== 2 || played) return;
      correct = elem.dataset.val === "true" ? true : false;
      instruction.classList.add("hide");
      elem.classList.add("center");
      blocks[1].style.zIndex = 0;
      let video = totalVideo.querySelector("video");
      video.setAttribute('src', elem.dataset.video);
      setTimeout(() => {
        totalVideo.classList.remove("hide");
        totalVideoImg.classList.add("hide");
        video.play();
        played = true;
      }, 1500);
    })
  });

  totalVideo.querySelector("video").addEventListener('ended', () => {
    totalVideo.classList.add("hide");
    setTimeout(() => {
      blocks[1].style.zIndex = null
    }, 1500)
    videoContainer.querySelector('.blocks.center').classList.remove('center');
    if (correct) {
      step = 3;
      videoContainer.querySelector(".blocks[data-val='true'] img").setAttribute("src", "./assets/cool.jpg")
      instruction.querySelector("span").innerHTML = "Отлично! <br/> Вы все сделали верно!";
      instruction.style.textAlign = "center";
      instruction.querySelector("button").innerText = "Вернуться на сайт!";
      instruction.querySelector("button").addEventListener('click', (e) => {
        e.stopPropagation();
        step = null;
        start = false;
        videoContainer.querySelector(".blocks[data-val='true'] img").setAttribute("src", "./assets/2-1.jpg")
        instruction.querySelector("button").innerText = "OK";
        clickedBlocks = null;
        instruction.style.textAlign = null;
        videoContainer.classList.remove('active');
        testWrapper.classList.add("hide");
        totalVideoImg.classList.add("hide");
        correct = false;
        played = false;
        videoContainer.classList.remove("second-part");
        videoContainer.querySelectorAll('.blocks.center').forEach((elem) => {
          elem.classList.remove('center');
          elem.classList.remove('hide');
        })
        mainSection.classList.remove('hide');
      }, {
        once: true
      });
    } else {
      instruction.querySelector("span").innerText = "Ваш выбор неверен";
      totalVideoImg.classList.remove("hide");
    }
    instruction.classList.remove("hide");
    played = false;
  })
})