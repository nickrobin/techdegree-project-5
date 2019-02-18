//Don't do anything until the DOM is locked and loaded
$( document ).ready(function() {

//Get 12 random users from randomuser.me API
fetch('https://randomuser.me/api/?results=12&nat=us,dk,fr,gb')
  .then(response => response.json())
  .then(data => addUsers(data.results))

//Helper Function to add users to page
function addUsers(users) {

  //iterate through users and create an HTML CARD element for each
  const userCardElements = users.map(user => `<div class="card">
      <div class="card-img-container">
          <img class="card-img" src="${user.picture.medium}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
      </div>
  </div>`);

  //append card elements to the DOM
  $('#gallery').append(userCardElements);

//iterate through users and create an HTML MODAL element for each
  const userModalElements = users.map(user => `<div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${user.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${user.name.first}</h3>
            <p class="modal-text">${user.email}</p>
            <p class="modal-text cap">${user.location.city}</p>
            <hr>
            <p class="modal-text">${user.cell}</p>
            <p class="modal-text">${user.location.street} ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
            <p class="modal-text">Birthday: ${user.dob.date}</p>
    </div>`);

  //append modal elements to DOM
  $('.modal-container').append(userModalElements);

  //hide the modal stuff until we call it upon clicking a user later
  $('.modal-container').hide();
  $('.modal').hide();

  //add some listeners for the stuff we just created
  setListeners();
}

function setListeners() {

  //listen for any click on the card element and show the modal
  $('.card').click(function() {
    $('.modal-container').show();
    $('.modal').eq($(this).index()).show()
  });

  //hide the modal on close
  $('.modal-close-btn').click(function() {
    $('.modal-container').hide();
    $('.modal').eq($(this).parent().index()).hide()
  });
}
});
