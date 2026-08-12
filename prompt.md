# STUDENT EXPENSE TRACKER — MASTER BUILD PROMPT

## 1. ROLE AND OBJECTIVE

You are an expert full-stack product engineer, UI/UX designer, frontend developer, accessibility specialist, and QA engineer.

Build a complete, professional, production-style web application called:

**“SpendWise — Student Expense Tracker”**

This application is being developed as a college project and will be demonstrated in a live presentation.

The application must NOT look like a basic classroom CRUD project.

It should feel like a modern SaaS/productivity application designed for university students.

The application must be fully functional.

Do not create decorative buttons that do nothing.

Every visible interactive control must perform a meaningful action.

Prioritize usability, visual polish, responsive design, accessibility, performance, and functional correctness.

The final application should be impressive enough for a live college presentation.

---

# 2. CORE PRODUCT IDEA

Create a personal student expense management application that allows users to:

* Create a personal profile
* Enter their name
* Enter their Gmail address
* Select Light or Dark theme
* Add expenses
* Edit expenses
* Delete expenses
* Categorize expenses
* Search expenses
* Filter expenses
* Sort expenses
* View total spending
* View today's spending
* View weekly spending
* View monthly spending
* View category-wise spending
* Set a monthly budget
* Track budget usage
* Receive budget warnings
* View spending analytics
* Store data persistently
* Reset application data
* Interact with an AI financial assistant
* Ask questions about their spending
* Get personalized spending insights
* Receive suggestions for improving spending habits

---

# 3. TECHNOLOGY REQUIREMENTS

Use a modern, maintainable frontend architecture.

Prefer:

* React
* TypeScript
* Modern CSS or Tailwind CSS
* Component-based architecture
* Responsive layouts
* Accessible semantic HTML
* LocalStorage or IndexedDB for persistence

Use the technology stack that is best supported by the Antigravity environment.

Do not introduce unnecessary dependencies.

Keep the project organized and maintainable.

Use reusable components rather than duplicating UI code.

Separate:

* UI components
* Application logic
* Data models
* Storage logic
* Utility functions
* AI assistant logic

The application should run locally without errors.

---

# 4. APPLICATION NAME AND BRANDING

Use the brand name: 

**SpendWise**

Use the tagline:

**“Wise Spending for Smart Students”**

Create a professional logo treatment for SpendWise.

The logo can use a minimal wallet, rupee, chart, or financial icon.

Avoid childish graphics.

Use a clean modern visual identity.

The overall design should feel similar in quality to a modern finance/productivity dashboard.

---

# 5. INITIAL USER ONBOARDING

When a user opens the application for the first time, do not immediately show the dashboard.

Display a professional onboarding modal or welcome screen.

Title:

**Welcome to SpendWise**

Subtitle:

**Your simple personal finance companion for student life.**

Ask for:

1. Student name
2. Gmail address
3. Preferred theme

Fields:

**Full Name**

Placeholder:

“Enter your name”

Field:

**Gmail Address**

Placeholder:

“[example@gmail.com](mailto:example@gmail.com)”

Theme selection:

**Light**

**Dark**

Also provide a visually appealing theme preview.

Include:

**Continue to SpendWise**

button.

---

# 6. ONBOARDING VALIDATION

The name field must be required.

The Gmail field must be required.

Validate that the entered email is a valid Gmail address.

Accept:

[example@gmail.com](mailto:example@gmail.com)

Reject:

[example@yahoo.com](mailto:example@yahoo.com)

Reject:

example

Reject:

@gmail.com

Display helpful inline validation messages.

Do not allow onboarding submission when required fields are invalid.

Do not clear valid user input unnecessarily.

The Continue button must provide visual feedback.

After successful onboarding, save the user profile.

Persist the profile using LocalStorage or another appropriate local persistence mechanism.

On future visits, skip onboarding if a valid profile already exists.

Provide a Settings option to edit the profile later.

---

# 7. PERSONALIZED GREETING

After onboarding, show the user's name prominently on the home dashboard.

Use dynamic greetings based on the current time.

Morning:

“Good morning, [Name] ☀️”

Afternoon:

“Good afternoon, [Name] 👋”

Evening:

“Good evening, [Name] 🌙”

Night:

“Good night, [Name] ✨”

Below the greeting display:

“Here’s your spending overview.”

Do not hardcode the user's name.

Read the name dynamically from saved profile data.

---

# 8. MAIN APPLICATION STRUCTURE

Create a professional application shell.

Use a responsive sidebar on desktop.

Use a bottom navigation or collapsible navigation on mobile.

Primary navigation:

* Dashboard
* Expenses
* Analytics
* Budget
* AI Assistant
* Settings

Include the SpendWise logo at the top of the navigation.

Include a user profile area near the bottom.

Show the user's first name and Gmail address in the profile area.

Allow navigation without page reload where possible.

Use smooth transitions.

Highlight the currently selected section.

---

# 9. HEADER

Create a polished top header.

Display the current section title.

Include a theme toggle.

Include notification/status icon.

Include user avatar using the user's initials.

Clicking the avatar should open a small profile menu.

Profile menu options:

* Profile
* Settings
* Reset Application Data

