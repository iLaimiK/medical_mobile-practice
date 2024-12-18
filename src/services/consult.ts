import type { DoctorPage, FollowType, KnowledgePage, KnowledgeParams, PageParams } from "@/types/consult";
import { req } from "@/utils/request";

export const getKnowledgePageAPI = (params: KnowledgeParams) => {
  return req<KnowledgePage>("/patient/home/knowledge", "get", params);
};

export const getDoctorPageAPI = (params: PageParams) => {
  return req<DoctorPage>("/home/page/doc", "get", params);
};

export const followOrUnfollowAPI = (id: string, type: FollowType = "doc") => {
  return req("/like", "post", { id, type });
}