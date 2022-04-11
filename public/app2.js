const getButton = document.getElementById("get-btn");
const postButton = document.getElementById("post-btn");

getButton.addEventListener("click", () => {
  // XMLHttpRequest 객체(인스턴스) 생성
  const xhr = new XMLHttpRequest();

  // 요청을 보낼 준비
  xhr.open("GET", "/users");

  // 데이터 로딩(응답)이 완료되었을 때, 핸들러 함수 호출
  xhr.onload = () => {
    if (xhr.status === 200) {
      const responseData = xhr.responseText;
      const parsedData = JSON.parse(responseData); // string 형태로 받게됨

      //table형태로 가지고 오기
      for (let i = 0; i < parsedData.length; i++) {
        const table = document.getElementById("fruits");

        // 새 행(Row) 추가
        const newRow = table.insertRow();

        // 새 행(Row)에 Cell 추가
        const newCell1 = newRow.insertCell(0);
        const newCell2 = newRow.insertCell(1);
        const newCell3 = newRow.insertCell(2);

        // Cell에 텍스트 추가
        newCell1.textContent = parsedData[i].id;
        newCell2.textContent = parsedData[i].name;
        newCell3.textContent = parsedData[i].address.zipcode;
      }
    }
  };
  // 데이터 전송
  xhr.send();
});

//
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
