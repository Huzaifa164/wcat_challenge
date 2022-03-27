#!/usr/bin/env node
let inputArr = process.argv.slice(2);
// console.log(inputArr);
let fs = require("fs");
const { arrayBuffer } = require("stream/consumers");
let count = 1;
// checking if file exist or not
function checkFile(fileName){
    let doesExist = fs.existsSync(fileName);
    if(doesExist){
        return true;
    }
    // else if(inputArr[1].charAt(0) == '-'){
    //     return true;
    // }
    else{
        console.error(`${fileName} does not exist`);
        return false;
    }
}

function displayContent(fileName){
    let content = fs.readFileSync(fileName);
    console.log("" + content);
}

function reduceBreak(fileName){
    let obj = fs.readFileSync(fileName).toString().split("\r\n");
    // console.log(obj);
    for(let i = 0; i < obj.length; i++){
        if(obj[i] == '' && obj[i - 1] == ""){
            obj[i] = null;
        }        
        else if(obj[i] == '' && obj[i - 1] == null){
            obj[i] = null;
        }
    }
    let tempArr = [];
    for (let i = 0; i < obj.length; i++) {
        if (obj[i] != null) {
            tempArr.push(obj[i])
        }
    }
    obj = tempArr;
    return obj;
}

function onlyContentNumber(fileName, count){
    let contentObj = fs.readFileSync(fileName).toString().split("\n");
    // console.log(contentObj);    
    for(let i = 0; i < contentObj.length; i++){
        if(contentObj[i] != '\r'){
            console.log(`${count++} ${contentObj[i]}`);
        }       
        else{
            console.log(contentObj[i]);
        }
    }
    return count;
}

function giveNumber(fileName, count){
    let obj = fs.readFileSync(fileName).toString().split("\n");
    for(let i = 0; i < obj.length; i++){
        console.log(`${count++} ${obj[i]}`);        
    }
    return count;
}


if(!(inputArr[0].charAt(0) == '-')){
    for(let i = 0; i < inputArr.length; i++){
        if(checkFile(inputArr[i])){
            displayContent(inputArr[i]);
        }            
    }   
}
else if((inputArr[0] == '-n' && inputArr[1] == '-b') || (inputArr[0] == '-b' && inputArr[1] == '-n')){
    console.error("Command will not work.");
}
else if((inputArr[0] == '-n' && inputArr[1] == '-s') || (inputArr[0] == '-s' && inputArr[1] =='-n')){
    let returnVal;
    for(let i = 2; i < inputArr.length; i++){
        if(checkFile(inputArr[i])){
           returnVal = reduceBreak(inputArr[i]);
           for(let j = 0; j < returnVal.length; j++){
               console.log((count++) + " " + returnVal[j]);
           }
        }
    }
}
else if((inputArr[0] == '-b' && inputArr[1] == '-s') || (inputArr[0] == '-s' && inputArr[1] =='-b')){
    let returnVal;
    for(let i = 2; i < inputArr.length; i++){
        if(checkFile(inputArr[i])){
           returnVal = reduceBreak(inputArr[i]);
        //    console.log(returnVal[i]);
           for(let j = 0; j < returnVal.length; j++){
               if(returnVal[j] != ''){
                    console.log(`${count++} ${returnVal[j]}`);
               }
               else{
                   console.log(returnVal[j]);
               }
               
           }
        }
    }
}
else if(inputArr[0] == '-s'){
    let returnVal;
    for(let i = 1; i < inputArr.length; i++){
        if(checkFile(inputArr[i])){
           returnVal = reduceBreak(inputArr[i]);
           for(let j = 0; j < returnVal.length; j++){
               console.log(returnVal[j]);
           }
        }
    }
}
else if(inputArr[0] == '-n'){
    for(let i = 1; i < inputArr.length; i++){
        if(checkFile(inputArr[i])){
            count = giveNumber(inputArr[i], count);
        }
    }
}
else if(inputArr[0] == '-b'){
    for(let i = 1; i < inputArr.length; i++){
        if(checkFile(inputArr[i])){
            count = onlyContentNumber(inputArr[i], count);
        }
    }
}