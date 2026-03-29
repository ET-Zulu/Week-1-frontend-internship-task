# Project: "Focus Flow" Dynamic Task Manager

## Project Overview

You are required to build a **Dynamic Task Management Interface** using Vanilla JavaScript, HTML, and CSS. This project transitions you from reading documentation to building a functional, interactive user interface.

This project is designed to help you practice:

- **DOM Manipulation:** Creating, selecting, and removing elements dynamically.
- **Event Handling:** Using event listeners and event delegation.
- **State Management:** Keeping the UI in sync with your data.
- **Modern CSS:** Utilizing Flexbox and responsive design principles.
- **Code Organization:** Structuring your frontend logic cleanly.

---

## Objective

By completing this project, you will:
- Build a fully interactive frontend application.
- Understand the lifecycle of a DOM element.
- Learn how to handle user input and provide real-time feedback.

---

## Project Requirements

### 1. The Task Structure
Each task visually represented in the DOM should include:
- **Title:** The name of the task.
- **Timestamp:** The time/date the task was created.
- **Status Toggle:** A way to mark the task as "Complete."
- **Delete Action:** A button to remove the task from the list.

### 2. Functional Requirements

| Action | Interaction | Description |
| :--- | :--- | :--- |
| **Add Task** | Input + Button | Capture text and inject a new task into the list. |
| **Complete Task** | Click Event | Toggle a `.completed` class (strikethrough/color change). |
| **Delete Task** | Click Event | Remove the specific task node from the DOM. |
| **Filter View** | Buttons (Optional) | Show "All," "Active," or "Completed" tasks. |

---

### 3. Validation Rules
- Prevent adding a task if the input field is empty.
- Task titles must be at least 3 characters long.
- Clear the input field automatically after a task is successfully added.

### 4. UI/UX & CSS
- **Layout:** Use **Flexbox** to center the application and align task items.
- **Responsiveness:** The app must be usable on mobile devices (use Media Queries).
- **Empty State:** Display a message (e.g., "No tasks for today!") when the list is empty.
- **Transitions:** Add a CSS `transition` when a task is marked as completed or deleted.

### 5. Code Organization
Keep your project organized with separate files:
- `index.html`: Semantic structure.
- `style.css`: All layout and design rules.
- `app.js`: All DOM logic and event handling.

---

## 👥 Git Workflow (MANDATORY)

### 1. Branching
Create a branch using the convention: `Your-Name`
- *Example:* `Abebe`

### 2. Development Rule
- Work **only** on your feature branch.
- Use descriptive commit messages (e.g., `feat: implement task deletion logic`).

### 3. Pull Requests (PR)
When finished:
- Open a PR to `main`.
- Include a screenshot of your final UI in the PR description.

---

## Suggested Folder Structure
```text
project-root/
 ├── index.html
 ├── css/
 │    └── style.css
 └── js/
      └── app.js