Do not use non-functional menu items.

---

# 10. LIGHT AND DARK THEME

Implement a complete Light/Dark theme system.

Do not simply change the page background.

All components must respond correctly to the selected theme.

Theme affected elements:

* Background
* Cards
* Text
* Borders
* Inputs
* Buttons
* Charts
* Sidebar
* Modals
* Dropdowns
* Tables
* AI assistant
* Notifications
* Empty states

Use CSS variables or a centralized theme system.

Persist the user's selected theme.

On reopening the application, restore their chosen theme.

Include a theme switch with clear visual indication.

Use smooth but subtle theme transitions.

Avoid excessive animation.

---

# 11. DASHBOARD DESIGN

The dashboard should be the centerpiece of the application.

Use a clean responsive grid.

Include an attractive financial overview.

Create four primary summary cards:

1. Total Expenses
2. This Month
3. This Week
4. Remaining Budget

Each card should contain:

* Icon
* Label
* Dynamic amount
* Relevant secondary information
* Subtle visual hierarchy

Use Indian Rupee formatting.

Example:

₹12,450

Never display raw unformatted numbers such as:

12450.00

---

# 12. DASHBOARD SPENDING SUMMARY

Create a section called:

**Spending Overview**

Display a chart showing spending over time.

Allow switching between:

* 7 Days
* 30 Days
* 90 Days

The chart must update dynamically.

If there is no data, show a useful empty state instead of a broken chart.

Example empty state:

“No spending data yet.”

Add:

“Add your first expense”

button.

---

# 13. CATEGORY BREAKDOWN

Create a dashboard section:

**Where Your Money Goes**

Show spending by category.

Default categories:

* Food
* Transport
* Education
* Shopping
* Entertainment
* Bills
* Health
* Other

Represent the category breakdown using an appropriate chart.

Use a legend.

Show:

Category name

Amount

Percentage

Allow users to click a category and navigate to filtered expenses.

---

# 14. RECENT EXPENSES

Create:

**Recent Expenses**

Display the latest expense records.

Each record should show:

* Category icon
* Expense title
* Category
* Date
* Payment method
* Amount

Include a View All button.

The list must update automatically when new expenses are added.

If there are no expenses, show an empty state.

---

# 15. ADD EXPENSE FEATURE

Create a prominent:

**+ Add Expense**

button.

Clicking it should open a professional modal or dedicated form.

Required fields:

* Expense title
* Amount
* Category
* Date
* Payment method
* Optional note

Expense title examples:

“Lunch at cafeteria”

“Bus pass”

“Python course”

“Movie”

Amount must accept only positive numbers.

Category must be selected.

Date must be valid.

Payment methods:

* Cash
* UPI
* Debit Card
* Credit Card
* Bank Transfer
* Other

---

# 16. EXPENSE VALIDATION

Do not allow:

Negative amounts.

Zero amounts.

Empty titles.

Invalid dates.

Missing categories.

Malformed input.

Display user-friendly validation messages.

Validation should happen before submission.

Do not rely only on HTML validation.

Include application-level validation as well.

---

# 17. EXPENSE CREATION

When an expense is successfully added:

Save it to persistent storage.

Close the modal.

Update the dashboard.

Update totals.

Update charts.

Update category breakdown.

Update recent expenses.

Show a success notification.

Example:

“Expense added successfully.”

Do not require a page reload.

---

# 18. EXPENSE EDITING

Every expense must have an Edit action.

Clicking Edit should open the expense form populated with existing information.

Allow the user to modify:

* Title
* Amount
* Category
* Date
* Payment method
* Note

After saving:

Update the existing record rather than creating a duplicate.

Refresh all related dashboard statistics.

Show a success message.

---

# 19. EXPENSE DELETION

Every expense must have a Delete action.

Never delete an expense immediately without confirmation.

Display:

“Delete this expense?”

Include:

Cancel

Delete Expense

After deletion:

Remove the expense from persistent storage.

Update all calculations.

Update charts.

Update filters.

Show:

“Expense deleted successfully.”

---

# 20. EXPENSE SEARCH

Create a search bar in the Expenses section.

Allow searching by:

* Expense title
* Category
* Payment method
* Note

Search should update results immediately.

Use case-insensitive matching.

Show the result count.

Example:

“8 expenses found”

---

# 21. EXPENSE FILTERING

Implement useful filtering options.

Filters:

* Category
* Payment method
* Date range
* Amount range

Include:

All Categories

All Payment Methods

All Dates

Provide a Clear Filters button.

Filters should work together.

For example:

Food + UPI + Last 30 Days

must return only matching records.

---

# 22. EXPENSE SORTING

Allow sorting by:

* Newest
* Oldest
* Highest amount
* Lowest amount

Do not mutate the original stored array unnecessarily.

Use derived filtered/sorted state.

---

# 23. EXPENSE TABLE / LIST

Desktop:

Use a clean table.

Columns:

* Expense
* Category
* Date
* Payment Method
* Amount
* Actions

Mobile:

Transform the table into responsive cards.

Do not create horizontal overflow unnecessarily.

Ensure buttons remain easy to tap on mobile.

---

# 24. PAGINATION OR DISPLAY LIMIT

