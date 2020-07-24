const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
  //Finding event target = <button></button>
  const btn = event.target;
  //Finding <button>'parentNode = <li id="#"></li>
  const li = btn.parentNode;
  //delete <li> from <ul>
  toDoList.removeChild(li);
  //Array filter = ture인 아이템들만 가지고 새로운 array 생성
  const cleanToDos = toDos.filter(function(toDo){
    //return 조건에 만족하는 것 (모든 toDo.id가 li의 id와 같지 않을 때)으로
    //Array 재생성
    //parseInt = string을 int로 변환
    return toDo.id != parseInt(li.id);
  });
  // toDos 재할당이 필요하므로 = const -> let (nodad coder:VanillaJavaScript3-7)
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(){
  //localStorage는 string을 value로 취급하므로
  //Array Objec를 JSON.stringify해서
  //string으로 변환해서 setItem한다
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("span");
  const span = document.createElement("span");
  //when add new item after delete, occured? problem.
  //The problem is to make same Id.
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text : text,
    id : newId
  }
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos(){
  //localStorage에서 'toDOS'를 Key로 하는 것을 가져오자
  const loadedToDos = localStorage.getItem(TODOS_LS);
  //가져올께 있으면
  if(loadedToDos !== null){
      //JSON.parse = string을 Object or Array로 반환
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function(toDo){
        paintToDo(toDo.text);
      });
  }
  // 가져올께 없으면  else (loadedToDos == null) '할 일을 입력하세요'
}

function init(){
  loadToDos();      //ToDos 불러오기
  //toDoForm submit하면 handleSubmit함수 실행
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
