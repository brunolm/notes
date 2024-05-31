---
name: List Containers
---

```
docker ps
docker ps --filter "name=$SEARCH" --filter status=running --format 'table {{.ID}}\t{{.Names}}\t{{.Status}}'
```
