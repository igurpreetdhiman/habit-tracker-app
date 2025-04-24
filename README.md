# Habit Tracker App

A simple and responsive Habit Tracker web app built with **vanilla JavaScript**, **Firebase Firestore**, and **Authentication**. The app helps users track their daily habits, set goals, and maintain streaks — with the help of a built-in AI Assistant chatbot.

## Live Site

[View the deployed app on GitHub Pages](https://username.github.io/habit-tracker-app/)


## Features & Functionalities

### User Authentication (Firebase)
- Users can **sign up**, **sign in**, and **sign out** securely.
- Firebase Authentication handles session management.

### Add a Habit
- Users can enter a habit and set a target number of days (goal streak).
- Example: *Drink Water — Target: 21 Days*

### Daily Completion Tracking
- Users click the button to mark a habit as completed.
- The button can be clicked once per day, up to the streak goal.

### Edit or Delete Habits
- **Edit**: Change the name or goal days for any habit.
- **Delete**: Permanently remove a habit from the list.

### Streak Count
- The app tracks how many days a habit has been completed.
- Displays: `7 / 21 days`

### Completion Rate
- Shows the percentage of completion:  
  `Completion Rate: 33%`

### AI Chatbot Assistant
- A toggleable chatbot helps users with:
  - How to add/edit/delete habits
  - Understanding streaks and completion rate
- Responds with helpful answers based on keywords.

### Responsive Design
- Works seamlessly on desktops, tablets, and phones.
- Clean, accessible layout with clear buttons and interactions.

