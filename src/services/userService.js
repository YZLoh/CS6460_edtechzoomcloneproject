const BASE_URL = "http://localhost:8080/api/v1/";

class UserService {
  static async login(email, password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(`${BASE_URL}user/sign-in`, requestOptions);

    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    return data;
  }

  static logout() {
    return { type: "user/logout" };
  }
}

export default UserService;
