/**
 * =============================================================================
 *                  JULETHI BOUTIQUE - LAMBDA FUNCTIONS
 * =============================================================================
 *
 * These Lambda functions handle all backend operations for the boutique.
 * Each function should be created as a separate Lambda in AWS Console.
 *
 * SETUP INSTRUCTIONS:
 * 1. Create each Lambda function in AWS Console
 * 2. Set Runtime: Node.js 18.x or later
 * 3. Add IAM Role with DynamoDB permissions
 * 4. Set Environment Variables:
 *    - TABLE_NAME: JulethiBoutiqueTable
 * 5. Connect to API Gateway for HTTP endpoints
 */

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || 'JulethiBoutiqueTable';

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Generate unique product ID with category prefix
 */
function generateProductId(category) {
  const prefixMap = {
    bridal: 'BR',
    fusion: 'FS',
    occasion: 'OC'
  };

  const prefix = prefixMap[category] || 'PR';
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNum}`;
}

/**
 * Standard API response
 */
function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
    },
    body: JSON.stringify(body)
  };
}

/**
 * Convert DynamoDB item to product object
 */
function formatProduct(item) {
  return {
    id: item.productId,
    productId: item.productId,
    name: item.name,
    imgUrl: item.imgUrl,
    price: item.price,
    fabric: item.fabric,
    category: item.category,
    description: item.description,
    isNewArrival: item.isNewArrival,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  };
}

// =============================================================================
// LAMBDA FUNCTION 1: getAllProducts
// =============================================================================
/**
 * GET /products
 * Retrieve all products from the database
 */
exports.getAllProducts = async (event) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'Entity = :entity AND begins_with(#type, :typePrefix)',
      ExpressionAttributeNames: {
        '#type': 'Type'
      },
      ExpressionAttributeValues: {
        ':entity': 'PRODUCT',
        ':typePrefix': 'PRODUCT#'
      }
    };

    const result = await dynamodb.query(params).promise();
    const products = result.Items.map(formatProduct);

    return response(200, {
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return response(500, {
      success: false,
      error: 'Failed to fetch products',
      message: error.message
    });
  }
};

// =============================================================================
// LAMBDA FUNCTION 2: getProductById
// =============================================================================
/**
 * GET /products/{productId}
 * Retrieve a single product by ID
 */
exports.getProductById = async (event) => {
  try {
    const productId = event.pathParameters?.productId;

    if (!productId) {
      return response(400, {
        success: false,
        error: 'Product ID is required'
      });
    }

    const params = {
      TableName: TABLE_NAME,
      Key: {
        Entity: 'PRODUCT',
        Type: `PRODUCT#${productId}`
      }
    };

    const result = await dynamodb.get(params).promise();

    if (!result.Item) {
      return response(404, {
        success: false,
        error: 'Product not found'
      });
    }

    return response(200, {
      success: true,
      data: formatProduct(result.Item)
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return response(500, {
      success: false,
      error: 'Failed to fetch product',
      message: error.message
    });
  }
};

// =============================================================================
// LAMBDA FUNCTION 3: getProductsByCategory
// =============================================================================
/**
 * GET /products/category/{category}
 * Retrieve products by category (bridal, fusion, occasion)
 */
