# nextjs redis bullmq typescript demo

Just a simple demo app to show how to use bullmq with redis, with
typescript on both sides (worker and server). No docker here, sir, we
use makefiles.

The worker is a simple nodejs app that will listen to a queue and process the jobs. 
The server is a simple next app that will create jobs and send them to the queue.

## How to run

```bash
redis-stack-start # or whatever you use to start redis
make
```

this will start the worker and the server. 

