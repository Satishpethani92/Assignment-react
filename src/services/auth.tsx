import { doFetch } from "./fetcher";

export type AuthData = {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  token?: string;
};
export type ProductDto = {
  brand: string;
  category: string;
  description?: string;
  discountPercentage?: number;
  id?: number;
  images?: string[];
  price?: number;
  rating?: number;
  stock?: number;
  thumbnail?: string;
  title?: string;
};

export default {
  // new methods
  login: (data) => doFetch("auth/login", "POST", data),
  register: (data) => doFetch("auth/register", "POST", data),
  categories: () => doFetch("auth/products/categories", "GET"),
  productList: (currentPage, perPage) =>
    doFetch(`products?limit=${perPage}&skip=${(currentPage - 1) * 10}`, "GET"),
};