exports.getProductsByCategory = async (event) => {
  try {
    const category = event.pathParameters?.category;

    if (!category) {
      return response(400, {
        success: false,
        error: 'Category is required'
      });
    }

    const params = {
      TableName: TABLE_NAME,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :category',
      ExpressionAttributeValues: {
        ':category': `CATEGORY#${category}`
      }
    };

    const result = await dynamodb.query(params).promise();
    const products = result.Items.map(formatProduct);

    return response(200, {
      success: true,
      data: products,
      count: products.length,
      category
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return response(500, {
      success: false,
      error: 'Failed to fetch products',
      message: error.message
    });
  }
};

// =============================================================================
// LAMBDA FUNCTION 4: getNewArrivals
// =============================================================================
/**
 * GET /products/new-arrivals
 * Retrieve all new arrival products sorted by date (newest first)
 */
exports.getNewArrivals = async (event) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      IndexName: 'GSI2',
      KeyConditionExpression: 'GSI2PK = :newArrival',
      ExpressionAttributeValues: {
        ':newArrival': 'NEW_ARRIVAL#true'
      },
      ScanIndexForward: false
    };

    const result = await dynamodb.query(params).promise();
    const products = result.Items.map(formatProduct);

    return response(200, {
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    return response(500, {
      success: false,
      error: 'Failed to fetch new arrivals',
      message: error.message
    });
  }
};

// =============================================================================
// LAMBDA FUNCTION 5: searchProducts
// =============================================================================
/**
 * GET /products/search?q={query}
 * Search products by name, description, or category
 */
exports.searchProducts = async (event) => {
  try {
    const query = event.queryStringParameters?.q;

    if (!query) {
      return response(400, {
        success: false,
        error: 'Search query is required'
      });
    }

    const params = {
      TableName: TABLE_NAME,
      FilterExpression: 'contains(#name, :query) OR contains(description, :query) OR contains(category, :query)',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: {
        ':query': query.toLowerCase()
      }
    };

    const result = await dynamodb.scan(params).promise();
    const products = result.Items
      .filter(item => item.Entity === 'PRODUCT')
      .map(formatProduct);

    return response(200, {
      success: true,
      data: products,
      count: products.length,
      query
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return response(500, {
      success: false,
      error: 'Failed to search products',
      message: error.message
    });
  }
};

// =============================================================================
// LAMBDA FUNCTION 6: createProduct
// =============================================================================
/**
 * POST /products
 * Create a new product
 * Required Admin Authentication
 */
exports.createProduct = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { name, imgUrl, price, fabric, category, description, isNewArrival } = body;

    // Validation
    if (!name || !imgUrl || !price || !fabric || !category || !description) {
      return response(400, {
        success: false,
        error: 'Missing required fields'
      });
    }

    // Generate unique product ID
    const productId = generateProductId(category);
    const timestamp = new Date().toISOString();

    const product = {
      Entity: 'PRODUCT',
      Type: `PRODUCT#${productId}`,
      productId,
      name,
      imgUrl,
      price: Number(price),
      fabric,
      category,
      description,
      isNewArrival: isNewArrival || false,
      createdAt: timestamp,
      updatedAt: timestamp,
      GSI1PK: `CATEGORY#${category}`,
      GSI1SK: `PRODUCT#${productId}`,
      GSI2PK: `NEW_ARRIVAL#${isNewArrival || false}`,
      GSI2SK: timestamp
    };

    const params = {
      TableName: TABLE_NAME,
      Item: product
    };

    await dynamodb.put(params).promise();

    return response(201, {
      success: true,
      message: 'Product created successfully',
      data: formatProduct(product)
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return response(500, {
      success: false,
      error: 'Failed to create product',
      message: error.message
    });
  }
};

// =============================================================================
// LAMBDA FUNCTION 7: updateProduct
// =============================================================================
/**
 * PUT /products/{productId}
 * Update an existing product
 * Required Admin Authentication
 */
exports.updateProduct = async (event) => {
  try {
    const productId = event.pathParameters?.productId;
    const body = JSON.parse(event.body);

    if (!productId) {
      return response(400, {
        success: false,
        error: 'Product ID is required'
      });
    }

    const timestamp = new Date().toISOString();
    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {
      ':updatedAt': timestamp
    };

    // Build dynamic update expression
    const allowedFields = ['name', 'imgUrl', 'price', 'fabric', 'category', 'description', 'isNewArrival'];

    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updateExpressions.push(`#${field} = :${field}`);
        expressionAttributeNames[`#${field}`] = field;
        expressionAttributeValues[`:${field}`] = field === 'price' ? Number(body[field]) : body[field];
      }
    });

    // Update GSI keys if category or isNewArrival changed
    if (body.category) {
      updateExpressions.push('GSI1PK = :gsi1pk', 'GSI1SK = :gsi1sk');
      expressionAttributeValues[':gsi1pk'] = `CATEGORY#${body.category}`;
      expressionAttributeValues[':gsi1sk'] = `PRODUCT#${productId}`;
    }

    if (body.isNewArrival !== undefined) {
      updateExpressions.push('GSI2PK = :gsi2pk');
      expressionAttributeValues[':gsi2pk'] = `NEW_ARRIVAL#${body.isNewArrival}`;
    }

    updateExpressions.push('updatedAt = :updatedAt');

    const params = {
      TableName: TABLE_NAME,
      Key: {
        Entity: 'PRODUCT',
        Type: `PRODUCT#${productId}`
      },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    };

    const result = await dynamodb.update(params).promise();

    return response(200, {
      success: true,
      message: 'Product updated successfully',
      data: formatProduct(result.Attributes)
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return response(500, {
      success: false,
      error: 'Failed to update product',
      message: error.message
    });
  }
};

// =============================================================================
// LAMBDA FUNCTION 8: deleteProduct
// =============================================================================
/**
 * DELETE /products/{productId}
 * Delete a product
 * Required Admin Authentication
 */
exports.deleteProduct = async (event) => {
  try {
    const productId = event.pathParameters?.productId;

    if (!productId) {
      return response(400, {
        success: false,
        error: 'Product ID is required'
      });
    }

    const params = {
      TableName: TABLE_NAME,
      Key: {
        Entity: 'PRODUCT',
        Type: `PRODUCT#${productId}`
      },
      ReturnValues: 'ALL_OLD'
    };

    const result = await dynamodb.delete(params).promise();

    if (!result.Attributes) {
      return response(404, {
        success: false,
        error: 'Product not found'
      });
    }

    return response(200, {
      success: true,
      message: 'Product deleted successfully',
      data: { productId }
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return response(500, {
      success: false,
      error: 'Failed to delete product',
      message: error.message
    });
  }
};

// =============================================================================
// LAMBDA FUNCTION 9: adminLogin
// =============================================================================
/**
 * POST /auth/login
 * Admin authentication
 * Body: { username, password }
 */
exports.adminLogin = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { username, password } = body;

    if (!username || !password) {
      return response(400, {
        success: false,
        error: 'Username and password are required'
      });
    }

    const params = {
      TableName: TABLE_NAME,
      Key: {
        Entity: 'ADMIN',
        Type: `ADMIN#${username}`
      }
    };

    const result = await dynamodb.get(params).promise();

    if (!result.Item) {
      return response(401, {
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Simple password check (in production, use bcrypt)
    if (result.Item.password !== password) {
      return response(401, {
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Return user data (exclude password)
    return response(200, {
      success: true,
      message: 'Login successful',
      data: {
        username: result.Item.username,
        name: result.Item.name,
        isAdmin: result.Item.isAdmin
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    return response(500, {
      success: false,
      error: 'Login failed',
      message: error.message
    });
  }
};

// =============================================================================
// LAMBDA FUNCTION 10: getDashboardStats
// =============================================================================
/**
 * GET /admin/stats
 * Get dashboard statistics
 * Required Admin Authentication
 */
exports.getDashboardStats = async (event) => {
  try {
    // Get all products
    const allProductsParams = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'Entity = :entity AND begins_with(#type, :typePrefix)',
      ExpressionAttributeNames: {
        '#type': 'Type'
      },
      ExpressionAttributeValues: {
        ':entity': 'PRODUCT',
        ':typePrefix': 'PRODUCT#'
      }
    };

    const allProducts = await dynamodb.query(allProductsParams).promise();

    // Calculate statistics
    const products = allProducts.Items;
    const totalProducts = products.length;
    const bridalCount = products.filter(p => p.category === 'bridal').length;
    const fusionCount = products.filter(p => p.category === 'fusion').length;
    const occasionCount = products.filter(p => p.category === 'occasion').length;
    const newArrivals = products.filter(p => p.isNewArrival).length;
    const totalValue = products.reduce((sum, p) => sum + p.price, 0);
    const averagePrice = totalProducts > 0 ? Math.round(totalValue / totalProducts) : 0;

    // Get recent products (last 5)
    const recentProducts = products
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(formatProduct);

    return response(200, {
      success: true,
      data: {
        totalProducts,
        categoryDistribution: {
          bridal: bridalCount,
          fusion: fusionCount,
          occasion: occasionCount
        },
        newArrivals,
        totalValue,
        averagePrice,
        recentProducts
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return response(500, {
      success: false,
      error: 'Failed to fetch statistics',
      message: error.message
    });
  }
};

// =============================================================================
// LAMBDA FUNCTION 11: initializeAdmin
// =============================================================================
/**
 * One-time function to create admin user
 * Run this once to set up the admin account
 */
exports.initializeAdmin = async (event) => {
  try {
    const adminUser = {
      Entity: 'ADMIN',
      Type: 'ADMIN#admin',
      username: 'admin',
      password: 'admin123', // In production, use bcrypt hashing
      name: 'Admin User',
      isAdmin: true,
      createdAt: new Date().toISOString()
    };

    const params = {
      TableName: TABLE_NAME,
      Item: adminUser,
      ConditionExpression: 'attribute_not_exists(Entity)'
    };

    await dynamodb.put(params).promise();

    return response(200, {
      success: true,
      message: 'Admin user created successfully',
      data: {
        username: adminUser.username,
        name: adminUser.name
      }
    });
  } catch (error) {
    if (error.code === 'ConditionalCheckFailedException') {
      return response(409, {
        success: false,
        error: 'Admin user already exists'
      });
    }

    console.error('Error initializing admin:', error);
    return response(500, {
      success: false,
      error: 'Failed to initialize admin',
      message: error.message
    });
  }
};

// =============================================================================
// END OF LAMBDA FUNCTIONS
// =============================================================================
