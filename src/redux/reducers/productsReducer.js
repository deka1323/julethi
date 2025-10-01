const initialProducts = [
  {
    id: '1',
    name: 'Royal Red Bridal Lehenga',
    imgUrl: 'https://images.pexels.com/photos/1721943/pexels-photo-1721943.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 45000,
    fabric: 'Silk & Velvet',
    category: 'bridal',
    description: 'Elegant red bridal lehenga with intricate embroidery and golden work. Perfect for your special day.',
    isNewArrival: true,
    createdAt: new Date('2025-09-28').toISOString()
  },
  {
    id: '2',
    name: 'Golden Bridal Saree',
    imgUrl: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 38000,
    fabric: 'Pure Silk',
    category: 'bridal',
    description: 'Traditional golden saree with zari work. A timeless choice for brides.',
    isNewArrival: false,
    createdAt: new Date('2025-08-15').toISOString()
  },
  {
    id: '3',
    name: 'Pink Bridal Ensemble',
    imgUrl: 'https://images.pexels.com/photos/1183280/pexels-photo-1183280.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 52000,
    fabric: 'Georgette & Net',
    category: 'bridal',
    description: 'Stunning pink bridal outfit with delicate pearl and sequin work.',
    isNewArrival: true,
    createdAt: new Date('2025-09-25').toISOString()
  },
  {
    id: '4',
    name: 'Maroon Bridal Lehenga',
    imgUrl: 'https://images.pexels.com/photos/3452356/pexels-photo-3452356.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 48000,
    fabric: 'Velvet',
    category: 'bridal',
    description: 'Rich maroon lehenga with heavy embellishments. Regal and sophisticated.',
    isNewArrival: false,
    createdAt: new Date('2025-07-10').toISOString()
  },
  {
    id: '5',
    name: 'Contemporary Fusion Kurta Set',
    imgUrl: 'https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 8500,
    fabric: 'Cotton Silk',
    category: 'fusion',
    description: 'Modern kurta set with palazzo pants. Perfect blend of traditional and contemporary.',
    isNewArrival: true,
    createdAt: new Date('2025-09-29').toISOString()
  },
  {
    id: '6',
    name: 'Indo-Western Gown',
    imgUrl: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 12000,
    fabric: 'Crepe & Organza',
    category: 'fusion',
    description: 'Elegant indo-western gown with modern silhouette and traditional embroidery.',
    isNewArrival: true,
    createdAt: new Date('2025-09-26').toISOString()
  },
  {
    id: '7',
    name: 'Jacket Style Lehenga',
    imgUrl: 'https://images.pexels.com/photos/3621952/pexels-photo-3621952.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 15000,
    fabric: 'Brocade',
    category: 'fusion',
    description: 'Trendy jacket style lehenga choli. A contemporary twist to traditional wear.',
    isNewArrival: false,
    createdAt: new Date('2025-08-20').toISOString()
  },
  {
    id: '8',
    name: 'Cape Style Anarkali',
    imgUrl: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 9500,
    fabric: 'Georgette',
    category: 'fusion',
    description: 'Flowing anarkali with stylish cape. Perfect fusion of comfort and style.',
    isNewArrival: false,
    createdAt: new Date('2025-07-05').toISOString()
  },
  {
    id: '9',
    name: 'Party Wear Saree',
    imgUrl: 'https://images.pexels.com/photos/3617457/pexels-photo-3617457.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 7500,
    fabric: 'Chiffon',
    category: 'occasion',
    description: 'Elegant saree perfect for parties and gatherings. Light and comfortable.',
    isNewArrival: true,
    createdAt: new Date('2025-09-27').toISOString()
  },
  {
    id: '10',
    name: 'Festive Lehenga Choli',
    imgUrl: 'https://images.pexels.com/photos/3586810/pexels-photo-3586810.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 18000,
    fabric: 'Silk & Net',
    category: 'occasion',
    description: 'Beautiful festive lehenga with mirror work. Ideal for celebrations.',
    isNewArrival: false,
    createdAt: new Date('2025-08-01').toISOString()
  },
  {
    id: '11',
    name: 'Designer Anarkali Suit',
    imgUrl: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 11000,
    fabric: 'Georgette',
    category: 'occasion',
    description: 'Designer anarkali suit with elegant embroidery. Perfect for weddings and functions.',
    isNewArrival: false,
    createdAt: new Date('2025-06-15').toISOString()
  },
  {
    id: '12',
    name: 'Cocktail Gown',
    imgUrl: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 13500,
    fabric: 'Satin',
    category: 'occasion',
    description: 'Sophisticated cocktail gown for special occasions. Modern and chic.',
    isNewArrival: true,
    createdAt: new Date('2025-09-24').toISOString()
  }
];

const initialState = {
  products: initialProducts,
  loading: false,
  error: null
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        error: null
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    default:
      return state;
  }
};

export default productsReducer;
