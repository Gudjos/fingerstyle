//adds functionality to Fingerstyle website


//declaring array for bookamrks
let bookMarked = [];

//onload function that checks session stored array to see if any items should have bookmarked styling applied. 
function checkbookMarks()  {
  bookMarked = JSON.parse(sessionStorage.getItem("IDarray"));
  for (i=0; i<bookMarked.length;i++)  {
    content = document.getElementById(bookMarked[i]);
    console.log(content);
    content.firstElementChild.classList.add("bookmarked");
  }
}

/*onclick of each bookmark icon function parses array from session, gets id of html element, checks if is already in array, 
and pushes or deletes accordingly. the html is then also stored in session storage using the id as key*/

function bookmark(element)  {
  bookMarked = JSON.parse(sessionStorage.getItem("IDarray"));
  if (!bookMarked) { // Check if bookMarked is null or undefined
    bookMarked = [];
  }
  divID = element.parentElement.id;
  content = document.getElementById(divID);
  if (bookMarked.includes(divID) === false) {         //Accounting for duplicate entries in the arrays
  bookMarked.push(divID);
  const myJSON = JSON.stringify(bookMarked);
  sessionStorage.setItem("IDarray", myJSON);
  element.classList.add("bookmarked");                //changeing css styling
  sessionStorage.setItem(divID, content.outerHTML);
  } else{                                             //removing element from array and session storage and updating session storage.
    i = bookMarked.indexOf(divID);
    bookMarked.splice(i,1);
    const myJSON = JSON.stringify(bookMarked);
    sessionStorage.setItem("IDarray", myJSON);
    sessionStorage.removeItem(divID);
    element.classList.remove("bookmarked");
  }
  alert(`Articles bookmarked: ${bookMarked.length}`);     //changing css styling
}

function showBookmarks()  {
  bookMarked = JSON.parse(sessionStorage.getItem("IDarray"));     //onload function parses array of ids, and finds according html in session storage, then renders to bookmarks page using appendchild
  console.log(bookMarked);
  for (i=0; i<bookMarked.length;i++)  {
    const div = document.createElement("div");
    let divID = "";
    divID = bookMarked[i];
    console.log(divID);
    div.innerHTML = sessionStorage.getItem(divID);
    document.getElementById("content").appendChild(div);
  }
}

function leaveRev() {                                               //takes content of review form and renders below box with date. 
  let review = document.getElementById("review").value;
  console.log(review); 
  const div = document.createElement("div");
  const date = new Date();
  div.innerHTML = `${review} '${date}`;
  div.className = "revStyle";
  document.getElementById("feedback").appendChild(div);
  document.getElementById("review").value = "";
}

function likeDiv(element)  {                                      //simple function toggles css styling
  element.classList.toggle('liked');
};

//gets values from form, checks if details were correct and alerts mail has been sent, finally resets form content
function sendReq()  {
  let firstName = document.getElementById("first-name").value;
  let lastName = document.getElementById("last-name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let message = document.getElementById("message").value;
  const radioButtons = document.getElementsByName('interest');
  let interest;
  for (const radioButton of radioButtons) {
  if (radioButton.checked) {
    interest = radioButton.id;
    break;
  } if (interest == null)  {
    interest = "General Enquiry"
  }
}
  let sendNow = prompt(`Please confirm your message details:\nName: ${firstName} ${lastName}\nEmail: ${email}. Phone: ${phone}\nReason for contact: ${interest}\nMessage: ${message}\nSend(S)/Restart(R)`)
  if (sendNow == "S") {
    alert(`Your email has been sent. Responses can take up to 3 years`)
  } 
  document.getElementById("first-name").value = "";
  document.getElementById("last-name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("message").value = "";
}