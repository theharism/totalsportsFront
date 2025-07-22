import axiosInstance from "@/lib/axios";

export const getBlogByCategorySlug = async (slug: string) => {
    const response = await axiosInstance.get(`/api/v1/blogs/category/slug/${slug}`);
    return response.data;
};  
