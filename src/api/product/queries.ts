import { useMutation, useQuery, type UseMutationOptions, type UseQueriesOptions, type UseQueryOptions } from '@tanstack/vue-query'
import type { GetAllProductyPayload, GetAllSalePayload, ProductAddPayload, ProductDeletePayload, ProductSalePayload, ProductUpdatePayload, SaleReportPayload } from './types'
import ProductService from './services'
import SaleService from './services'


export const AddProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, ProductAddPayload, any>) =>
      useMutation({
        mutationKey: ['addProduct'],
        mutationFn:  ProductService.createProduct, // Use the service to create the product
        ...opt // Pass additional options if needed
      })
  }

  export const getProductList = {
    useQuery: (opt?: UseQueriesOptions<GetAllProductyPayload[]>) =>
      useQuery({
        queryKey: ['getProductList'],
        queryFn: ProductService.getAllProducts,
        ...opt // Pass additional options if needed
      })
  }

  export const UpdateProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, ProductUpdatePayload, any>) =>
      useMutation({
        mutationKey: ['updateProduct'],
        mutationFn:  ProductService.updateProduct, // Use the service to create the product
        ...opt // Pass additional options if needed
      })
  }

  export const DeleteProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, ProductDeletePayload, any>) =>
      useMutation({
        mutationKey: ['deleteProduct'],
        mutationFn: async (payload: ProductDeletePayload) => await ProductService.deleteProduct(payload), // Use the payload in the mutation function
        ...opt, // Spread additional options if needed
      }),
  };

  export const SaleProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, ProductSalePayload[], any>) =>
      useMutation({
        mutationKey: ['saleProduct'],
        mutationFn: (payload: ProductSalePayload[]) => SaleService.saleProduct(payload), // Use the service to create the product
        ...opt // Pass additional options if needed
      })
  }

  export const getSaleList = {
    useQuery: (opt?: UseQueriesOptions<GetAllSalePayload[]>) =>
      useQuery({
        queryKey: ['getSaleList'],
        queryFn: SaleService.getAllSale,
        ...opt // Pass additional options if needed
      })
  }

  export const salesReport = {
    useQuery: (opt?: UseQueryOptions<SaleReportPayload>) =>
      useQuery<SaleReportPayload, Error>({
        queryKey: ['salesReport'],
        queryFn: SaleService.salesReport,
        ...opt, // Pass additional options if needed
      }),
  }