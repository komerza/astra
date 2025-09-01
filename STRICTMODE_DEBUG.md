# React StrictMode and Multiple API Calls - Debugging Guide

## Problem: 3 `getStore` Requests on Initial Load

You're seeing 3 requests to `viewId` (the `getStore` function) on initial app load. This is primarily caused by **React.StrictMode** in development mode.

## Root Cause: React.StrictMode Behavior

React.StrictMode intentionally **double-invokes** effects and functions in development to help detect side effects. In React 18+, this can cause:

1. Components to mount → unmount → remount rapidly
2. Effects to run multiple times
3. State initializers to be called twice

## Sources of the 3 Calls

### Call #1: StoreDataProvider Effect

- **When**: App mounts and `useKomerza().ready` becomes `true`
- **Where**: `StoreDataProvider` useEffect in `store-data.ts`
- **Why**: Normal component mounting behavior

### Call #2: StrictMode Double-Execution

- **When**: React.StrictMode causes the effect to run again
- **Where**: Same `StoreDataProvider` effect, but triggered by StrictMode
- **Why**: React.StrictMode double-invokes effects in development

### Call #3: Product Lookup Fallback (if applicable)

- **When**: If any component tries to look up a specific product on initial load
- **Where**: `getProduct()` fallback logic calls `this.getStore()`
- **Why**: Product not found via direct API, falls back to searching store data

## Solutions Implemented

### 1. **Pending Request Tracking**

```typescript
// Prevents duplicate simultaneous requests
if (this.pendingRequests.has(key)) {
  console.log("⏳ Store request already in flight, waiting...");
  return this.pendingRequests.get(key);
}
```

### 2. **StoreDataProvider Protection**

```typescript
const fetchInitiated = useRef(false);
// Prevents re-fetching even if effect runs multiple times
if (!ready || products.length > 0 || fetchInitiated.current) return;
fetchInitiated.current = true;
```

### 3. **Disabled Cache Warming in Development**

```typescript
// Only warm cache in production to avoid StrictMode issues
if (process.env.NODE_ENV === "production") {
  komerzaCache.warmCache();
}
```

### 4. **Enhanced Logging**

- Stack trace logging to identify call sources
- Request counting to track total API calls
- Component-specific logging for debugging

## Expected Behavior

### Development Mode (with StrictMode)

- **Initial load**: 1-2 `getStore` calls (due to StrictMode)
- **Navigation**: 0 additional calls (served from cache)
- **Debug info**: Console logs show call sources and cache hits

### Production Mode (no StrictMode)

- **Initial load**: 1 `getStore` call
- **Cache warming**: Preloads banner data
- **Navigation**: 0 additional calls (served from cache)

## Verification Steps

1. **Open browser console** and navigate to the app
2. **Look for logs**:

   ```
   🔍 getStore called from: [stack trace]
   🏪 StoreDataProvider: Initiating store data fetch
   🌐 Fetching fresh store data
   📊 Total API requests made: 1
   ```

3. **Navigate between pages** - should see:

   ```
   📦 Using cached store data
   ```

4. **Check cache status** - Press `Ctrl+Shift+C` to see cache entries

## Production Behavior

In production builds:

- React.StrictMode is automatically disabled
- Only 1 `getStore` call will be made on initial load
- Cache warming will preload banner data
- All subsequent navigation will use cached data

## Manual Testing

To test without StrictMode effects:

1. **Remove StrictMode temporarily**:

   ```tsx
   // In main.tsx, wrap without StrictMode
   ReactDOM.createRoot(document.getElementById("root")!).render(
     <KomerzaProvider>
       <StoreDataProvider>
         <CartProvider>
           <App />
         </CartProvider>
       </StoreDataProvider>
     </KomerzaProvider>
   );
   ```

2. **Clear cache and reload**:
   ```javascript
   // In browser console
   komerzaCache.clearAll();
   window.location.reload();
   ```

## Monitoring Tools

### Console Logging

- `🔍` - Shows call stack for debugging
- `📦` - Cache hit (no API call)
- `🌐` - Fresh API call
- `⏳` - Request already in flight
- `📊` - Request counter

### Debug Panel

- Press `Ctrl+Shift+C` in development
- Shows cache size and active keys
- Manual cache warming/clearing buttons

## Summary

The 3 `getStore` calls are **expected behavior in development** due to React.StrictMode. The cache system prevents duplicate actual API calls and will show only 1 call in production. All subsequent navigation benefits from caching regardless of the initial StrictMode behavior.
