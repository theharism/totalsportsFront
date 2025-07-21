import axiosInstance from "@/lib/axios";

export const getBlogByTeam = async (teamId: string) => {
    const response = await axiosInstance.get(`/api/v1/blogs/team/${teamId}`);
    return response.data;
};  
