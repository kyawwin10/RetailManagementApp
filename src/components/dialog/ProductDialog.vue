<script setup lang="ts">
import { AddProduct, UpdateProduct } from '@/api/product/queries'
import type { ProductAddPayload, ProductUpdatePayload } from '@/api/product/types'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { watch } from 'vue'
import { toast } from 'vue3-toastify'
import * as z from 'zod'
// import { useToast } from '../ui/toast'

// const { toast } = useToast()

interface ProductDialogState {
    isOpen: boolean
    isEdit: boolean
    data: ProductUpdatePayload | null
}

const props = defineProps<{
    dialogData: ProductDialogState
    handleClose: () => void
}>()

const formSchema = toTypedSchema(z.object({
    productName: z.string(),
    price: z.number(),
    stock: z.number(),
    profitPerItem: z.number(),
}))

// Form Data
const { handleSubmit, setValues, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: {
        productName: '',
        price: undefined,
        stock: undefined,
        profitPerItem: undefined,
    }
})


// Add Product Mutation
const { mutate: addProduct } = AddProduct.useMutation({
    onSuccess: () => {
        toast.success("Product Create Successfully")
        // toast({
        //     title: 'Product Created successfully',
        // });
        props.handleClose()
        resetForm();
    },
    onError: (error) => {
        console.log('Error adding product:', error);
    },
});

// Update Product Mutation
const { mutate: updateProduct } = UpdateProduct.useMutation({
    onSuccess: () => {
        toast.success('Product Updated successfully');
        // toast({
        //     title: 'Product Updated successfully',
        // });
        props.handleClose()
        resetForm();
    },
    onError: (error) => {
        console.log('Error updating product:', error);
    },
});

const initializeForm = () => {
    if (props.dialogData.isEdit) {
        setValues({
            productName: props.dialogData.data?.productName || '',
            price: props.dialogData.data?.price || undefined,
            stock: props.dialogData.data?.stock || undefined,
            profitPerItem: props.dialogData.data?.profitPerItem || undefined,
        })
    } else {
        // Reset form when not in edit mode
        resetForm()
    }
}

// Watch for changes in props
watch(
    [() => props.dialogData.isEdit, () => props.dialogData.data],
    () => {
        initializeForm();
    }
);

const onSubmit = handleSubmit((values) => {
    try {
        const payload = props.dialogData.isEdit
            ? {
                productID: props?.dialogData.data?.productID,
                productName: values.productName,
                price: values.price,
                stock: values.stock,
                profitPerItem: values.profitPerItem,
            }
            : {
                productName: values.productName,
                price: values.price,
                stock: values.stock,
                profitPerItem: values.profitPerItem,
            };

        if (props.dialogData.isEdit) {
            updateProduct(payload as ProductUpdatePayload)
            // updateProduct(payload)
        }
        else {
            addProduct(payload as ProductAddPayload)
            // addProduct(payload)
        }

    } catch (error) {
        console.error(error)
    } finally {
        close()
    }
})



</script>
<template>
    <Dialog v-model:open="props.dialogData.isOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ props.dialogData.isEdit ? 'Update Product' : 'Add Product' }}</DialogTitle>
            </DialogHeader>

            <form id="dialogForm" @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="productName">
                    <FormItem>
                        <FormLabel>ProductName</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Enter Your Product Name" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="price" class="mt-2">
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Enter Your Price" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="stock" class="mt-2">
                    <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Enter Your Stock" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="profitPerItem" class="mt-2">
                    <FormItem>
                        <FormLabel>ProfitPerItem</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Enter Your profitPerItem" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

            </form>

            <DialogFooter>
                <Button @click="props.handleClose" class="">Close</Button>
                <Button type="submit" form="dialogForm" class="bg-green-500 hover:bg-green-700">{{
                    props.dialogData.isEdit ? 'Update' : 'Save' }}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>