If the expense list becomes large:

Display a reasonable number per page.

Example:

10 expenses per page.

Include pagination controls.

If pagination is not needed for the dataset size, design the architecture so it can be introduced later.

---

# 25. EMPTY STATES

Create professional empty states.

Do not leave blank screens.

Examples:

“No expenses yet”

“Start tracking your spending by adding your first expense.”

Include a relevant action button.

Create different empty states for:

* No expenses
* No search results
* No matching filters
* No analytics data
* No budget configured

---

# 26. BUDGET MANAGEMENT

Create a dedicated Budget section.

Allow the user to set:

**Monthly Budget**

Example:

₹15,000

Show:

Budget

Spent

Remaining

Percentage Used

Create a progress bar.

The progress bar must update automatically.

---

# 27. BUDGET STATUS

Create dynamic budget statuses.

Under 50%:

“Your spending is on track.”

50–75%:

“You’re halfway through your monthly budget.”

75–90%:

“Be careful — you’re approaching your budget limit.”

90–100%:

“You’re very close to your budget limit.”

Above 100%:

“You have exceeded your monthly budget.”

Use clear visual states.

Do not rely solely on color.

Include text indicating status.

---

# 28. BUDGET WARNING

When the user approaches the budget limit:

Show a notification.

Example:

“You have used 85% of your monthly budget.”

When the budget is exceeded:

Show a stronger warning.

Example:

“You have exceeded your monthly budget by ₹1,250.”

Do not repeatedly show the same notification every time the dashboard renders.

---

# 29. ANALYTICS PAGE

Create a dedicated Analytics page.

Title:

**Spending Analytics**

Show:

* Total spending
* Average daily spending
* Largest expense
* Most expensive category
* Number of transactions

Add useful charts.

Charts should be responsive.

Charts must support Light and Dark themes.

---

# 30. ANALYTICS INSIGHTS

Generate simple rule-based insights.

Examples:

“Food is your largest spending category this month.”

“You spent 18% more this week than last week.”

“Your average daily spending is ₹420.”

“Transport expenses increased this month.”

These insights must be calculated from real application data.

Do not fake analytics.

---

# 31. MONTHLY COMPARISON

Create a comparison card:

**This Month vs Last Month**

Calculate:

Current month spending.

Previous month spending.

Percentage change.

Display:

↑ Increased by 12%

or

↓ Decreased by 8%

Handle zero previous-month spending correctly.

Do not produce:

NaN%

Infinity%

---

# 32. SPENDING TRENDS

Create a trend visualization.

Options:

* Daily
* Weekly
* Monthly

Allow the user to switch views.

Update chart labels dynamically.

Use real expense data.

---

# 33. AI ASSISTANT — CORE REQUIREMENT

Build an integrated AI assistant inside the application.

Name:

**SpendWise AI**

Tagline:

**“Your personal spending companion.”**

The AI assistant should not be a decorative chat window.

It should help the user understand and manage their expenses.

---

# 34. AI ASSISTANT UI

Create a dedicated AI Assistant section.

Also provide a floating assistant button accessible from major screens.

The assistant should open a modern chat panel.

Include:

* Chat history
* User messages
* AI messages
* Typing indicator
* Text input
* Send button
* Suggested prompts
* Clear conversation button

Use polished chat bubbles.

Make the assistant responsive on mobile.

---

# 35. AI ASSISTANT SUGGESTIONS

Show quick prompts such as:

“Where am I spending the most?”

“How much did I spend this month?”

“Give me 3 ways to reduce my spending.”

“Am I close to my budget?”

“What was my biggest expense?”

“Analyze my food spending.”

“What category should I cut down?”

Clicking a suggestion should automatically send the prompt.

---

# 36. AI DATA AWARENESS

The AI assistant should have access to relevant application data.

Provide it with:

* User first name
* Current date
* Monthly budget
* Current month spending
* Expense records
* Category totals
* Payment methods
* Recent transactions
* Analytics

Do not send unnecessary sensitive information.

The assistant should answer using the actual data available in the application.

---

# 37. AI EXAMPLE BEHAVIOR

If the user asks:

“How much did I spend this month?”

The assistant should calculate the value from actual stored expenses.

If the user asks:

“Where do I spend the most?”

The assistant should identify the highest spending category.

If the user asks:

“How can I save money?”

The assistant should analyze their spending and provide practical suggestions.

Do not give generic advice when actual application data is available.

---

# 38. AI AGENTIC BEHAVIOR

Implement the assistant as an agentic workflow where appropriate.

The AI should be able to decide which application data or calculation it needs before responding.

Possible internal tools/functions:

getTotalExpenses()

getMonthlyExpenses()

getCategoryBreakdown()

getLargestExpense()

getRecentExpenses()

getBudgetStatus()

getMonthlyComparison()

searchExpenses()

getSpendingTrend()

The assistant can use these tools to produce accurate answers.

Do not allow the AI to directly modify or delete financial records without explicit user confirmation.

---

# 39. AI ACTIONS

The AI assistant may recommend actions.

For example:

“I noticed that Food is your biggest category. Would you like to view your Food expenses?”

Provide:

**View Food Expenses**

