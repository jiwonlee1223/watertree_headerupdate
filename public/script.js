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

function openNewWindow(url) {
    window.open(url, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
  }  