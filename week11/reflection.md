# Week11 Reflection

## 1. What is a session?
A session is a way for the server to remember a user across multiple requests after they log in.

## 2. What does the server store?
The server stores session data, such as whether the user is logged in and basic user information.

## 3. What does the client store?
The client stores a session cookie that identifies which session belongs to that user.

## 4. Why does /profile fail before login?
It fails because there is no logged-in user stored in the session yet, so the requireLogin middleware blocks access.

## 5. Why does /profile work after login?
It works because the login route creates a session and stores the user in req.session.user.

## 6. Why does /profile fail again after logout?
It fails again because logout destroys the session, so the server no longer sees the user as logged in.