button.

The action should navigate to the relevant filtered Expenses view.

The assistant can also suggest:

**Open Budget**

**View Analytics**

**Add Expense**

These buttons must actually work.

---

# 40. AI SAFETY AND ACCURACY

The AI assistant is a budgeting helper, not a professional financial advisor.

Avoid presenting investment, tax, legal, or medical advice as authoritative.

When discussing financial decisions, include reasonable caution.

Never invent expense data.

Never claim to know data that is not available.

When information is missing, clearly say so.

If no expenses exist:

“I don't have enough spending data yet. Add a few expenses and I can analyze them.”

---

# 41. AI API ARCHITECTURE

If an AI API is available, integrate it through a secure server-side or appropriate backend mechanism.

Never expose private API keys directly in client-side source code.

Store secrets in environment variables.

Do not hardcode API keys.

If no AI API is configured, implement a polished local fallback assistant.

The fallback should answer common expense-related queries using deterministic application data and rules.

The AI UI must remain functional even without an external API.

Do not create a fake loading animation that pretends a remote AI request occurred.

---

# 42. AI ERROR HANDLING

If the AI service fails:

Show:

“I'm having trouble connecting right now.”

Then offer useful fallback actions.

The app itself must continue working.

Never allow an AI API failure to break the whole application.

Handle:

Network errors

Timeouts

Invalid responses

Missing API key

Rate limits

Unexpected API errors

---

# 43. SETTINGS PAGE

Create a professional Settings page.

Sections:

Profile

Appearance

Budget

Data

AI Assistant

About

---

# 44. PROFILE SETTINGS

Allow the user to edit:

* Name
* Gmail address

Validate the Gmail address.

Save changes.

Update greetings immediately.

---

# 45. APPEARANCE SETTINGS

Allow:

Light Theme

Dark Theme

System Theme if practical.

Make Light/Dark the primary supported options.

Persist the selected theme.

Provide theme previews.

---

# 46. DATA MANAGEMENT

Create:

Export Data

Import Data

Reset Data

For Export Data:

Download expenses and profile data as JSON or CSV.

For Import Data:

Validate the imported structure.

Do not overwrite existing data silently.

Ask for confirmation before replacing existing data.

For Reset Data:

Show a confirmation dialog.

Clearly state that the action cannot be undone.

---

# 47. LOCAL STORAGE

Persist:

User profile

Theme

Expenses

Budget

Relevant settings

AI preferences if applicable

Data must survive page refreshes.

Do not use hardcoded in-memory state as the only storage mechanism.

Create a clean storage abstraction.

For example:

storage.getProfile()

storage.saveProfile()

storage.getExpenses()

storage.saveExpenses()

storage.getBudget()

storage.saveBudget()

---

# 48. SAMPLE DATA

For demonstration purposes, include realistic sample expense data.

Do not make the sample data overwhelming.

Use examples such as:

College cafeteria lunch

Bus pass

Online course

Stationery

Movie

Phone recharge

Textbooks

Coffee

Hostel expense

UPI payment

Use realistic Indian Rupee values.

Clearly make it possible for the user to start with sample data or a clean account.

Do not force sample data into an existing user's account.

---

# 49. DEMO MODE

Consider implementing a simple:

**Load Demo Data**

action in Settings.

When selected, populate the application with realistic student expenses.

This is useful during the college presentation.

Ask for confirmation before replacing existing data.

---

# 50. NOTIFICATION SYSTEM

Create a lightweight toast notification system.

Support:

Success

Error

Warning

Information

Examples:

“Expense added successfully.”

“Expense updated.”

“Expense deleted.”

“Budget updated.”

“Profile saved.”

“Data exported successfully.”

Toasts should disappear automatically.

Do not show too many notifications simultaneously.

---

# 51. MODAL SYSTEM

Use a consistent modal design across the app.

Modal types:

Add expense

Edit expense

Delete confirmation

Profile editing

Budget editing

Import confirmation

Reset confirmation

Use:

* Overlay
* Escape key support
* Close button
* Focus management where practical

Do not allow accidental background interaction when critical modals are open.

---

# 52. RESPONSIVE DESIGN

The application must work well on:

Desktop

Laptop

Tablet

Mobile

Test common widths.

Desktop layout should use sidebar navigation.

Mobile layout should use compact navigation.

Forms should stack naturally on small screens.

Cards should resize gracefully.

Tables should become cards or horizontally scroll only when necessary.

AI assistant should fit mobile screens.

Do not create accidental horizontal page scrolling.

---

# 53. VISUAL DESIGN

Use a premium modern dashboard aesthetic.

Prioritize:

Whitespace

Hierarchy

Readable typography

Consistent spacing

Subtle borders

Modern cards

Clear icons

Professional data visualization

Avoid excessive gradients.

Avoid excessive shadows.

Avoid cartoon-like UI.

Avoid visual clutter.

Use a restrained professional color system.

Primary accent can be a modern green/teal financial color.

Ensure the design remains attractive in Dark Mode.

---

# 54. TYPOGRAPHY

Use a clean modern sans-serif font.

Maintain clear hierarchy:

Large dashboard greeting

Strong section titles

Readable body text

