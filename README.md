# Getting Started with Redis Caching Concept with Node.js

This is a simple Node implementation of the Redis Caching Concept. The API will look up the Redis Local Server for the Post and, upon successful retrieval, it will return the Redis Local Server instance of that Post. Otherwise, it will call the Database Connection for that Post and then create a new Redis Local Server (key, value) pair for that Post in order to cache the database results.

That (key, value) combination will have a 10-second expiration period after which it will be deleted from the Redis In-memory database. When that URL with that ID is accessed again, Redis will transfer control to the database, and the process will repeat again. This ensures that the Redis Local Server always returns the most recent Post with any ID.
