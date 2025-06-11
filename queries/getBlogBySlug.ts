import axiosInstance from "@/lib/axios";

export const getBlogBySlug = async (slug: string) => {
    const response = await axiosInstance.get(`/api/v1/blogs/${slug}`);
    return response.data;
};
