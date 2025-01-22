import { toast } from "vue3-toastify";
import axiosInstance from "../config";
import type {
  GetAllProductyPayload,
  GetAllSalePayload,
  ProductAddPayload,
  ProductDeletePayload,
  ProductSalePayload,
  ProductUpdatePayload,
  SaleReportPayload,
} from "./types";

const createProduct = async (payload: ProductAddPayload): Promise<any> => {
  let response = await axiosInstance.post("Product/AddProduct", payload);
  return response.data;
};

const getAllProducts = async (): Promise<GetAllProductyPayload[]> => {
  let response = await axiosInstance.get("Product/GetAllProduct");
  console.log(response.data.data);
  return response.data.data;
};

const updateProduct = async (payload: ProductUpdatePayload): Promise<any> => {
  const response = await axiosInstance.put(`Product/UpdateProduct`, payload); // Use the productID in the URL
  // toast.success(response.data.message); // Show success toast
  return response.data; // Return the response data if needed
};

const deleteProduct = async (payload: ProductDeletePayload): Promise<any> => {
  const response = await axiosInstance.delete(`Product/DeleteProduct`, {
    data: payload,
  });
  toast.success(response.data.message);
  return response.data;
};

const saleProduct = async (payload: ProductSalePayload[]): Promise<any> => {
  let response = await axiosInstance.post(`Sale/SellProduct`, payload);
  toast.success(response.data.message);
  return response.data;
};

const getAllSale = async (): Promise<GetAllSalePayload[]> => {
  let response = await axiosInstance.get("Sale/GetAllSale");
  console.log(response.data.data);
  return response.data.data;
};

const salesReport = async (): Promise<SaleReportPayload> => {
  const response = await axiosInstance.get("Sale/SaleReport");
  return response.data.data;
};

// const deleteProduct = async (payload: DeleteProductPayload): Promise<any> => {
//   const response = await axiosInstance.delete(`Product/DeleteProduct`, payload);
//   toast.success(response.data.message);
// };

export default {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  saleProduct,
  getAllSale,
  salesReport,
};
