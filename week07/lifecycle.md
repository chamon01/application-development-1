# Lifecycle

## Valid POST /tasks with correct API key
1. express.json parses the request body
2. logger middleware logs the request
3. timing middleware starts the timer
4. apiKey middleware checks header and passes
5. validateTask middleware validates fields
6. controller.create runs and sends 201 response
7. response finishes and timing logs execution time

## POST /tasks without required field
1. express.json parses the request body
2. logger runs
3. timing starts
4. apiKey passes
5. validateTask fails and sends 400 response
6. controller does NOT run (short-circuited)
7. timing logs execution time

## POST /tasks with missing API key
1. express.json parses the request body
2. logger runs
3. timing starts
4. apiKey fails and sends 401 response
5. routes and controller do NOT run
6. timing logs execution time