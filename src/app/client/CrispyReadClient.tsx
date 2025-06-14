import axios, { AxiosInstance, AxiosResponse } from "axios";

class CrispyReadClient {
  private static axiosInstance: AxiosInstance = axios.create({
    baseURL: "/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  public static async login<T>({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        "/user/login",
        {
          username,
          password,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while logging in:", error);
      throw error;
    }
  }

  public static async signUp<T>({
    firstName,
    lastName,
    email,
    username,
    password,
  }: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
  }): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        "/user/sign-up",
        {
          firstName,
          lastName,
          email,
          username,
          password,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while logging in:", error);
      throw error;
    }
  }

  public static async fetchCategories<T>(): Promise<T> {
    try {
      const response: AxiosResponse<T> =
        await this.axiosInstance.get("/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  public static async fetchUserInfo<T>(): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get("/user");
      return response.data;
    } catch (error) {
      console.error("Error fetching userInfo:", error);
      throw error;
    }
  }

  public static async getPosts<T>(page: number, size: number): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        `/posts?page=${page}&size=${size}`
      );
      console.log("response000", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  public static async getPostsByCategory<T>(
    category: string,
    page: number,
    size: number
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        `/posts/${category}?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      throw error;
    }
  }

  public static async getFeaturedPosts<T>(): Promise<T> {
    try {
      const response: AxiosResponse<T> =
        await this.axiosInstance.get(`/posts/featured`);
      return response.data;
    } catch (error) {
      console.error("Error fetching featured data:", error);
      throw error;
    }
  }

  public static async getPostById<T>(id: number, slug: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        `/post/${id}/${slug}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching post by id:", error);
      throw error;
    }
  }

  public static async createPost<T>(formData: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        `/post`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error while creating a post:", error);
      throw error;
    }
  }

  public static async updatePost<T>(formData: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        `/post`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error while updating a post:", error);
      throw error;
    }
  }

  public static async publishPosts<T>(postIds: number[]): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        `/posts/publish`,
        postIds
      );
      return response.data;
    } catch (error) {
      console.error("Error while publishing posts:", error);
      throw error;
    }
  }

  public static async archivePosts<T>(postIds: number[]): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        `/posts/hide`,
        postIds
      );
      return response.data;
    } catch (error) {
      console.error("Error while archiving posts:", error);
      throw error;
    }
  }
}

export default CrispyReadClient;
