---
name: serveo
---

[Serveo](https://serveo.net/) is an SSH server just for remote port forwarding. When you run `ssh -R 80:localhost:8080 serveo.net`, you can access your localhost from anywhere. No installation required. Just ssh to serveo.net and you're good to go.

### Usage

```sh
ssh -R 80:localhost:8080 serveo.net
```

### Example

```sh
ssh -R 80:localhost:8080 serveo.net
# Forwarding HTTP traffic to http://serveo.net:80
```

### Resources

- [Homepage](https://serveo.net/)
- [GitHub](
