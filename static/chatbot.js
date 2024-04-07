var TTS = false;

function chatOpen() {
  document.getElementById("chat-open").style.display = "none";
  document.getElementById("chat-close").style.display = "block";
  document.getElementById("chat-window1").style.display = "block";
}

function chatClose() {
  document.getElementById("chat-open").style.display = "block";
  document.getElementById("chat-close").style.display = "none";
  document.getElementById("chat-window1").style.display = "none";
  document.getElementById("chat-window2").style.display = "none";
}

function openConversation() {
  document.getElementById("chat-window2").style.display = "block";
  document.getElementById("chat-window1").style.display = "none";
 }

function userResponse() {
  //Getting user Input
  var userInput = $("#textInput").val();

  if (userInput.trim() === "") {
    //Prevents the sending of empty messages
    return;
  }

  //Displaying user messages in the chat 
  displayMessage("You", userInput);

  //Sending user messages to Rasa server for response 
  sendToRasa(userInput);

  //Clearing the input field
  $("#textInput").val("");

}

//pressing enter on keyboard and send message
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const inputElement = document.getElementById("textInput");
    if (inputElement === document.activeElement) {
      userResponse();
    }
  }
});

function voiceResponse(){
  // Speech-To-Text

  //Checking if the WebSpeech API is supported by your browser
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    //Creating SpeechRecognition instance
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    //Starting recognition/voice recording of the user's input
    recognition.start();

    //Event handler for when speech is recognized
    recognition.onresult = function(event) {
      var transcript = event.results[0][0].transcript;
      // Displaying user's spoken message into text
      displayMessage("You", transcript);
      // Sending the user's spoken message in form of text to Rasa server in order to receive the appropriate response
      sendToRasa(transcript);

      //Text-to-Speech    
      TTS = true;
    };

    //Event handler for errors
    recognition.onerror = function(event) {
      console.error('There was an error in recognizing your voice:', event.error);
    };
  }
  
  else {
    console.error('Speech recognition not supported');
    return;
  }
  }

function sendToRasa(message){
  //Creating a POST request to Rasa server using AJAX request
  $.ajax({
    url: "http://localhost:5005/webhooks/rest/webhook",
    type: "POST",
    contentType: "application/json",
    data:JSON.stringify({ "message": message}),
    success: function (data) {
      // Displays the chatbot's response in the chat
      displayMessage("ChatBot", data[0].text);

      if (TTS == true){
        // Check if SpeechSynthesis is supported
        if ('speechSynthesis' in window) {
        var speech = new SpeechSynthesisUtterance(data[0].text);
        window.speechSynthesis.speak(speech);
        }
        else {
          console.error('Text-to-Speech not supported');
          // Display response in chat if TTS is not supported
          displayMessage("ChatBot", data[0].text);
        }
      }
    },
    error: function (error) {
      console.log("Error sending message to Rasa:", error);
      displayMessage("ChatBot", "An error occured. Try again please.");
    },
  });

}

function displayMessage(sender, text) {
   // Appending a new paragraph with the sender and text to the chat-messages container
    $("#chat-box").append("<p><strong>" + sender + ":</strong></p>");

   // Splitting multiline text and appending each line 
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
      //Replacing text within double asterisks with bold HTML tags
      var formattedLine = lines[i].replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      // Detecting URLs and replacing them with clickable links
      formattedLine = formattedLine.replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank">$1</a>');
      
      $("#chat-box").append("<p>" + formattedLine + "</p>");
  }


  //Scroll to the bottom of the chat window
  var objDiv = document.getElementById("chat-box");
  objDiv.scrollTop = objDiv.scrollHeight;
}

