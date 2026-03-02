# Code Review Reflection

## What parts of your code were hardest to read?
The controllers were hardest to read because the same error response format was repeated, which hid the main logic.

## Where did you duplicate logic?
Error response JSON and “find by id” patterns were duplicated across controllers.

## What naming improvements did you make?
I replaced short variable names with clearer names (for example t -> task and idx -> index).

## What documentation was missing before?
A professional README, a full endpoint list, and an API documentation file with consistent request/response examples.

## If another developer inherited this API, what would confuse them?
The API key rule and expected request bodies would be unclear without documentation, and duplicated patterns make maintenance harder.