const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const sendMessage = document.getElementById("sendMessage");

// Toggle visibility of the chatbot
chatToggle.onclick = () => {
  chatWindow.style.display = chatWindow.style.display === "none" ? "block" : "none";
};

// Handle Enter key press
chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    processUserInput();
  }
});

// Handle send button click
sendMessage.onclick = processUserInput;

// Process the user input
function processUserInput() {
  const msg = chatInput.value.trim();
  if (msg === "") return;
  addMessage("user", msg);
  respond(msg.toLowerCase());
  chatInput.value = "";
}

// Add message bubble to chat
function addMessage(sender, msg) {
  const p = document.createElement("p");
  p.className = sender === "bot" ? "bot" : "user";
  p.textContent = msg;
  chatMessages.appendChild(p);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Chatbot logic for responding
function respond(input) {
  let response = "";

  // Matching user input to help topics
  if (input.includes("add")) {
    response = "To add a habit, type it in and click 'Add Habit'.";
  } else if (input.includes("edit")) {
    response = "Click the 'Edit' button beside the habit to modify it.";
  } else if (input.includes("delete") || input.includes("remove")) {
    response = "Click 'Delete' next to the habit to remove it from your list.";
  } else if (input.includes("tick") || input.includes("done") || input.includes("complete")) {
    response = "Click the ✔️ button to mark today's progress on a habit.";
  } else if (input.includes("streak")) {
    response = "The streak shows how many times you've marked the habit as done.";
  } else if (input.includes("rate") || input.includes("percentage")) {
    response = "The completion rate is calculated as (✔️ days / target days) × 100.";
  } else if (input.includes("chatbot") || input.includes("help")) {
    response = "I'm your habit assistant! Ask about 'add', 'edit', 'delete', 'streak', or 'completion rate'.";
  } else {
    response = "I'm here to help! Ask me how to add, edit, delete habits, or track your progress.";
  }

  addMessage("bot", response);
}
