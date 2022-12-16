let body = document.querySelector("body");
const container = document.createElement("div");
container.className = "container";
body.appendChild(container);

let stateTxt = "";
let leftNumbers = "";
let rightNumbers = "";
let sign = "";
let resultTxt=''
let p = document.createElement("p");
let P_ans = document.createElement("p");

function screen(x) {
  let show = document.createElement("div");
  show.className = "show";
  show.appendChild(p);

  let ans = document.createElement("div");
  ans.className = 'answer';
  ans.appendChild(P_ans);
  x.appendChild(show);
  x.appendChild(ans);
}

//holds the numbers and signs
function actions(x) {
  let action_box = document.createElement("div");
  action_box.className = "action_box";

  numbers_holder(action_box);
  operators(action_box);
  x.appendChild(action_box);
}

// holds the number tiles
function numbers_holder(x) {
  let comp = {
    first: [7, 8, 9, 4, 5, 6, 1, 2, 3, ".", 0, "="],
  };
  let numbers_box = document.createElement("div");
  numbers_box.className = "num_box";
  for (let i = 0; i < 12; i++) {
    numbers(numbers_box, comp.first[i]);
  }
  x.appendChild(numbers_box);
}

// holds the signs
function operators(x) {
  let second = ["DEL", "/", "x", "-", "+"];
  let signs = document.createElement("div");
  signs.className = "signs";

  for (let i = 0; i < 5; i++) {
    signsBoxHolder(signs, second[i]);
  }
  x.appendChild(signs);
}

// function that displays the signs
function signsBoxHolder(x, txt) {
  let signs_box = document.createElement("div");
  signs_box.className = "signs_box";
  signs_box.innerHTML = txt;

  function prop() {
    if (txt == "DEL") {
      DEL();

      return;
    }

    // add the sign and recognizes it
    if (sign) {
      return;
    }
    sign = txt;
    //set the keys in screen
    stateTxt += ` ${txt}`;
    p.innerHTML += ` ${txt}`;
  }
  signs_box.addEventListener("click", prop);
  x.appendChild(signs_box);
}

//function that displays the numbers
function numbers(x, txt) {
  txt = txt.toString();
  let num_box = document.createElement("div");
  num_box.className = "nums";
  num_box.innerHTML = txt;

  function prop() {
    if (sign) {
      if (Number(txt) || txt =='0') {
        rightNumbers += `${txt}`;
      }
    } else {
      if (Number(txt) || txt=='0') {
        leftNumbers += `${txt}`;
      }
    }

    if (txt == "=") {
      leftNumbers = Number(leftNumbers);
      rightNumbers = Number(rightNumbers);
      // console.log(compute(leftNumbers, rightNumbers));
      let resultTxt=compute(leftNumbers, rightNumbers);
      P_ans.innerHTML=resultTxt;

    //   console.log(leftNumbers, rightNumbers);
    }

    ///dont display period and equal signs
    if (txt == "=" || txt == ".") {
      return;
    }
    p.innerHTML += ` ${txt}`;
    stateTxt += ` ${txt}`;

  }
  num_box.addEventListener("click", prop);
  x.appendChild(num_box);
}

/////////////////////////

screen(container);
actions(container);

// console.log(p.innerHTML);
function DEL() {
  // delete one character at a time
  if(stateTxt){
      
      console.log(stateTxt);
      stateTxt = stateTxt.slice(0, -2);
      p.innerHTML = stateTxt;
    }
    if(!resultTxt){
        P_ans.innerHTML=resultTxt;
    }


  //clear all holders
  if (!stateTxt) {
    leftNumbers = "";
    rightNumbers = "";
    sign = "";
    resultTxt='';

    return;
  }
}

function Add(a, b) {return a + b;}
function Substract(a, b) {return a - b;}
function Multiply(a, b) {return a * b;}
function Divide (a, b) {return a / b;}
////
function compute(a, b) {
  // call the need math function

  switch (sign) {
    case "+":
      return Add(a, b);
      break;
    case "-":
      return Substract(a, b);
      break;
    case "x":
      return Multiply(a, b);
      break;
    case "/":
      return Divide(a, b);
      break;
    default:
      console.log("none");
  }
}
