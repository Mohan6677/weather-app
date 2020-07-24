console.log('Client Side JavaScript');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector("#msg-1")
const msg2 = document.querySelector("#msg-2")


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc = search.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('/weather?address='+loc).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            msg1.textContent = data.error
        }
        else{
            msg1.textContent = data.location.toString()
            msg2.textContent=data.forecast.weather[0].description.toString()
            console.log(data.forecast)
        }
    })
    })
})