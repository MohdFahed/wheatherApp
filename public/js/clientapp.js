console.log("client side script running.....")



const wheatherForm = document.querySelector('form');
const search = document.querySelector('input');

const msgOne = document.querySelector('#messageOne');
const msgTwo = document.querySelector('#messageTwo');
 wheatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value;
    msgOne.textContent ='loading..';
    msgTwo.textContent ='';
    fetch('/wheather?address='+location).then((response)=>{
    response.json().then((data)=>{
       if(data.error){
            msgOne.textContent = data.error; 
            console.log(data.error);
       }else{
            msgOne.textContent = data.location;
            msgTwo.textContent = data.forcast;
            console.log(data.forcast);
            console.log(data.location);
       }
    
    })
})
 })