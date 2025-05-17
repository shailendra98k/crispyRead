import axios, { AxiosInstance, AxiosResponse } from "axios";

class CrispyReadClient {
  private static axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost/api",
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
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  public static async fetchCategories<T>(): Promise<T> {
    try {
      const response: AxiosResponse<T> =
        await this.axiosInstance.get("/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  public static async fetchUserInfo<T>(): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get("/user");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
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
      console.error("Error fetching data:", error);
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
      console.error("Error fetching data:", error);
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
      console.error("Error fetching data:", error);
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
      console.error("Error fetching data:", error);
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
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

export default CrispyReadClient;
