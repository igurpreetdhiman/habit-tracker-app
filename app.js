import { db, auth } from "./firebase.js";
import {
  addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const habitForm = document.getElementById("habitForm");
const habitInput = document.getElementById("habitInput");
const habitDaysInput = document.getElementById("habitDaysInput");
const habitList = document.getElementById("habitList");

let userId = null;

document.getElementById("signUpBtn").onclick = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, pass).catch(err => alert(err.message));
};

document.getElementById("signInBtn").onclick = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, pass).catch(err => alert(err.message));
};

document.getElementById("signOutBtn").onclick = () => {
  signOut(auth);
};

onAuthStateChanged(auth, user => {
  const habitSection = document.getElementById("habitSection");
  const authSection = document.getElementById("authSection");
  const signOutBtn = document.getElementById("signOutBtn");

  if (user) {
    userId = user.uid;
    habitSection.style.display = "block";
    authSection.style.display = "none";
    signOutBtn.style.display = "inline-block";
    loadHabits();
  } else {
    userId = null;
    habitSection.style.display = "none";
    authSection.style.display = "block";
    signOutBtn.style.display = "none";
    habitList.innerHTML = "";
  }
});

habitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const habitText = habitInput.value.trim();
  const daysTarget = parseInt(habitDaysInput.value);

  if (habitText && daysTarget > 0) {
    await addDoc(collection(db, "habits"), {
      userId: userId,
      habit: habitText,
      daysTarget: daysTarget,
      streakCount: 0,
      createdAt: new Date().toISOString()
    });
    habitInput.value = "";
    habitDaysInput.value = "";
  }
});

function loadHabits() {
  const habitsRef = collection(db, "habits");
  onSnapshot(habitsRef, (snapshot) => {
    habitList.innerHTML = "";
    snapshot.docs.forEach(docSnap => {
      const data = docSnap.data();
      if (data.userId === userId) {
        const li = document.createElement("li");
        const daysDone = data.streakCount || 0;
        const goalReached = daysDone >= data.daysTarget;
        const percent = Math.min(100, Math.round((daysDone / data.daysTarget) * 100));

        li.innerHTML = `
          <div class="habit-info">
            <strong>${data.habit}</strong><br/>
            <small>✔️ ${daysDone} / ${data.daysTarget} days</small><br/>
            <small>📊 Completion Rate: ${percent}%</small>
          </div>
          <div>
            <button class="complete-btn" ${goalReached ? "disabled" : ""}>
              ${goalReached ? "✅" : "✔️"}
            </button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        `;

        li.querySelector(".complete-btn").onclick = async () => {
          if (!goalReached) {
            const docRef = doc(db, "habits", docSnap.id);
            await updateDoc(docRef, {
              streakCount: daysDone + 1
            });
          }
        };

        li.querySelector(".edit-btn").onclick = () => {
          const newHabit = prompt("Edit your habit", data.habit);
          const newTarget = prompt("Edit target days", data.daysTarget);
          if (newHabit && newTarget && !isNaN(newTarget)) {
            updateDoc(doc(db, "habits", docSnap.id), {
              habit: newHabit,
              daysTarget: parseInt(newTarget)
            });
          }
        };

        li.querySelector(".delete-btn").onclick = () => {
          deleteDoc(doc(db, "habits", docSnap.id));
        };

        habitList.appendChild(li);
      }
    });
  });
}