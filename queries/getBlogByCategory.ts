import axiosInstance from "@/lib/axios";

export const getBlogByCategory = async (categoryId: string) => {
    const response = await axiosInstance.get(`/api/v1/blogs/category/${categoryId}`);
    return response.data;
};  
