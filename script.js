const imgs = document.getElementById('imgs')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')
const majorBtn = document.getElementById('majorBtn')
const minorBtn = document.getElementById('minorBtn')
const beginBtn = document.getElementById('begin')
const banner = document.getElementById('banner')

const img = document.querySelectorAll('#imgs img')
const backgroundColor = banner.style.backgroundColor


let index = 0;
let placeSaver = index;
let score = 0;
const major = 0;
const minor = 1;
let quality = major;

let quizMin = 0;
let quizMax = 7;
let firstInt = 50;
let lastInt = firstInt + 35;
let intervalArray = [];
let randomInterval = 0;

let firstPage = -1;
let infoPage = 0;
let timedQuizPage = 1;
let masteryQuizPage = 2;
let intervalPage = 3;
let pageType = firstPage;

let preTest = 0;
let postTest = 1;
let naturalsTest = 1;
let timedQuizNum = preTest;
let lastPage = 0;
let timedQuiz = 0;
let masteryQuiz = 1;
let quizType = timedQuiz;
let mastered = false;
let masteryQuizNum = 1;

let countdown = 0;
let preTestScore = 0;
let postTestScore = 0;
let instructionFinished = false;

let isDemo = true;
let demoCount = 0;


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
 
function setArray(min, max)
{
    for (let i = 0; i < (max - min); i++){
        intervalArray[i] = i + min
    }
    intervalArray[max-min] = 'x'

    for (let j = (max - min) - 1; j > 0; j--) {
        let k = Math.floor(Math.random() * (j + 1));
        let temp = intervalArray[j];
        intervalArray[j] = intervalArray[k];
        intervalArray[k] = temp;
    }
}
function startTimer() {
    let minutes = ''
    let seconds = ''
    //speed up
    let timer = 60
    
    countdown = setInterval(function () {
        timer--
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        

        banner.innerHTML = `Score: ${score} Time: ${(minutes + ":" + seconds)}`;
        

        if (timer == 0) {
           
            clearInterval(countdown)
            
            index = placeSaver+1
            if (timedQuizNum === preTest){
                preTestScore = score;
                banner.innerHTML = (`Pretest score: ${preTestScore}/minute`)
                timedQuizNum = postTest 
            
            } else {
                postTestScore = score;
                banner.innerHTML = ('Speedy Thirds')
                instructionFinished = true
            }
            
            changeImage()
        }
    }, 1000);


}
function changeImage() {

    if (instructionFinished){
        
        imgs.style.transform = 'translateX(0px)'
        imgs.style.backgroundColor = 'white'
        imgs.style.display = 'block'
        imgs.style.padding = '10px 0px'
        imgs.style.textAlign = 'center'
        imgs.style.fontWeight = 'bold'
        majorBtn.style.visibility = 'hidden'
        minorBtn.style.visibility = 'hidden'

        let improvement = 0
       
        if (preTestScore != 0){
            improvement = Math.round((postTestScore - preTestScore)/preTestScore * 100)
        }
        imgs.innerHTML = (`<h3>Pretest score: ${preTestScore}/minute<br> Post Test score: ${postTestScore}/minute<br> Percent Improvement: ${improvement}%</h3><br><br>Did you improve?<br>
        <br>Can you use this method with other intervals? How about fifths? All fifths in C Major are perfect fifths except B-F!`) 
        console.log(imgs)

    }else { 

        console.log(`index ${index}`)

        if (img[index].classList.contains("firstPage")) {
            pageType = firstPage
        } else if (img[index].classList.contains("page")){
            pageType = infoPage
            banner.innerHTML = "Speedy Thirds" 
            banner.style.backgroundColor = backgroundColor
        }
        else if (img[index].classList.contains("timedQuiz")){
            pageType = timedQuizPage    
        } else if (img[index].classList.contains("masteryQuiz")){
            pageType = masteryQuizPage
        } else if (img[index].classList.contains("major") ||
                    img[index].classList.contains("minor")) {
            pageType = intervalPage
        }

        setButtons()

        if (index > (img.length - 1)) {
            index = 0;
        } else if (index < 0) {
            index = (img.length - 1)
        }

        imgs.style.transform = `translateX(${-index * 500}px)`
    }


    
}