Small supporting labels

Do not use too many font sizes.

Maintain consistent line height.

Make numbers visually prominent.

---

# 55. ICONS

Use a consistent icon library if available.

Icons may represent:

Food

Transport

Education

Shopping

Entertainment

Bills

Health

Other

Do not mix unrelated icon styles.

Provide accessible labels/tooltips for icon-only actions.

---

# 56. ANIMATIONS

Add subtle animations.

Examples:

Card entrance

Modal opening

Toast appearance

Chart transitions

Button hover

Theme switching

Sidebar transitions

Do not over-animate.

Do not sacrifice performance.

Respect reduced-motion preferences where practical.

---

# 57. ACCESSIBILITY

Use semantic HTML.

Labels must be associated with inputs.

Buttons must have clear accessible names.

Do not rely solely on color to communicate status.

Maintain sufficient text contrast.

Keyboard navigation should work.

Focus states should be visible.

Modal dialogs should be keyboard accessible.

Images/icons should have meaningful alt text where applicable.

---

# 58. PERFORMANCE

Avoid unnecessary re-renders.

Use memoization only where beneficial.

Do not load heavy libraries unnecessarily.

Keep charts efficient.

Avoid storing unnecessarily large objects.

Handle empty states efficiently.

---

# 59. ERROR HANDLING

Implement graceful error handling throughout the app.

Never leave users with blank screens.

For unexpected application errors, show a friendly error state.

Example:

“Something went wrong.”

“Try refreshing the page or returning to the dashboard.”

Log useful information for development without exposing sensitive information to the user.

---

# 60. FORM UX

Forms should:

* Clearly identify required fields
* Use appropriate input types
* Show validation errors close to fields
* Preserve user data after validation errors
* Disable submission during processing where necessary
* Give clear success feedback
* Reset only after successful submission

Do not clear the entire form when there is a validation mistake.

---

# 61. DATE HANDLING

Use consistent date formatting.

Prefer a readable format such as:

12 Aug 2026

Store dates in a reliable machine-readable format.

Handle timezone issues carefully.

Use the user's local date for daily and monthly calculations.

---

# 62. CURRENCY HANDLING

Use Indian Rupees.

Display:

₹500

₹1,250

₹15,000

Use Indian number formatting.

Do not use dollar symbols.

Create a reusable currency formatting function.

---

# 63. CALCULATION LOGIC

Create reusable functions for:

calculateTotalExpenses()

calculateMonthlyExpenses()

calculateWeeklyExpenses()

calculateTodayExpenses()

calculateCategoryTotals()

calculateAverageDailySpend()

calculateLargestExpense()

calculateBudgetRemaining()

calculateBudgetPercentage()

calculateMonthlyChange()

All calculation logic should be tested.

Avoid duplicating financial calculations across multiple components.

---

# 64. DATA MODEL

Use a clear expense object.

Recommended fields:

id

title

amount

category

date

paymentMethod

note

createdAt

updatedAt

Use unique IDs.

Do not use array indexes as persistent record IDs.

---

# 65. SEARCH AND FILTER PERFORMANCE

Filtering should work correctly when combined.

Example:

Search = “food”

Category = Food

Payment Method = UPI

Date = Last 30 Days

Sorting should apply after filtering.

The displayed result count must reflect filtered results.

---

# 66. DASHBOARD DATA CONSISTENCY

When an expense is:

Added

Edited

Deleted

All dashboard metrics must automatically update.

This includes:

Total

Monthly total

Weekly total

Daily total

Budget progress

Category charts

Analytics

Recent expenses

AI assistant context

---

# 67. MOBILE UX

On mobile:

Use large touch targets.

Avoid tiny icon buttons.

Keep the Add Expense action easily accessible.

Make navigation intuitive.

Do not place too many controls side-by-side.

Allow charts to resize.

Make forms comfortable to fill out.

The AI assistant should be usable with a mobile keyboard.

---

# 68. PROFESSIONAL EMPTY STATE DESIGN

Use meaningful illustrations/icons.

Use concise instructions.

Example:

**No expenses yet**

“Start tracking your student spending.”

Button:

**Add Your First Expense**

Make empty states visually polished.

---

# 69. ABOUT SECTION

Create an About section.

Display:

**SpendWise**

“Personal Expense Tracking for Students”

Include a brief explanation of the project.

Add:

“Built as a college project.”

Do not invent awards, companies, users, or certifications.

---

# 70. PRESENTATION-FRIENDLY FEATURES

Optimize the application for a live college demonstration.

Make the first screen visually impressive.

Ensure sample data can quickly demonstrate:

Dashboard

Expense addition

Filtering

Budget tracking

Analytics

AI Assistant

Theme switching

Profile personalization

---

# 71. DEMONSTRATION FLOW

Make it possible to demonstrate the following sequence smoothly:

Open app

Enter student name

Enter Gmail address

Choose Dark Theme

Continue

See personalized greeting

View dashboard

Add an expense

See total update

Open Expenses

Search for the new expense

Filter by category

Edit expense

Delete expense

Open Budget

Set monthly budget

View progress

Open Analytics

View charts

Open SpendWise AI

Ask:

“Where am I spending the most?”

