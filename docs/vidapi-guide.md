# VidAPI Anime Integration Guide

## 1. Overview

VidAPI provides a simple and efficient way to access anime data through its REST API endpoints. This guide covers the integration of VidAPI's anime endpoints into web applications.

### Base URL
```
https://vidapi.xyz/ani-api
```

### Available Endpoints

| Endpoint | Description |
|----------|-------------|
| `/new?page={page number}` | Fetches paginated list of new anime releases |

### Response Format
All endpoints return JSON data with a consistent structure.

## 2. Endpoint Documentation

### New Releases Endpoint

**URL Structure:**
```
GET https://vidapi.xyz/ani-api/new?page={page number}
```

**Parameters:**
- `page` (required): Page number for pagination, starting from 1

**Response Format:**
```typescript
interface AnimeResponse {
  data: Array<{
    id: string;
    title: string;
    // Additional fields based on actual response
  }>;
  pagination?: {
    currentPage: number;
    hasNextPage: boolean;
  };
}
```

**Rate Limiting:**
Currently, no explicit rate limiting is documented. However, it's recommended to implement reasonable request throttling.

## 3. Implementation Steps

1. Create a dedicated API client
2. Implement error handling and retries
3. Set up response caching
4. Handle pagination
5. Implement data transformation

## 4. Code Examples

See the implementation in `lib/api/vidapi.ts` for working code examples.

## 5. Best Practices

### Caching
- Implement client-side caching using React Query
- Cache responses for a reasonable duration (e.g., 5 minutes)
- Implement stale-while-revalidate pattern

### Error Handling
- Implement retry logic for failed requests
- Provide fallback UI for error states
- Log errors for monitoring

### Performance
- Implement pagination
- Use React Suspense for loading states
- Implement infinite scrolling for better UX

## 6. Common Issues & Solutions

### Network Errors
- Implement exponential backoff for retries
- Show appropriate error messages to users
- Provide refresh functionality

### Data Inconsistency
- Validate response data
- Transform data into consistent format
- Handle missing or null values

### Rate Limiting
- Implement request throttling
- Queue requests when approaching limits
- Show appropriate feedback to users