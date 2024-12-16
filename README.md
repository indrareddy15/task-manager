# Task Manager Application (MERN Stack + MUI)

## Problem Statement

### Objective:

The objective of this project is to develop a Task Manager application using the MERN stack (MongoDB, Express, React, Node.js) combined with Material-UI (MUI) components. The application will serve as a tool to manage tasks, offering full CRUD (Create, Read, Update, Delete) functionalities.

---

## Features and Requirements

### 1. Task Schema

The application should have a Task schema in MongoDB with the following fields:

- **Title**: `String`, required - represents the name of the task.
- **Description**: `String`, required - provides details about the task.
- **Status**: `Enum` (values: TODO, DONE), default is TODO - represents the task's completion status.
- **Linked File**: `Blob`, optional - stores a file (PDF) associated with the task.
- **Created On**: `Date`, required - auto-generated when the task is created.
- **Deadline**: `Date`, required - indicates the date by which the task should be completed.

---

### 2. Task UI/UX

The application should include the following features:

#### Task List View

- Display tasks in a tabular format with columns for:
  - Title
  - Description
  - Deadline
  - Status
  - Actions (Mark as Done, View File, Edit, Delete)
- Implement a download option for any associated PDF files.

#### Add Task Button

- A prominent **"Add Task"** button should open a modal for users to enter task details (title, description, deadline) and upload an optional PDF file.
- The task form should be submitted as `formData` (instead of JSON), to handle both text data (title, description, deadline) and the optional PDF file in a single request.

#### Task Status Rendering

- Tasks should display as:
  - **"In Progress"** if they are ongoing (from the creation date until the deadline).
  - **"Achieved"** if marked as DONE before the deadline.
  - **"Failed"** if not marked as DONE on or after the deadline.

---

### 3. Sample Dataset

Create the following sample tasks for testing:

- **Title**: Study TypeScript  
  **Description**: Read the documentation and make notes.  
  **Linked File**: (optional) Any PDF file.  
  **Created On**: 16/08/2024  
  **Deadline**: 19/08/2024

#### UI Rendering Example:

- **From 16/08/2024 to 19/08/2024**: The task will be displayed as **"In Progress"**.
- **On 20/08/2024**:
  - If the task is marked as DONE before the deadline, it will display as **"Achieved"**.
  - If the task is not completed, it will display as **"Failed"**.

---

## Guidance

- Utilize MUI components to create a **responsive** and **visually appealing** user interface.
- Follow best practices for structuring the codebase, including separating concerns between the front-end and back-end.
- Implement **form validation** to ensure required fields (title, description, deadline) are filled out correctly.
- Use **React hooks** and **state management** effectively to handle the task data and UI updates.

---

## Reference

The attached images provide a visual guide on how the final output of the project should look, including:

- **No Data View**
- **Table with Data View**
- **Add Task View**
- **Edit Task View**

These images will guide the structure and design of the application.

---

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```
