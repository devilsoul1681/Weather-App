
let messageOne=document.querySelector('#message-1')
let messageSecond=document.querySelector('#message-2');
let messageThree=document.querySelector("#message-3");

messageOne.textContent="";


document.querySelector(".mainbutton").addEventListener("click",(e)=>{
    e.preventDefault();
    messageOne.textContent="Loading.."
    messageThree.textContent="";
    messageSecond.textContent="";
    let value=document.querySelector("input").value;
    fetch("/weather?address="+value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error;
            }
            else{
                messageOne.textContent=data.forecast;
                messageSecond.textContent=data.temperature+" degree C";
                messageThree.textContent=data.address
            }
        })
    })
    document.querySelector("input").value=null;
})