let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyNameInput = document.querySelector('input[name="name"]');
  const toyCollection = document.getElementById("toy-collection");
  const toyForm = document.querySelector('form[class="add-toy-form"]');
  const toyImageInput = document.querySelector('input[name="image"]');
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
  .then(response => response.json())
  .then( toys => {
    
    
    for (element of toys) {
      const card = document.createElement('div');
      card.className = 'card'
      


      const toyName = document.createElement('h2');
      toyName.textContent = element.name;
      card.appendChild(toyName)


      const img = document.createElement('img');
      img.src = element.image;
      img.className = 'toy-avatar';
      card.appendChild(img)


      const likes = document.createElement('p');
      likes.textContent = `${element.likes} likes`;
      card.appendChild(likes)


      const btn = document.createElement(`button`);
      btn.className = 'like-btn';
      btn.innerText = 'Like';
      btn.id = element.id;
      card.appendChild(btn)

      toyCollection.appendChild(card)

      btn.addEventListener('click', () => {
        console.log("I was clicked!")
        const toyId = btn.id;
        const newNumberOfLikes = element.likes +1;
      
        fetch(`http://localhost:3000/toys/${element.id}`, {
          method: "PATCH",
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": newNumberOfLikes
          })
        })
        .then(response => response.json())
        .then(toyLikes => {
          console.log(toyLikes)
          element.likes = toyLikes.likes;
          likes.textContent = `${toyLikes.likes} likes`;
        })
  })}
toyForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log("data submitted successfully")
  const toySubmission = {
      name: toyNameInput.value,
      image: toyImageInput.image,
      likes: 0
    }
fetch("http://localhost:3000/toys", {
  method: "POST",
  headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},
body: JSON.stringify(toySubmission)
})
.then(response => response.json())
.then(newToy => {
  console.log("received newToy data", newToy)
  const newCard = document.createElement("div");
  newCard.className = "card";

  const newName = document.createElement("h2");
  newName.textContent = newToy.name;
  newCard.appendChild(newName)

  const newImg = document.createElement("img");
  newImg.src = newToy.image;
  newImg.className = "toy-avatar";
  newCard.appendChild(newImg);

  const newToyLikes = document.createElement("p");
  newToyLikes.textContent = `${newToy.likes} likes`;
  newCard.appendChild(newToyLikes);

  const newCardsBtn = document.createElement("button");
  newCardsBtn.id = newToy.id
  newCardsBtn.className = "like-btn";
  newCardsBtn.id = newToy.id
  newCard.appendChild(newCardsBtn)

  toyCollection.appendChild(newCard)
})


})
})

  .catch(error => console.error(error));
});
