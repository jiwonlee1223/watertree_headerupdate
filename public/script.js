const socket = io();

// 버튼 클릭 시 서버에 메시지 전송
function sendMessage() {
  socket.emit("clientMessage", "Hello from the client!");
}

// 서버로부터의 메시지 수신
socket.on("serverMessage", (message) => {
  const messageDiv = document.getElementById("serverMessage");
  messageDiv.textContent = message;
});

function scrollToImage(imageId) {
  const imageElement = document.getElementById(imageId);
  const headerHeight = document.querySelector('.header').offsetHeight; // 헤더 높이 가져오기

  // 이미지 요소가 있는 경우 스크롤 위치 설정
  if (imageElement) {
    window.scrollTo({
      top: imageElement.offsetTop - headerHeight, // 헤더 높이만큼 조정하여 스크롤
      behavior: 'smooth' // 부드러운 스크롤
    });
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 부드러운 스크롤 효과 추가
  });
}

// 스크롤 이벤트 리스너
document.addEventListener("scroll", () => {
  handleMainImageScale();
  handleImage2Fade("#image2");
  handleImage3Parallax(); 
  handleImage4Material();
});


// 클릭 이벤트 추가
document.querySelectorAll("#image2 img").forEach((image) => {
  image.addEventListener("click", () => handleImage2Click("#image2"));
});

// 메인 이미지 확대 처리
function handleMainImageScale() {
  const image = document.getElementById("main-image");
  const imageRect = image.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 이미지가 뷰포트에 보이는 비율 계산
  const visibleRatio = Math.max(
    0,
    Math.min(1, (windowHeight - imageRect.top) / windowHeight)
  );

  // 확대 비율 계산 (1 ~ 1.5배 확대)
  const scale = 1 + visibleRatio * 0.5;

  // 이미지 확대 적용
  image.style.transform = `scale(${scale})`;
}

// 특정 섹션의 이미지 전환 처리 (스크롤)
function handleImage2Fade(sectionId) {
  const section = document.querySelector(sectionId);
  const images = section.querySelectorAll("img");
  const sectionRect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 섹션이 화면 중앙에 가까울 때 효과 적용
  if (sectionRect.top < windowHeight / 2 && sectionRect.bottom > windowHeight / 2) {
    images[0].classList.remove("active");
    images[1].classList.add("active");
  } else {
    images[1].classList.remove("active");
    images[0].classList.add("active");
  }
}

// 특정 섹션의 이미지 전환 처리 (클릭)
function handleImage2Click(sectionId) {
  const section = document.querySelector(sectionId);
  const images = section.querySelectorAll("img");

  // 현재 활성화된 이미지를 확인
  if (images[0].classList.contains("active")) {
    images[0].classList.remove("active");
    images[1].classList.add("active");
  } else {
    images[1].classList.remove("active");
    images[0].classList.add("active");
  }
}

function handleImage3Parallax() {
  const section = document.getElementById("image3");
  const image2 = document.getElementById("image3-2");
  const image3 = document.getElementById("image3-3");

  const sectionRect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 섹션이 화면에 보일 때만 동작
  if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
    const scrollProgress = Math.max(
      0,
      Math.min(1, 1 - sectionRect.top / windowHeight)
    );

    // image2: 우측 상단에서 내려오는 효과
    const image2Start = -200; // 초기 위치 (px)
    const image2End = 30; // 최종 위치 (px)
    const image2Y = image2Start + (image2End - image2Start) * scrollProgress;
    image2.style.transform = `translateY(${image2Y}px)`;

    // image3: 오른쪽에서 반쯤 나타나는 효과
    const image3Start = -100; // 초기 위치 (px)
    const image3End = 0; // 최종 위치 (px)
    const image3X = image3Start + (image3End - image3Start) * scrollProgress;
    image3.style.transform = `translateX(${image3X}px)`;
  }
}

// 스크롤에 따라 이미지 확대 처리
function handleImage4Material() {
  const section = document.getElementById("image4");
  const materialImage = section.querySelector("img[alt='material']");
  const sectionRect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 섹션이 화면에 보일 때만 동작
  if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
    const scrollProgress = Math.max(
      0,
      Math.min(1, (windowHeight - sectionRect.top) / (windowHeight + sectionRect.height))
    );

    // 확대 비율 계산 (1 ~ 2배 확대)
    const scale = 1 + scrollProgress;
    materialImage.style.transform = `scale(${scale})`;
  }
}