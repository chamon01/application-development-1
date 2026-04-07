# Week12 Reflection

## What is the difference between authentication and authorization?
Authentication checks who the user is. Authorization checks what that user is allowed to do after they are logged in.

## Why does /admin return 403 for a regular user instead of 401?
It returns 403 because the user is already logged in, but they do not have permission to access the admin route. A 401 would mean they are not logged in at all.

## Why is ownership checking important?
Ownership checking is important because it stops users from viewing or changing resources that belong to someone else.

## What is the difference between role-based access and ownership-based access?
Role-based access gives permission based on a user’s role, like admin or user. Ownership-based access gives permission based on whether the resource belongs to that specific user.

## Why should authorization checks happen on the server instead of the client?
Authorization checks should happen on the server because the client can be changed or bypassed by a user. The server is the trusted place to enforce security rules.