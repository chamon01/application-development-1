## ORM Reflection

**1. What problems does raw SQL create in large applications?**  
Raw SQL can become repetitive, hard to maintain, and easy to break when schemas change. It can also lead to security bugs like SQL injection if the input is not parameterized everywhere.

**2. What is an ORM in your own words?**  
An ORM is a library that lets you work with database tables using code objects and methods instead of writing SQL for everything.

**3. What does an ORM replace or simplify?**  
It simplifies CRUD operations, mapping rows to objects, migrations/schema changes, and often validation and relationships.

**4. When would you NOT want to use an ORM?**  
When you need maximum performance, very complex queries, or you want full control over SQL and query plans.