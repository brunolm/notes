---
name: Cleanup volumes
---

```sh
docker run -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker:/var/lib/docker --rm martin/docker-cleanup-volumes #--dry-run
```