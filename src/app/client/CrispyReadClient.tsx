import axios, { AxiosInstance, AxiosResponse } from "axios";

class CrispyReadClient {
  private static bearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0Njk1OTMyNSwiZXhwIjoxNzQ2OTk1MzI1fQ.Yp7HHBDIAWsvtvJK4cJ7WD_1Kd7GMUdJpBPTzx-3CHw";
  private static axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  public static async fetchCategories<T>(): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        "/categories"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  public static async fetchUserInfo<T>(): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get("/user", {
        headers: {
          Authorization: `Bearer ${this.bearerToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  public static async getPostsByCategory<T>(category: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        `/posts/${category}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

export default CrispyReadClient;
