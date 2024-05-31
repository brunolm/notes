---
name: Circular JSON Stringify
---

```ts
const safeStringify = (obj: unknown, indent = 2) => {
  let cache = []
  const retVal = JSON.stringify(
    obj,
    (_k, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.includes(value)) {
          return undefined
        }
        cache.push(value)
        return value
      }
      return value
    },
    indent,
  )
  cache = null

  return retVal
}
```

http://stackoverflow.com/a/11616993/340760
