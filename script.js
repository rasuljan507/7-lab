// Массив вопросов и ответов
const questions = [
  {
    question: "Какой оператор используется для объявления переменной в JavaScript?",
    answers: ["var", "let", "const", "Все перечисленные"],
    correct: 3
  },
  {
    question: "Какой метод используется для вывода в консоль?",
    answers: ["log()", "console.print()", "console.log()", "print()"],
    correct: 2
  },
  {
    question: "Какой тип вернёт typeof null?",
    answers: ["null", "object", "undefined", "number"],
    correct: 1
  },
  {
    question: "Что такое DOM?",
    answers: ["Язык программирования", "Система управления", "Объектная модель документа", "Фреймворк"],
    correct: 2
  },
  {
    question: "Чем отличается let от var?",
    answers: ["let работает глобально", "var имеет блочную область видимости", "let имеет блочную область видимости", "var не существует"],
    correct: 2
  },
  {
    question: "Как создать массив в JavaScript?",
    answers: ["array = {}", "array = []", "array = ()", "array = new Object()"],
    correct: 1
  },
  {
    question: "Что делает метод addEventListener?",
    answers: ["Добавляет элемент на страницу", "Удаляет элемент", "Добавляет обработчик события", "Меняет стиль"],
    correct: 2
  },
  {
    question: "Какая функция показывает диалог с кнопкой 'ОК'?",
    answers: ["confirm()", "prompt()", "alert()", "show()"],
    correct: 2
  },
  {
    question: "Что вернёт выражение 2 + '2' в JavaScript?",
    answers: ["4", "22", "NaN", "undefined"],
    correct: 1
  },
  {
    question: "Как остановить выполнение функции?",
    answers: ["break", "stop", "exit", "return"],
    correct: 3
  }
];


let currentQuestion = 0;
let score = 0;

// DOM-элементы
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result");
const restartButton = document.getElementById("restart");

// Загрузка вопроса
function loadQuestion() {
  const current = questions[currentQuestion];
  questionElement.textContent = current.question;
  answersContainer.innerHTML = "";

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer");
    button.onclick = () => checkAnswer(index);
    answersContainer.appendChild(button);
  });

  nextButton.style.display = "none";
}

// Проверка ответа
function checkAnswer(index) {
  const buttons = document.querySelectorAll(".answer");
  buttons.forEach(button => button.disabled = true);

  const correctIndex = questions[currentQuestion].correct;

  buttons.forEach((button, i) => {
    const icon = document.createElement("span");
    icon.style.marginLeft = "10px";
    icon.style.fontSize = "18px";

    if (i === correctIndex) {
      button.classList.add("correct");
      icon.textContent = "✅";
    }

    if (i === index && i !== correctIndex) {
      button.classList.add("wrong");
      icon.textContent = "❌";
    }

    button.appendChild(icon);
  });

  if (index === correctIndex) score++;

  nextButton.style.display = "inline-block";
}


// Следующий вопрос
nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// Результат
function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  resultContainer.style.display = "block";
  resultText.textContent = `Вы ответили правильно на ${score} из ${questions.length} вопросов.`;
}

// Перезапуск викторины
restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultContainer.style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  loadQuestion();
});

// Запуск викторины
loadQuestion();
