const getButton = document.getElementById("get-btn");
const postButton = document.getElementById("post-btn");
const [id, realname] = document.getElementsByTagName("p");
console.log(postButton);

getButton.addEventListener("click", () => {
  // XMLHttpRequest 객체(인스턴스) 생성
  const xhr = new XMLHttpRequest();

  // 요청을 보낼 준비
  xhr.open("GET", "/users");

  // 데이터 로딩(응답)이 완료되었을 때, 핸들러 함수 호출

  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const responseData = JSON.parse(xhr.response);
      console.log(responseData);

      const firstData = responseData[0];
      console.log(firstData);
      id.textContent = firstData.id;
      realname.textContent = firstData.name;
    }
  };
});

//postButton.addEventListener('이벤트',콜백함수)
postButton.addEventListener("click", () => {
  //XMLHttpRequest 객체 생성
  const xhr = new XMLHttpRequest();
  //HTTP요청준비
  xhr.open("POST", "/users");
  // header(Content-Type(key): text/plain(value)=>json type)
  xhr.setRequestHeader("Content-type", "application/json");

  //HTTP 요청 상태 확인
  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      console.log(xhr.response);
    }
  };
  //data.json 데이터 추가(json 형태)
  const newUser = {
    id: 11,
    name: "kwon",
    username: "kwonjunhyeuk",
    company: {
      id: "p1",
      name: "playdata",
    },
  };
  //데이터 변환
  const toJSON = JSON.stringify(newUser);

  //HTTP 요청 전송 (데이터를 보내는곳)
  xhr.send(toJSON);
});

//npx json-server --watch data.json
//package.json안에 넣은 후에 ("start"로 감싸서) terminal안에 npm start
//port번호는 이제 server는 3000번 서버를 가지고 오고 /index.html로 가지고 와야한다.
