console.log("=== Identification Header ===");
console.log("Name: Conner Hamon");
console.log("Course: CS31103");
console.log("Week 3");
console.log("");


console.log("=== Runtime Information ===");
console.log("Node Version:", process.version);
const now = new Date();
console.log("Current Date/Time:", now.toString());
console.log("");


const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const environment = process.env.NODE_ENV ? process.env.NODE_ENV : "development";


console.log("=== Configuration (Environment Variables) ===");
console.log("PORT:", port);
console.log("NODE_ENV:", environment);
console.log("");


const appConfig = {
port,
environment,
startedAt: now.toISOString()
};


console.log("=== appConfig Object (JSON) ===");
console.log(JSON.stringify(appConfig, null, 2));