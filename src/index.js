let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyCollection = document.getElementById("toy-collection")
  const toyFormContainer = document.querySelector(".container");
  const addToyForm = document.querySelector(".add-toy-form")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
    fetch("http://localhost:3000/toys")
    .then(res=>res.json())
    .then(data=>data.forEach(toy=>{
      const card = document.createElement("div")
      card.className = "card"
      card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p id="L${toy.id}">${toy.likes} Likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
      `
      toyCollection.appendChild(card)
      likesIncrementer(toy)
    }))

    addToyForm.addEventListener("submit",(event)=>{
      event.preventDefault()
      fetch("http://localhost:3000/toys",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json"
        },
        body:JSON.stringify({
          "name":addToyForm.name.value,
          "image":addToyForm.image.value,
          "likes":0
        })
      })
      .then(res=>res.json())
      .then(data=>{
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.image}" class="toy-avatar" />
        <p>${data.likes} Likes</p>
        <button class="like-btn" id="${data.id}">Like ❤️</button>
      `
      toyCollection.appendChild(card)

      })
    })
    function likesIncrementer(toy){
      document.getElementById(toy.id).addEventListener("click",()=>{
        toy.likes++
        fetch(`http://localhost:3000/toys/${toy.id}`,{
          method:"PATCH",
          headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
          },
          body:JSON.stringify({
            likes:toy.likes
          })

        })
        .then(res=>res.json())
        .then((data)=>{
          document.getElementById(`L${data.id}`).textContent = `${data.likes} Likes`
        })
      })

    }
});