function setButtons(){
    console.log(`pagetype ${pageType}`)
    if (pageType === firstPage){
        leftBtn.style.visibility = 'hidden'
        rightBtn.style.visibility = 'hidden'
        majorBtn.style.visibility = 'hidden'
        minorBtn.style.visibility = 'hidden'
        beginBtn.style.visibility = 'visible'
    }
    else if (pageType === infoPage){
     
        leftBtn.style.disabled = false
        leftBtn.style.visibility = 'visible'
        rightBtn.style.visibility = 'visible'
        majorBtn.style.visibility = 'hidden'
        minorBtn.style.visibility = 'hidden'
        beginBtn.style.visibility = 'hidden'
        
    } else if (pageType === timedQuizPage || pageType === masteryQuizPage){
        leftBtn.style.visibility = 'visible'
        rightBtn.style.visibility = 'hidden'
        majorBtn.style.visibility = 'hidden'
        minorBtn.style.visibility = 'hidden'
        beginBtn.style.visibility = 'visible'

    } else if (pageType === intervalPage){
        leftBtn.style.visibility = 'hidden'
        rightBtn.style.visibility = 'hidden'
        majorBtn.style.visibility = 'visible'
        minorBtn.style.visibility = 'visible'
        beginBtn.style.visibility = 'hidden'
    }
}


function runPreTest(){
    preTestScore = 0;
    quizType = timedQuiz;
    quizMin = firstInt;
    quizMax = lastInt;
    placeSaver = index;
    randomInterval = 0;
    
    setArray(quizMin,quizMax)
    startTimer()
    quiz();

}
function runPostTest(){
    postTestScore = 0;
    quizType = timedQuiz;
    quizMin = firstInt;
    quizMax = lastInt;
    placeSaver = index;
    randomInterval = 0;
    
    setArray(quizMin,quizMax)
    startTimer()
    quiz();

}

function runMasteryQuiz(){
    score = 0;
    quizType = masteryQuiz;
    randomInterval = 0;
    demoCount = 0;

    console.log(`running masteryQuizNum ${masteryQuizNum}`)
       
    if (masteryQuizNum === 1) {
        quizMin = firstInt
        quizMax = quizMin + 7
    } else if (masteryQuizNum === 2){
        quizMin = firstInt + 7
        quizMax = quizMin + 14
    } else if (masteryQuizNum === 3){
        quizMin = firstInt + 21
        quizMax = quizMin + 7
    } else if (masteryQuizNum === 4){
        quizMin = firstInt + 28
        quizMax = quizMin + 7
    } else {
        quizMin = firstInt
        quizMax = lastInt;
    }

    setArray(quizMin,quizMax)
    placeSaver = index;
    quiz();

}

function quiz(){

    if (quizType === masteryQuiz)
    {
        banner.innerHTML = (`Get 10 correct in a row: ${score}`)
    }

    
    console.log(`index: ${index}`)
        
    if (intervalArray[randomInterval] === 'x'){
        randomInterval = 0
    }
            
    index = intervalArray[randomInterval]
    randomInterval++    
    
    if (img[index].classList.contains("major")){
        quality = major;
    } else {
        quality = minor;
    }
//speed up
console.log(`demoCount ${demoCount}`)
    if ((quizType === masteryQuiz && score === 10) ||
        (quizType === masteryQuiz && demoCount === 5)){
    
        mastered = true
        
        masteryQuizNum++
        index = placeSaver + 1
        score = 0
        demoCount = 0;
    }
    changeImage()
}

rightBtn.addEventListener('click', () => {
    
    if (mastered === true){
        mastered = false
    }
    
    index++
    changeImage()

})

leftBtn.addEventListener('click', () => {

  


    if (mastered){
        masteryQuizNum--
        mastered = false
    }

    index--
    changeImage()
   
})

minorBtn.addEventListener('click', () => {
    
    demoCount++
    
    if (quality === minor){
        banner.style.backgroundColor = 'green'
        score++

    } else {
        banner.style.backgroundColor = 'red'
        if (quizType === masteryQuiz){
            score = 0
        }
    }
    setTimeout(() => {
        banner.style.backgroundColor = backgroundColor;
      }, 1000);
    quiz()
   
})

majorBtn.addEventListener('click', () => {
   
    demoCount++
    
    if (quality === major){
        banner.style.backgroundColor = 'green'
        score++
    } else {
        banner.style.backgroundColor = 'red'
        if (quizType === masteryQuiz){
            score = 0
        }
    }   
    setTimeout(() => {
        banner.style.backgroundColor = backgroundColor;
      }, 1000);
    quiz()
    
})



beginBtn.addEventListener('click', () => {
    if (pageType === timedQuizPage){
        if (timedQuizNum === preTest){
            runPreTest()
                           
        }
        else {
            runPostTest()
        }
    } else if (pageType === masteryQuizPage) {
    
        runMasteryQuiz()
    } else {
        index++
        changeImage()
    }
    
        
})

