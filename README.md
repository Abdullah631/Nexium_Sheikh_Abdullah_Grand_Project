# AI-Powered Recipe Generator Web App

## 📌 Product Overview

**Product Name**: AI-Powered Recipe Generator Web App  
**Purpose**:  
Empower users to generate customized cooking recipes using available ingredients and dietary preferences through AI.

### 🎯 Key Value Proposition
- Simplify recipe discovery
- Reduce food waste by utilizing on-hand ingredients
- Quick and easy recipe generation — no password-based sign-ups required

---

## 🚀 Features

| Feature | Description |
|--------|-------------|
| **Email Login (Magic Link)** | Passwordless authentication using Supabase magic link |
| **Recipe Generation** | Users input ingredients → AI (via n8n + OpenAI) generates recipes |
| **Save Recipes** | Users can save generated recipes to MongoDB linked to their account |
| **View Saved Recipes** | View saved recipes after login |
| **Responsive UI** | Mobile and desktop-friendly interface deployed on Vercel |

---

## 👤 User Roles

**Role**: Standard User  
**Permissions**:
- Generate recipes
- Save & view recipes  
*No admin role needed for V1*

---

## 🔄 User Flow

1. **Login**  
   User visits site → enters email → receives magic link → logs in

2. **Generate Recipe**  
   Enters ingredients/preferences → submits → receives AI-generated recipe

3. **Save/View Recipe**  
   Option to save recipe → view saved recipes anytime from dashboard

---

## ⚙️ Technical Requirements

### 🧩 Frontend
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Authentication**: Supabase client SDK

### 🛠️ Backend & API
- **Authentication**: Supabase
- **Database**: MongoDB for storing saved recipes
- **API**: Next.js API routes or Node.js server

### 🤖 AI Integration
- **Workflow Automation**: n8n
- **LLM API**: Gemini
- **Image API**: Pexels
- **Triggering**: Webhook setup in n8n

### ☁️ Deployment
- **Platform**: Vercel (connected to GitHub CI/CD)
- **Link**:https://my-recipe-ai-lake.vercel.app/recipe-generator

### ☁️ Loom Walkthrough
- **Link**:https://www.loom.com/share/30f38ab5f9b9431c9160bcdad584f502?sid=bc181d23-5bc8-45a0-9c89-644448aa8889
  
---

## 🎨 Wireframes & UI Guidelines

> Wireframes are located in: `/grand-project/src/docs/`

### Screens

- **Login Page**:  
  Simple email input for magic link authentication

- **Home Page**:  
  Ingredient input form and dietary preference dropdown

- **Recipe Result Page**:  
  Displays recipe title, ingredients, steps, and save button

- **Saved Recipes Page**:  
  Lists all saved recipes with option to delete

---

