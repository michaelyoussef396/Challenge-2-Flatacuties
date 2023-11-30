// Your code here

document.addEventListener('DOMContentLoaded', () => {
    const charactersFromDB = [
      {
        "id": 1,
        "name": "Mr. Cute",
        "image": "https://thumbs.gfycat.com/EquatorialIckyCat-max-1mb.gif",
        "votes": 0
      },
      {
        "id": 2,
        "name": "Mx. Monkey",
        "image": "https://thumbs.gfycat.com/FatalInnocentAmericanshorthair-max-1mb.gif",
        "votes": 0
      },
      {
        "id": 3,
        "name": "Ms. Zebra",
        "image": "https://media2.giphy.com/media/20G9uNqE3K4dRjCppA/source.gif",
        "votes": 0
      },
      {
        "id": 4,
        "name": "Dr. Lion",
        "image": "http://bestanimations.com/Animals/Mammals/Cats/Lions/animated-lion-gif-11.gif",
        "votes": 0
      },
      {
        "id": 5,
        "name": "Mme. Panda",
        "image": "https://media.giphy.com/media/ALalVMOVR8Qw/giphy.gif",
        "votes": 0
      }
    ];

    
  
    const characterBar = document.getElementById('character-bar');
  
    charactersFromDB.forEach(character => {
      const span = document.createElement('span');
      span.textContent = character.name;
      span.addEventListener('click', () => {
        displayCharacterDetails(character);
      });
      characterBar.appendChild(span);
    });
  
    // Task 2: Display Character Details
    function displayCharacterDetails(character) {
      const detailedInfo = document.getElementById('detailed-info');
      detailedInfo.innerHTML = '';
  
      const name = document.createElement('p');
      name.textContent = character.name;
  
      const image = document.createElement('img');
      image.src = character.image;
      image.alt = character.name;
      image.style.width = '200px'; // Adjust as needed
  
      const voteCount = document.createElement('h4');
      voteCount.textContent = `Total Votes: ${character.votes}`;
      voteCount.id = 'vote-count';
  
      const votesForm = document.createElement('form');
      const votesInput = document.createElement('input');
      votesInput.type = 'text';
      votesInput.placeholder = 'Enter Votes';
      votesInput.id = 'votes';
      votesInput.name = 'votes';
      const submitButton = document.createElement('input');
      submitButton.type = 'submit';
      submitButton.value = 'Add Votes';
      
      votesForm.appendChild(votesInput);
      votesForm.appendChild(submitButton);
  
      detailedInfo.appendChild(name);
      detailedInfo.appendChild(image);
      detailedInfo.appendChild(voteCount);
      detailedInfo.appendChild(votesForm);
  
      // Task 3: Update votes for the selected character
      votesForm.addEventListener('submit', event => {
        event.preventDefault();
        const votesValue = parseInt(votesInput.value, 10);
  
        if (!isNaN(votesValue)) {
          character.votes += votesValue;
          voteCount.textContent = `Total Votes: ${character.votes}`;
        }
      });
    }
  
    // Bonus Task 1: Reset Votes
    const resetButton = document.getElementById('reset-btn');

    resetButton.addEventListener('click', () => {
        charactersFromDB.forEach(character => {
            character.votes = 0;
            fetch(`http://localhost:3000/characters/${character.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ votes: 0 })
            })
            .then(response => response.json())
            .then(updatedCharacter => {
                // Update UI if necessary
            })
            .catch(error => console.error(error));
        });
    });

    // Bonus Task 2: Add New Character
    const characterForm = document.getElementById('character-form');
  
    characterForm.addEventListener('submit', event => {
      event.preventDefault();
      const newName = document.getElementById('name').value;
      const newImageURL = document.getElementById('image-url').value;
  
      const newCharacter = {
        name: newName,
        image: newImageURL,
        votes: 0
      };
  
      fetch('http://localhost:3000/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCharacter)
      })
      .then(response => response.json())
      .then(addedCharacter => {
        // Update UI to display the added character in character-bar and detailed-info
        const characterBar = document.getElementById('character-bar');
        const newSpan = document.createElement('span');
        newSpan.textContent = addedCharacter.name;
        newSpan.addEventListener('click', () => {
          displayCharacterDetails(addedCharacter);
        });
        characterBar.appendChild(newSpan);
  
        // Show details of the added character in detailed-info
        displayCharacterDetails(addedCharacter);
      })
      .catch(error => console.error(error));
    });
  
    // Extra Bonus Tasks
    // Add logic for PATCH and POST requests here for the extra bonus tasks
  
  });
  