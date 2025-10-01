# AWS Setup Guide for Julethi Boutique

This guide provides step-by-step instructions to set up the complete AWS infrastructure for the Julethi Boutique application.

## Architecture Overview

- **DynamoDB**: Product and admin data storage
- **Lambda Functions**: API handlers for CRUD operations
- **API Gateway**: REST API endpoints
- **IAM**: Permissions management

---

## Step 1: Create DynamoDB Table

### Via AWS Console

1. Go to **DynamoDB Console**
2. Click **Create table**
3. Configure:
   - **Table name**: `JulethiBoutiqueTable`
   - **Partition key**: `Entity` (String)
   - **Sort key**: `Type` (String)
4. Click **Create table**
5. After creation, go to **Indexes** tab
6. Create **GSI1**:
   - Click **Create index**
   - **Partition key**: `GSI1PK` (String)
   - **Sort key**: `GSI1SK` (String)
   - **Index name**: `GSI1`
   - Click **Create index**
7. Create **GSI2**:
   - Click **Create index**
   - **Partition key**: `GSI2PK` (String)
   - **Sort key**: `GSI2SK` (String)
   - **Index name**: `GSI2`
   - Click **Create index**

### Via AWS CLI

```bash
aws dynamodb create-table \
  --table-name JulethiBoutiqueTable \
  --attribute-definitions \
    AttributeName=Entity,AttributeType=S \
    AttributeName=Type,AttributeType=S \
    AttributeName=GSI1PK,AttributeType=S \
    AttributeName=GSI1SK,AttributeType=S \
    AttributeName=GSI2PK,AttributeType=S \
    AttributeName=GSI2SK,AttributeType=S \
  --key-schema \
    AttributeName=Entity,KeyType=HASH \
    AttributeName=Type,KeyType=RANGE \
  --global-secondary-indexes \
    "[
      {
        \"IndexName\": \"GSI1\",
        \"KeySchema\": [
          {\"AttributeName\":\"GSI1PK\",\"KeyType\":\"HASH\"},
          {\"AttributeName\":\"GSI1SK\",\"KeyType\":\"RANGE\"}
        ],
        \"Projection\": {\"ProjectionType\":\"ALL\"},
        \"ProvisionedThroughput\": {
          \"ReadCapacityUnits\": 5,
          \"WriteCapacityUnits\": 5
        }
      },
      {
        \"IndexName\": \"GSI2\",
        \"KeySchema\": [
          {\"AttributeName\":\"GSI2PK\",\"KeyType\":\"HASH\"},
          {\"AttributeName\":\"GSI2SK\",\"KeyType\":\"RANGE\"}
        ],
        \"Projection\": {\"ProjectionType\":\"ALL\"},
        \"ProvisionedThroughput\": {
          \"ReadCapacityUnits\": 5,
          \"WriteCapacityUnits\": 5
        }
      }
    ]" \
  --provisioned-throughput \
    ReadCapacityUnits=5,WriteCapacityUnits=5
```

---

## Step 2: Create IAM Role for Lambda

1. Go to **IAM Console** → **Roles**
2. Click **Create role**
3. Select **AWS service** → **Lambda**
4. Attach policies:
   - `AWSLambdaBasicExecutionRole`
   - `AmazonDynamoDBFullAccess` (or create custom policy for minimal permissions)
5. Name: `JulethiLambdaExecutionRole`
6. Click **Create role**

