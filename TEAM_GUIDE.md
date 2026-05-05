# 🚀 Nexus Team Collaboration Guide

Welcome to the **Nexus** project! This guide will help you get started and ensure we work together smoothly to build this community hub.

## 🔗 Repository
**Link**: [https://github.com/Ngatia259-dev/nexus-community-hub.git](https://github.com/Ngatia259-dev/nexus-community-hub.git)

---

## 🛠️ Step 1: Getting Started
After accepting the GitHub invitation, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ngatia259-dev/nexus-community-hub.git
   cd nexus-community-hub
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## 🎨 Styling Rules (IMPORTANT)
We are building a premium, visually appealing hub. Please follow these rules:

- **NO Tailwind CSS**: We are NOT using Tailwind. All styling must be done using **CSS Modules**.
- **CSS Modules**: Create a `.module.css` file for every component (e.g., `Header.module.css` for `Header.jsx`).
- **No Gradients**: Avoid radiant/merged colors on buttons or backgrounds. Use solid, clean colors from our palette.
- **No Purple**: Stick to the Nexus Blue theme (Sky/Blue/Slate).
- **Mobile First**: Design for mobile screens first, then use `@media` queries for desktop.

---

## 🔀 Git Workflow
To avoid breaking the main code, we will use a branching workflow:

1. **Create a new branch** for your task:
   ```bash
   git checkout -b feature/<your-username>/<task-name>
   # Example: git checkout -b feature/essyken/post-detail
   ```
2. **Commit your changes** with clear messages:
   ```bash
   git add .
   git commit -m "feat: implement post detail layout"
   ```
3. **Push your branch**:
   ```bash
   git push origin feature/<your-username>/<task-name>
   ```
4. **Open a Pull Request (PR)** on GitHub and ask for a review before merging.

---

## 📋 Individual Tasks

Refer to the task list below to find your specific area of focus:

| Member | Assigned Task |
|---|---|
| **kmwota-hub** | Build the **Layout shell** (`Header`, `Sidebar`, `Footer`) using CSS Modules. |
| **bella1234-ai** | Build **Post components** (`PostCard`, `PostList`) and the main **Posts Feed page**. |
| **essyken** | Implement the **Post Detail page** and the **Comments UI**. |
| **muriithikennedy443-sudo** | Develop **User Profiles** and the **Networking/Connections page**. |
| **wynnexdev** | Build the **Careers page** (Job board) and helper UI components. |
| **Markchege10-ux** | Design the **About page**, add **Micro-animations**, and perform a **Responsive Audit**. |

---

## 💡 Best Practices
- **Shared Components**: Check `src/components/shared/` before building new inputs or buttons. Use the ones already created by `Ngatia259-dev`.
- **Reusable Styles**: Use the CSS variables defined in `src/index.css` (e.g., `var(--nexus-primary)`).
- **Clean Code**: Keep components small and focused.

Let's build something amazing! 🚀