Receive data-aware response

Ask:

“How can I reduce my spending?”

Receive recommendations

Switch to Light Theme

Return to Dashboard

---

# 72. SAMPLE AI QUESTIONS

Include these quick questions:

“What did I spend this month?”

“What category costs me the most?”

“What was my largest expense?”

“Am I over budget?”

“How much can I spend if I want to stay within budget?”

“Give me three ways to save money.”

“Analyze my recent spending.”

“Show me my food spending.”

The assistant should answer based on current application data wherever possible.

---

# 73. AI BUDGET CALCULATION

If a user asks:

“How much can I spend per day?”

Calculate:

remaining monthly budget / remaining days in the month

Clearly explain the calculation.

Handle zero or negative remaining budget gracefully.

Example:

“You have ₹4,000 remaining and 10 days left, so your average available daily amount is about ₹400.”

---

# 74. AI SPENDING ANALYSIS

If asked:

“Analyze my spending.”

Return a concise structured response containing:

Total spent

Largest category

Largest expense

Budget status

One positive observation

Two actionable recommendations

Avoid extremely long responses.

---

# 75. AI PERSONALIZATION

Address the user by their first name when appropriate.

Example:

“Branu, your Food spending is currently your highest category.”

Do not overuse the name in every sentence.

---

# 76. SECURITY AND PRIVACY

Do not expose the Gmail address unnecessarily.

Do not show the user's full email in public-facing dashboard areas unless appropriate.

Do not send private information to external services unless required and properly handled.

Never hardcode API keys.

Do not store secrets in LocalStorage.

---

# 77. DATA RESET

Reset should remove:

Expenses

Budget

Profile

Theme preferences

Relevant application settings

Ask for explicit confirmation.

After reset, return the user to onboarding.

Do not perform destructive reset accidentally.

---

# 78. IMPORT VALIDATION

When importing data:

Verify the file structure.

Verify expense fields.

Verify amounts are valid.

Verify dates are valid.

Reject malformed files gracefully.

Show:

“Invalid data file.”

Do not crash the application.

---

# 79. ACCESSIBLE FEEDBACK

Do not communicate important errors only through color.

Examples:

Instead of only a red border:

“Amount must be greater than ₹0.”

Instead of only a green toast:

“Expense added successfully.”

---

# 80. DESIGN CONSISTENCY

Use consistent:

Button radius

Card radius

Spacing

Border treatment

Icon size

Typography

Input styles

Modal styles

Toast styles

Navigation states

Do not create each component with unrelated styling.

---

# 81. COMPONENT ARCHITECTURE

Create reusable components such as:

AppShell

Sidebar

MobileNavigation

Header

GreetingBanner

SummaryCard

ExpenseCard

ExpenseTable

ExpenseForm

ExpenseModal

FilterBar

SearchBar

BudgetCard

BudgetProgress

AnalyticsCard

ChartContainer

CategoryBreakdown

Toast

Modal

ProfileMenu

ThemeToggle

AIAssistant

AIMessage

AIInput

EmptyState

ConfirmationDialog

SettingsSection

---

# 82. CODE QUALITY

Use meaningful variable names.

Avoid giant components.

Break complex components into smaller pieces.

Avoid duplicated business logic.

Add comments only where useful.

Do not over-comment obvious code.

Keep functions focused.

---

# 83. NO PLACEHOLDER UI

Do NOT use text such as:

“Coming Soon”

“TODO”

“Feature Coming Later”

“Dummy Button”

“Placeholder”

for required functionality.

Everything requested in this specification must be implemented.

---

# 84. NO FAKE DATA IN CALCULATIONS

Sample data is allowed for demonstration.

But calculations must always use the actual current dataset.

Do not display:

₹25,000

just because it looks good.

Calculate it.

Do not hardcode percentages.

Calculate them from data.

---

# 85. DATABASE / STORAGE ABSTRACTION

Create a storage layer so the application can later migrate from LocalStorage to a real database.

Do not tightly couple every component directly to LocalStorage.

Centralize data persistence operations.

---

# 86. INITIAL STATE

On the first run:

Show onboarding.

After onboarding:

Display either a clean dashboard or optional demo data.

Do not show confusing empty charts.

When empty, provide useful empty states.

---

# 87. DEMO DATA DESIGN

Create at least 12 realistic sample expenses if the user selects demo mode.

Spread them across:

Food

Transport

Education

Shopping

Entertainment

Bills

Use dates across the current month and previous month.

Create data that produces visually interesting charts.

Do not use absurdly high values.

---

# 88. USER EXPERIENCE DETAILS

Every important action must have feedback.

Every destructive action must have confirmation.

Every form must have validation.

Every empty screen must explain what to do next.

Every chart must have context.

Every icon-only button should have a tooltip.

---

# 89. TOOLTIP SUPPORT

Add tooltips for unfamiliar icon actions.

Examples:

Edit

Delete

Theme

Notifications

Export

AI Assistant

Use tooltips without blocking normal interaction.

---

# 90. NOTIFICATIONS CENTER

Include a notification area.

Notifications can include:

Budget warnings

Successful exports

Budget updates

Important spending insights

Make notifications data-driven.

