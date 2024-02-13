let displayPassword = document.querySelector("[dispaly-password]");
let displayLength = document.querySelector("[display-length]");
let inputSlider = document.querySelector("[input-slider]");
let copyButton = document.querySelector("[copybtn]");
let displayStrength = document.querySelector(".indicator");
let checkboxArray = document.querySelectorAll("input[type=checkbox]");
let checkUppercase = document.querySelector("#uppercase");
let checkLowercase = document.querySelector("#lowercase");
let checkNumbers = document.querySelector("#numbers");
let checkSymbols = document.querySelector("#symbols");
let generateBtn = document.querySelector(".generatebtn");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let copyMsg = document.querySelector("[copyMesg]")

let passwordLength = 10;
let password = "";
let noOfCheckboxes = 0;
handleSlider();

function handleSlider() {

    inputSlider.value = passwordLength;
    displayLength.innerText = passwordLength;

}
function getRanInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRanUppercase() {
    return String.fromCharCode(getRanInt(65, 91));
}
function getRanLowercase() {
    return String.fromCharCode(getRanInt(97, 123));
}
function getRanNumber() {
    return (getRanInt(0, 9));
}
function getRanSymbol() {
    const randNum = getRanInt(0, symbols.length);
    return symbols.charAt(randNum);
}

function shufflePassword(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function calculateStrength() {

    if (noOfCheckboxes == 4) {

        return "#0f0";
    }
    if (noOfCheckboxes == 3) {

        return "#ff0";
    }
    return "#f00";
}


async function handleClipboard() {

    try {
        await navigator.clipboard.writeText(displayPassword.value);
        copyMsg.innerText = "copied";

    }
    catch (e) {
        copyMsg.innerText = "Failed"

    }
    if (displayPassword.value) {
        copyMsg.classList.add("active");
        setTimeout(() => {
            copyMsg.classList.remove("active");
        }, 2000);
    }

}

function generatePassword() {

    password = "";
    noOfCheckboxes = 0;
    checkboxArray.forEach((checkbox) => {
        if (checkbox.checked) {
            noOfCheckboxes++;
        }
    })
    if (noOfCheckboxes == 0) {
        return;
    }

    if (noOfCheckboxes > passwordLength) {
        passwordLength = noOfCheckboxes;
        handleSlider();
    }

    let funcArr = [];

    if (checkUppercase.checked) {
        password += getRanUppercase();
        funcArr.push(getRanUppercase);
    }
    if (checkLowercase.checked) {
        password += getRanLowercase();
        funcArr.push(getRanLowercase);
    }
    if (checkNumbers.checked) {
        password += getRanNumber();
        funcArr.push(getRanNumber);
    }
    if (checkSymbols.checked) {
        password += getRanSymbol();
        funcArr.push(getRanSymbol);
    }

    for (let i = 0; i < (passwordLength - noOfCheckboxes); i++) {
        let randInt = getRanInt(0, funcArr.length);
        password += funcArr[randInt]();
    }
    password = shufflePassword(Array.from(password));
    displayPassword.value = password;

    let indicatorColor = calculateStrength();

    displayStrength.style.backgroundColor = indicatorColor;
    displayStrength.style.boxShadow = `0px 0px 12px 1px ${indicatorColor}`;

}

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

generateBtn.addEventListener('click', () => {
    generatePassword();
})
generateBtn.addEventListener('mouseover', () => {
    if (noOfCheckboxes > 0) {
        generateBtn.style.cursor = 'pointer';

    }
})

copyButton.addEventListener('click', () => {
    handleClipboard();

})
copyButton.addEventListener('mouseover', () => {
    if (displayPassword.value) {
        copyButton.style.cursor = 'pointer';
    }

})
