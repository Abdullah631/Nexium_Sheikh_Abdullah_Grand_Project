Product Requirement Document (PRD)
1. Product Overview
Product Name: AI-Powered Recipe Generator Web App
Purpose:
Enable users to generate customized cooking recipes by entering ingredients and dietary preferences using AI.
Key Value Proposition:
•	Simplify recipe discovery
•	Reduce food waste by using available ingredients
•	Quick and easy recipe generation without sign-ups requiring passwords
2. Features
Feature	                    Description
Email Login (Magic Link)	User authentication via Supabase magic link (passwordless)
Recipe Generation	        Users enter ingredients/food name → AI (n8n + OpenAI) generates a recipe
Save Recipes	            Users can save generated recipes to MongoDB linked to their account
View Saved Recipes	        Users can view their saved recipes after logging in
Responsive UI	            Mobile and desktop-friendly interface deployed on Vercel

3. User Roles
Role: Standard User
Permissions:
•	Generate recipes
•	Save/view recipes
•	No admin roles needed for V1


4. User Flow
1.	Login:
o	User visits site → Enters email → Receives magic link → Logged in
2.	Generate Recipe:
o	Inputs ingredients/preferences → Submits → Receives AI-generated recipe
3.	Save/View Recipe:
o	Option to save recipe → View all saved recipes anytime
5. Technical Requirements
Frontend:
•	Framework: Next.js (React)
•	Styling: Tailwind CSS
•	Auth: Supabase client SDK
Backend & API:
•	Supabase (Auth)
•	MongoDB (Recipe storage)
•	Next.js API routes or Node.js server
AI Integration:
•	n8n workflow
•	OpenAI API (GPT or similar) or Gemini API
•	Webhook setup in n8n
Deployment:
•	Vercel (CI/CD connected to GitHub)
6. Wireframes & UI Guidelines
•	Login Page:
o	Simple Email based login form
•	Home Page:
o	Ingredient input form
o	Preferences dropdown
•	Recipe Result Page:
o	Recipe title, ingredients, steps, save button

•	Saved Recipes Page:
o	List of user’s saved recipes with delete option
Wireframes stored in /grand-project/docs/ folder.
7. Milestones
Milestone	                Date	        Repository Folder
PRD + Wireframes	        Day 15	        /grand-project/docs/
Backend & DB Setup	        Day 18	        /grand-project/api/
Frontend UI	                Day 21	        /grand-project/app/
AI Logic + Testing	        Day 24	        /grand-project/ai/
Public Demo Live	        Day 27	        Deployed on Vercel
Docs + Loom Walkthrough	    Day 29	        README.md

8. Risks & Assumptions
•	API Costs: OpenAI API usage might incur costs.
•	n8n Hosting: Ensure stable n8n instance or use cloud-hosted version.
•	MongoDB Performance: Basic performance should suffice for initial scale.