Avoid notification spam.

Allow marking notifications as read if implemented.

---

# 91. OPTIONAL CREATIVE FEATURE

Add a creative feature called:

**Smart Saving Goal**

Allow the student to create a savings target.

Fields:

Goal name

Target amount

Current saved amount

Target date

Show:

Percentage completed

Amount remaining

Required saving per week

Required saving per month

Display a progress bar.

Make this feature integrate into the dashboard.

---

# 92. SMART SAVING GOAL AI INTEGRATION

Allow SpendWise AI to analyze the savings goal.

Example:

“I want to save ₹10,000 in 5 months.”

The assistant can calculate:

Required monthly saving

Required weekly saving

Suggested spending adjustment

The AI should use actual expense data when suggesting adjustments.

---

# 93. SMART SAVING GOAL UI

Create a card:

**Savings Goal**

Example:

🎯 New Laptop

₹6,000 / ₹30,000

20% complete

Remaining:

₹24,000

Include an Edit Goal action.

---

# 94. DASHBOARD PERSONALIZATION

Show a compact personalized summary.

Example:

“Your spending is 8% lower than last month.”

or:

“You’ve spent 15% more this month.”

Use real calculations.

If comparison data is unavailable:

“Keep tracking your expenses to unlock spending comparisons.”

---

# 95. ACCESSIBLE RESPONSIVENESS

Do not rely on hover-only functionality.

All important functionality should be accessible through touch and keyboard.

Ensure focus states remain visible.

Make buttons large enough for touch interaction.

---

# 96. QUALITY ASSURANCE

After implementation, perform a complete functional review.

Test:

Onboarding

Validation

Theme switching

Profile editing

Expense creation

Expense editing

Expense deletion

Search

Filtering

Sorting

Budget calculations

Analytics

Charts

AI assistant

Data persistence

Reset

Export

Import

Mobile responsiveness

---

# 97. REFRESH TEST

Add an expense.

Refresh the browser.

Verify that the expense is still present.

Switch the theme.

Refresh the browser.

Verify that the theme is preserved.

Update the profile.

Refresh the browser.

Verify that the profile remains updated.

---

# 98. EDGE CASE TESTING

Test:

No expenses

One expense

Many expenses

Zero previous-month spending

Budget = 0

Very large expense

Invalid input

Very long title

Duplicate expense titles

Future date

Invalid imported data

Deleted last expense

Budget exceeded

No matching search result

No matching filter result

---

# 99. AI TESTING

Test:

AI with no expenses

AI with one expense

AI with many expenses

AI asking for total

AI asking for category analysis

AI asking for budget status

AI asking for saving advice

AI service failure

Missing API configuration

AI should never crash the application.

---

# 100. MOBILE TESTING

Check approximately:

320px width

375px width

390px width

768px width

1024px width

1440px width

Ensure no broken layouts.

---

# 101. FINAL POLISH PASS

Before considering the application complete:

Remove console errors.

Remove broken links.

Remove unused buttons.

Remove placeholder content.

Check spelling.

Check number formatting.

Check currency formatting.

Check date formatting.

Check mobile layout.

Check dark mode.

Check light mode.

Check empty states.

Check loading states.

Check error states.

Check accessibility.

---

# 102. VISUAL POLISH PASS

Make the application feel like a finished product.

Use:

Clean spacing

Strong hierarchy

Elegant cards

Professional navigation

Subtle shadows

Clear typography

Consistent iconography

Responsive charts

Smooth interactions

Avoid:

Clutter

Huge empty spaces

Random colors

Too many gradients

Excessive rounded corners

Childish illustrations

---

# 103. LANDING / ONBOARDING QUALITY

The first impression is important.

Make onboarding visually impressive.

Use a split layout on desktop if appropriate.

Left side:

SpendWise branding

Short description

Benefits

Right side:

Profile setup form

On mobile:

Stack the sections vertically.

Do not make onboarding excessively long.

---

# 104. MICROCOPY

Use clear professional text.

Avoid robotic text such as:

“Data has successfully been inserted.”

Prefer:

“Expense added successfully.”

Avoid generic labels.

Use:

“Add Expense”

rather than:

“Submit Data”

---

# 105. USER-FRIENDLY ERROR MESSAGES

Bad:

“Invalid input.”

Good:

“Please enter an amount greater than ₹0.”

Bad:

“Validation failed.”

Good:

“Please enter a valid Gmail address.”

---

# 106. LOADING STATES

Where asynchronous operations exist, show meaningful loading states.

AI:

“SpendWise AI is thinking…”

Data import:

“Importing your data…”

Do not freeze the interface.

---

# 107. AI RESPONSE DESIGN

AI responses should support:

Short paragraphs

Bullet points when useful

Highlighted numbers

Contextual action buttons

Do not return huge walls of text.

Keep answers presentation-friendly.

---

# 108. AI CONTEXT GENERATION

Before sending a user query to the AI, construct a clean application context.

Include relevant calculated values.

For example:

Current month total

Budget

Remaining budget

Top categories

Recent expenses

Largest transaction

Monthly comparison

Do not expose unnecessary implementation details.

---

# 109. AI TOOL ROUTING

Implement a lightweight tool-selection system.

