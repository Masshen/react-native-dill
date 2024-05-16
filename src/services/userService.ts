import Crud from "./crud";

class UserService extends Crud {
  url = "users";
  destroy(id: string | number) {
    return this.axios.delete(`${this.url}/${id}`);
  }
  get(id: string | number) {
    return this.axios.get(`${this.url}/${id}`);
  }
  getDashboard(id: string | number) {
    return this.axios.get(`all_data`);
  }
  getAll() {
    return this.axios.get(`${this.url}`);
  }
  getByKey(query: string) {
    return this.axios.get(`${this.url}?${query}`);
  }
  store(data: any) {
    return this.unsecureAxios.post(`${this.url}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  storePhoto(data: any) {
    return this.axios.post(`${this.url}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  login(data: any) {
    return this.unsecureAxios.post(`login`, data);
  }
  update(id: string | number, data: any) {
    return this.axios.patch(`${this.url}/${id}`, data, {
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
    });
  }
  updatePhoto(id: string | number, data: any) {
    return this.axios.post(`${this.url}/update/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
export default new UserService();
