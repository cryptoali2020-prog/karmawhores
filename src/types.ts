/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  wpId: string;
  title: string;
  category: 'reddit-accounts' | 'reddit-posts' | 'reddit-comments' | 'guides';
  originalPrice: number;
  salePrice?: number;
  age?: string;
  postKarma?: number;
  commentKarma?: number;
  isCustomService?: boolean;
  isOutOfStock?: boolean;
  image: string;
  description: string;
  link: string;
  tags?: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  snippet: string;
  content: string;
  publishedDate: string;
  author: string;
  image: string;
  readTime: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
