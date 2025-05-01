import { api } from "src/boot/axios";

export interface LatestArticleDto {
  id: number;
  slug: string;
  title: string;
  coverImageUrl: string;
  category: string;
  authors: string[];
  date: string;
  summary: string; // ✅ Eksik olan alan eklendi
}


export const fetchLatestArticles = async (lang: string): Promise<LatestArticleDto[]> => {
  const response = await api.get(`/posts/latest?lang=${lang}`);
  return response.data;
};
