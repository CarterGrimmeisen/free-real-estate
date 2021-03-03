# Frontend API Hooks

This directory contains hooks that allow the frontend to interact with the api.

Example usage is as follows

```typescript
import { useRequest, useUser } from '@/hooks/api'

const { getUser } = useUser()
const [user, userReady] = useRequest(getUser())

return { user, userReady }
```