### Custom Policy (Recommended for Production)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": [
        "arn:aws:dynamodb:REGION:ACCOUNT_ID:table/JulethiBoutiqueTable",
        "arn:aws:dynamodb:REGION:ACCOUNT_ID:table/JulethiBoutiqueTable/index/*"
      ]
    }
  ]
}
```

---

## Step 3: Create Lambda Functions

### Create Each Function Individually

For each function in `lambda-functions.js`, create a Lambda function:

1. Go to **Lambda Console**
2. Click **Create function**
3. Choose **Author from scratch**
4. Configure:
   - **Function name**: (e.g., `getAllProducts`)
   - **Runtime**: Node.js 18.x or later
   - **Execution role**: Use existing role `JulethiLambdaExecutionRole`
5. Click **Create function**
6. In the code editor, paste the corresponding function from `lambda-functions.js`
7. Add environment variable:
   - Key: `TABLE_NAME`
   - Value: `JulethiBoutiqueTable`
8. Click **Deploy**

### List of Functions to Create

1. **getAllProducts**
2. **getProductById**
3. **getProductsByCategory**
4. **getNewArrivals**
5. **searchProducts**
6. **createProduct**
7. **updateProduct**
8. **deleteProduct**
9. **adminLogin**
10. **getDashboardStats**
11. **initializeAdmin** (run once to create admin user)

### Package Dependencies

Add `aws-sdk` as a layer or include in deployment package:

```bash
mkdir nodejs
cd nodejs
npm init -y
npm install aws-sdk
cd ..
zip -r layer.zip nodejs
```

Upload as Lambda Layer or include in each function.

---

## Step 4: Create API Gateway

1. Go to **API Gateway Console**
2. Click **Create API**
3. Choose **REST API** → **Build**
4. Configure:
   - **API name**: `JulethiBoutiqueAPI`
   - **Endpoint Type**: Regional
5. Click **Create API**

### Create Resources and Methods

#### Root Resource: /products

1. Click **Actions** → **Create Resource**
2. Resource Name: `products`
3. Click **Create Resource**

#### GET /products (Get All Products)

1. Select `/products` resource
2. Click **Actions** → **Create Method** → **GET**
3. Configure:
   - **Integration type**: Lambda Function
   - **Lambda Function**: `getAllProducts`
4. Click **Save** → **OK**
5. Enable CORS:
   - Click **Actions** → **Enable CORS**
   - Click **Enable CORS and replace existing CORS headers**

#### GET /products/{productId} (Get Product By ID)

1. Select `/products` resource
2. Click **Actions** → **Create Resource**
3. Resource Name: `{productId}`
4. Click **Create Resource**
5. Click **Actions** → **Create Method** → **GET**
6. Integration type: Lambda Function → `getProductById`
7. Enable CORS

#### POST /products (Create Product)

1. Select `/products` resource
2. Click **Actions** → **Create Method** → **POST**
3. Integration type: Lambda Function → `createProduct`
4. Enable CORS

#### PUT /products/{productId} (Update Product)

1. Select `/products/{productId}` resource
2. Click **Actions** → **Create Method** → **PUT**
3. Integration type: Lambda Function → `updateProduct`
4. Enable CORS

#### DELETE /products/{productId} (Delete Product)

1. Select `/products/{productId}` resource
2. Click **Actions** → **Create Method** → **DELETE**
3. Integration type: Lambda Function → `deleteProduct`
4. Enable CORS

#### GET /products/category/{category} (Get Products By Category)

1. Select `/products` resource
2. Click **Actions** → **Create Resource**
   - Resource Name: `category`
3. Select `/products/category` resource
4. Click **Actions** → **Create Resource**
   - Resource Name: `{category}`
5. Click **Actions** → **Create Method** → **GET**
6. Integration type: Lambda Function → `getProductsByCategory`
7. Enable CORS

#### GET /products/new-arrivals (Get New Arrivals)

1. Select `/products` resource
2. Click **Actions** → **Create Resource**
   - Resource Name: `new-arrivals`
3. Click **Actions** → **Create Method** → **GET**
4. Integration type: Lambda Function → `getNewArrivals`
5. Enable CORS

#### GET /products/search (Search Products)

1. Select `/products` resource
2. Click **Actions** → **Create Resource**
   - Resource Name: `search`
3. Click **Actions** → **Create Method** → **GET**
4. Integration type: Lambda Function → `searchProducts`
5. Enable CORS

#### POST /auth/login (Admin Login)

1. Click root `/` resource
2. Click **Actions** → **Create Resource**
   - Resource Name: `auth`
3. Select `/auth` resource
4. Click **Actions** → **Create Resource**
   - Resource Name: `login`
5. Click **Actions** → **Create Method** → **POST**
6. Integration type: Lambda Function → `adminLogin`
7. Enable CORS

#### GET /admin/stats (Dashboard Stats)

1. Click root `/` resource
2. Click **Actions** → **Create Resource**
   - Resource Name: `admin`
3. Select `/admin` resource
4. Click **Actions** → **Create Resource**
   - Resource Name: `stats`
5. Click **Actions** → **Create Method** → **GET**
6. Integration type: Lambda Function → `getDashboardStats`
7. Enable CORS

### Deploy API

1. Click **Actions** → **Deploy API**
2. Deployment stage: **New Stage**
3. Stage name: `prod`
4. Click **Deploy**
5. Copy the **Invoke URL** (e.g., `https://abc123.execute-api.us-east-1.amazonaws.com/prod`)

---

## Step 5: Initialize Admin User

1. Go to **Lambda Console**
2. Select `initializeAdmin` function
3. Click **Test**
4. Create new test event with any name
5. Click **Test**
6. Verify admin user created in DynamoDB

