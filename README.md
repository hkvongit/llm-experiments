## Node version
```bash
v25.5.0
```
This version has native typescript runtime. So please ensure you use this node version.

---

## Vector Database
- I am using Chroma DB cloud version for this project.
- Follow [this official documentation](https://www.trychroma.com/brosgiant/aws-us-east-1/dev/sdk) for setting up

### Why not pg vector
- ❌ I FAILED INSTALLING `pgvector` ON MY MAC V13 SO SWITCHING TO CHROMA-DB CLOUD.
My failed attempt is as below
- For this we need to install postgres and pgadmin initially on our local machine.
- Then we need to use vector EXTENSION in postgreSQL db.
- Setup for pg admin is detailed [here](https://github.com/pgvector/pgvector).
- - Read all steps carefully

## Langchain
- To see the code for langchain learning switch to git branch `langchain-learning`


