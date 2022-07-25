# Getting Started with Redis Caching Concept with Node.js

This is a simple Node implementation of the Redis Caching Concept. The API will look up the Redis Local Server for the Post and, upon successful retrieval, it will return the Redis Local Server instance of that Post. Otherwise, it will call the Database Connection for that Post and then create a new Redis Local Server (key, value) pair for that Post in order to cache the database results.
