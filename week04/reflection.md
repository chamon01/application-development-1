# Week 4 Reflection

## What was the original bug, and why did Node throw an error?
The program was referncing a variable called discount which wasn't ever defined. And then Node threw a reference error because it can't use variable that just don't exist.

## How did logging help explain program behavior?
Logging did help show the values of price, quantity, total, as well as the final result, which really helped show where the discount logic was being triggered.

## Why is testing better than manually re-running the script?
The testing method was better than rerunning the script because it really helps with confirming that the program still worked as expected without relying solely on memory.

## Which test would you keep if you could only keep one, and why?
If I could only keep one test then the discount-applied test would be the one I keep because it validates the main business rule of the program.