---

## Step 6: Configure Frontend

1. Create `.env` file in project root:

```env
REACT_APP_API_BASE_URL=https://your-api-gateway-url.execute-api.region.amazonaws.com/prod
```

2. Update `src/services/api.js` if needed

---

## Step 7: Seed Initial Products (Optional)

Create a Lambda function to seed initial products:

```javascript
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const products = [
    // Copy initial products from productsReducer.js
  ];

  for (const product of products) {
    const item = {
      Entity: 'PRODUCT',
      Type: `PRODUCT#${product.id}`,
      productId: product.id,
      name: product.name,
      imgUrl: product.imgUrl,
      price: product.price,
      fabric: product.fabric,
      category: product.category,
      description: product.description,
      isNewArrival: product.isNewArrival,
      createdAt: product.createdAt,
      updatedAt: product.createdAt,
      GSI1PK: `CATEGORY#${product.category}`,
      GSI1SK: `PRODUCT#${product.id}`,
      GSI2PK: `NEW_ARRIVAL#${product.isNewArrival}`,
      GSI2SK: product.createdAt
    };

    await dynamodb.put({
      TableName: 'JulethiBoutiqueTable',
      Item: item
    }).promise();
  }

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
```

Run this function once to populate initial products.

---

## Testing the API

### Test with cURL

```bash
# Get all products
curl https://your-api-url.amazonaws.com/prod/products

# Get product by ID
curl https://your-api-url.amazonaws.com/prod/products/BR123456

# Get products by category
curl https://your-api-url.amazonaws.com/prod/products/category/bridal

# Get new arrivals
curl https://your-api-url.amazonaws.com/prod/products/new-arrivals

# Search products
curl "https://your-api-url.amazonaws.com/prod/products/search?q=silk"

# Admin login
curl -X POST https://your-api-url.amazonaws.com/prod/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Create product (requires admin)
curl -X POST https://your-api-url.amazonaws.com/prod/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "imgUrl": "https://example.com/image.jpg",
    "price": 10000,
    "fabric": "Silk",
    "category": "bridal",
    "description": "Test description",
    "isNewArrival": true
  }'
```

---

## Security Best Practices

1. **Enable API Gateway Authentication**:
   - Use AWS Cognito or API Keys
   - Add authorizer for protected routes

2. **Environment Variables**:
   - Store sensitive data in AWS Secrets Manager
   - Use Lambda environment variables for configuration

3. **CORS Configuration**:
   - Restrict origins in production
   - Update CORS headers in Lambda responses

4. **DynamoDB**:
   - Use fine-grained IAM policies
   - Enable point-in-time recovery
   - Set up CloudWatch alarms

5. **Lambda**:
   - Set appropriate timeout (default: 30 seconds)
   - Configure memory allocation
   - Enable X-Ray tracing for debugging

6. **Password Security**:
   - In production, use bcrypt for password hashing
   - Implement JWT tokens for session management
   - Add rate limiting to prevent brute force

---

## Monitoring and Logging

1. **CloudWatch Logs**:
   - Lambda logs automatically sent to CloudWatch
   - Set up log retention policies

2. **CloudWatch Metrics**:
   - Monitor Lambda invocations, errors, duration
   - Track DynamoDB read/write capacity

3. **CloudWatch Alarms**:
   - Set alarms for Lambda errors
   - Alert on DynamoDB throttling

---

## Cost Optimization

1. **DynamoDB**:
   - Consider on-demand pricing for variable workloads
   - Use provisioned capacity with auto-scaling

2. **Lambda**:
   - Optimize function memory
   - Reduce cold starts with provisioned concurrency

3. **API Gateway**:
   - Enable caching for frequently accessed endpoints

---

## Troubleshooting

### Lambda Function Errors

- Check CloudWatch Logs
- Verify IAM permissions
- Test with Lambda console test events

### API Gateway 502 Errors

- Check Lambda timeout settings
- Verify integration configuration
- Test Lambda function independently

### DynamoDB Errors

- Verify table and index names
- Check IAM permissions
- Ensure sufficient read/write capacity

---

## Next Steps

1. Set up CI/CD pipeline with AWS CodePipeline
2. Implement AWS Cognito for user authentication
3. Add CloudFront for content delivery
4. Set up S3 for image storage
5. Implement comprehensive error handling and logging

---

## Support

For issues or questions:
- Review AWS documentation
- Check CloudWatch logs
- Test individual components

**Admin Credentials**:
- Username: `admin`
- Password: `admin123`

Remember to change these in production!
