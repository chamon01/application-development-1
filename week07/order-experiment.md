# Order Experiment

Change made
Moved API key middleware below the route registration.

What broke
POST/PATCH/DELETE requests worked without the x-api-key header.

Why
Express executes middleware in the order it is registered.
Because routes ran first, the controller sent a response before the API key middleware executed.

Error
No runtime error occurred, but authorization was bypassed.

Fix
Moved the API key middleware back above the routes so it runs before controllers.