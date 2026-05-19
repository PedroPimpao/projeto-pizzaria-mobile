export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF';
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF';
  token: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}

export interface Item {
  id: string;
  amount: string;
  order_id: string;
  product_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  table: number;
  name?: string;
}

export interface AddItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

export interface SendOrderRequest {
  order_id: string;
}
