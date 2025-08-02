# ProductComments API Testing Guide

## Completed Implementation

### 1. Model Updates
- **ProductComment** model updated with:
  - Added `Rating` field (1-5 rating system)
  - Renamed `Content` to `Comment` for clarity
  - Maintained all existing relationships

### 2. DTOs Created/Updated
- **ProductCommentCreateDTO**: `(int ProductId, string Comment, int Rating)`
- **ProductCommentDTO**: `(int Id, int ProductId, string Comment, int Rating, DateTime CreatedAt, string UserName)`
- **ProductCommentUpdateDTO**: `(string Comment, int Rating)`

### 3. Database Migration
- Migration created: `20250801083100_UpdateProductCommentModel`
- Adds Rating column and renames Content to Comment

### 4. API Endpoints Implemented

#### POST /api/productcomments
- **Purpose**: Add new comment to product
- **Authorization**: Requires authentication
- **Validation**:
  - Rating: 1-5 range
  - Comment: 10-500 characters
  - ProductId: Must exist
  - One comment per user per product
- **Request Body**:
```json
{
  "productId": 1,
  "comment": "This is a great product with excellent quality",
  "rating": 5
}
```

#### GET /api/productcomments/{productId}
- **Purpose**: Get all comments for a product
- **Authorization**: Public (no auth required)
- **Response**: Array of ProductCommentDTO

#### PUT /api/productcomments/{id}
- **Purpose**: Update own comment
- **Authorization**: Comment owner only
- **Request Body**:
```json
{
  "comment": "Updated comment text",
  "rating": 4
}
```

#### DELETE /api/productcomments/{id}
- **Purpose**: Delete comment
- **Authorization**: Comment owner or Admin role

## Testing Instructions

### Prerequisites
1. PostgreSQL database running on localhost:5432
2. Database: `e_commercedb`
3. Run migrations: `dotnet ef database update --project ECommerce.Infrastructure --startup-project ECommerce.API`

### Example Test Sequence

1. **Start the application**:
```bash
cd ECommerce.API
dotnet run
```

2. **Login to get JWT token**:
```bash
curl -X POST "http://localhost:5095/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'
```

3. **Add a comment** (with token):
```bash
curl -X POST "http://localhost:5095/api/productcomments" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "comment": "This product is amazing! Great quality and fast delivery.",
    "rating": 5
  }'
```

4. **Get comments for product** (public):
```bash
curl -X GET "http://localhost:5095/api/productcomments/1"
```

5. **Update comment** (owner only):
```bash
curl -X PUT "http://localhost:5095/api/productcomments/1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "comment": "Updated: This product exceeded my expectations!",
    "rating": 5
  }'
```

6. **Delete comment** (owner or admin):
```bash
curl -X DELETE "http://localhost:5095/api/productcomments/1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Key Features Implemented

### Validation Rules
- ✅ Rating must be 1-5
- ✅ Comment must be 10-500 characters
- ✅ ProductId must be valid
- ✅ One comment per user per product

### Authorization Rules
- ✅ Creating comments: Authenticated users only
- ✅ Viewing comments: Public access
- ✅ Updating comments: Owner only
- ✅ Deleting comments: Owner or Admin role

### Error Handling
- ✅ Validation errors return 400 Bad Request
- ✅ Authentication errors return 401 Unauthorized
- ✅ Authorization errors return 403 Forbidden
- ✅ Not found errors return 404 Not Found
- ✅ Server errors return 500 Internal Server Error

The implementation is complete and follows all the requirements specified in the problem statement.