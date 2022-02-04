// Initialize Firebase (ADD YOUR OWN DATA)
let config = {
    apiKey: "AIzaSyA9UVjmb-Ucpq2pN0ADiQoUAJnvUnJrFtw",
    authDomain: "kewa-cafe-firebase.firebaseapp.com",
    databaseURL: "https://kewa-cafe-firebase.firebaseio.com",
    projectId: "kewa-cafe-firebase",
    storageBucket: "kewa-cafe-firebase.appspot.com",
    messagingSenderId: "663076662472",
    appId: "1:663076662472:web:1c98e424ef8199e718c9fd",
    measurementId: "G-3RT18K7FT2"
};
firebase.initializeApp(config);
  
// Reference messages collection
let messagesRef = firebase.database().ref('contact_messages');

// Listen for form send
document.getElementById('contact_form').addEventListener('submit', sendForm);

// send form
function sendForm(e){
  e.preventDefault();

  // Get values
  let name = getInputVal('contact_name');
  let email = getInputVal('contact_email');
  let phone = getInputVal('contact_phone');
  let message = getInputVal('contact_message');

  //Check Form
  checkForm(name, email, phone, message);

  // Save message
  saveMessage(name, email, phone, message);

  // Clear form
  document.getElementById('contact_form').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, phone, message){
  let newMessageRef = messagesRef.push();
  newMessageRef.set({
    "name": name,
    "email": email,
    "phone": phone,
    "message": message
  });
}

function checkForm(name, email, phone, message){

  // If the user didn't input name
  if(name === ""){
    alert("In Name form:\nPlease enter your name.");
    name.focus();
    return false;
  }

  // If the user didn't input email
  if(email === ""){
    alert("In Email form:\nPlease enter your email.");
    email.focus();
    return false;
  }

  // If the user put wrong email style
  if(!checkEmail(email)){
    alert("In Email form:\nPlease enter the correct email.");
    phone.focus();
    return false;
  }

  // If the user didn't input name
  if(phone === ""){
    alert("In Phone form:\nPlease enter your phone number.");
    phone.focus();
    return false;
  }

  // If the user didn't put number on phone section
  if(!checkPhoneNumber(phone)){
    alert("In Phone form:\nPlease enter number only and only 10 digits.");
    phone.focus();
    return false;
  }

  // If the user didn't input message
  if(message === ""){
    alert("In Message form:\nPlease enter your message.");
    message.focus();
    return false;
  }

  alert("Thank You for Your Message")
  return true;
  
}

// To check email style
function checkEmail(email){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return true;
  }
  else{
    return (false)
  }  
}

// To check phone is number only
function checkPhoneNumber(phone)
{
  let phone_number = /^\d{10}$/;
  if(phone.match(phone_number)){
      return true;
  }
  else{
    return false;
  }
}