Example intent:

“total spending”

→ getMonthlyExpenses()

“biggest expense”

→ getLargestExpense()

“highest category”

→ getCategoryBreakdown()

“budget”

→ getBudgetStatus()

“recent purchases”

→ getRecentExpenses()

“search food”

→ searchExpenses()

Use the most relevant tool before generating a response.

---

# 110. AI FALLBACK INTELLIGENCE

If a real LLM is unavailable:

Use keyword and intent matching.

Support common questions.

Generate natural responses from actual stored data.

Example:

User:

“What did I spend on food?”

Fallback:

“You spent ₹2,450 on Food this month across 6 transactions.”

This fallback should be genuinely functional.

---

# 111. AI CONFIRMATION POLICY

The AI must never automatically:

Delete expenses

Modify expenses

Reset data

Change the budget

without explicit user interaction.

For potentially destructive actions:

Require a confirmation button.

---

# 112. SECURITY POLICY

Never put:

API keys

Secrets

Private credentials

inside frontend source code.

Use environment variables.

Provide a clearly documented environment variable name for an AI provider if needed.

If the environment does not support server-side secrets, implement the local fallback rather than exposing secrets.

---

# 113. DOCUMENTATION

Create a concise README.

Include:

Project name

Project purpose

Features

Technology stack

How to run

How to configure AI

How persistence works

How demo data works

How to reset data

---

# 114. ENVIRONMENT SETUP

Make the application easy to run.

Provide clear commands if applicable.

Do not assume complicated infrastructure.

The final project should be easy to demonstrate on a college computer.

---

# 115. BUILD VALIDATION

After implementation:

Run the application.

Fix build errors.

Fix runtime errors.

Fix console warnings where meaningful.

Test every major interaction.

Do not stop merely because the page renders.

---

# 116. FINAL ACCEPTANCE CRITERIA

The application is complete only when:

The user can onboard.

The user can choose Light/Dark theme.

The user's name appears dynamically.

The user's Gmail is validated.

Expenses can be added.

Expenses can be edited.

Expenses can be deleted.

Expenses can be searched.

Expenses can be filtered.

Expenses can be sorted.

Totals are calculated dynamically.

Budget can be configured.

Budget status is shown.

Analytics use real data.

Charts update from real data.

Data survives refresh.

AI assistant works.

AI assistant uses application data.

AI fallback works when external AI is unavailable.

Notifications work.

Data reset works.

The application works on mobile.

No major UI element is non-functional.

---

# 117. PRESENTATION QUALITY REQUIREMENT

The finished application should look like something a student could confidently present to:

* College faculty
* Project evaluators
* Classmates
* Potential recruiters

The UI should immediately communicate:

Professionalism

Functionality

Technical skill

Attention to detail

Real-world usefulness

---

# 118. IMPORTANT IMPLEMENTATION RULE

Do not prioritize visual appearance over functionality.

The correct priority is:

1. Functional correctness
2. Data correctness
3. Responsive behavior
4. Validation
5. Accessibility
6. UI polish
7. Animations

A beautiful broken application is not acceptable.

---

# 119. IMPORTANT DESIGN RULE

Do not generate a generic dashboard template.

The interface should clearly feel like a student expense-management product.

Use student-oriented examples.

Use Indian Rupee values.

Use relatable categories.

Use personalized greetings.

Use a friendly but professional tone.

---

# 120. IMPORTANT INTERACTION RULE

Every button visible to the user must either:

perform an action,

open a functional interface,

navigate to a functional section,

or provide meaningful feedback.

Never include a decorative button solely to make the interface look complete.

---

# 121. FINAL FEATURE CHECKLIST

Before finishing, verify:

✓ Onboarding

✓ Gmail validation

✓ Personalized greeting

✓ Light Theme

✓ Dark Theme

✓ Dashboard

✓ Expense CRUD

✓ Search

✓ Filter

✓ Sort

✓ Budget

✓ Budget warning

✓ Analytics

✓ Charts

✓ Notifications

✓ Persistent storage

✓ Export

✓ Import

✓ Reset

✓ AI Assistant

✓ AI fallback

✓ Smart Saving Goal

✓ Responsive design

✓ Accessibility

✓ Error handling

✓ Empty states

✓ Loading states

✓ Demo data

✓ Professional visual design

---

# 122. FINAL REQUEST TO ANTIGRAVITY

Now build the complete SpendWise web application according to every requirement above.

Do not merely provide mockups.

Do not stop at UI design.

Implement the functionality.

Create the required components.

Create the required data models.

Create the storage layer.

Implement calculations.

Implement validation.

Implement search and filters.

Implement charts.

Implement theme switching.

Implement onboarding.

Implement the AI assistant architecture.

Implement fallback AI functionality if external AI is unavailable.

Implement responsive behavior.

Then run and test the application.

Identify functional problems.

Fix them.

Check the application again.

Perform a final visual polish pass.

Ensure there are no obvious broken interactions.

The final result should be a polished, professional, interactive student expense tracker suitable for a college project presentation.

Add the developer name in the footer as "Developed by Sam Branham Christopher I"

Most importantly:

**Build a real working application, not a static prototype.**
