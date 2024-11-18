import type { FileInfo } from "@/types/global";
import { req } from "@/utils/request";

// 上传文件/图片api
export const uploadFileAPI = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return req<FileInfo>("/upload", "post", formData);
}