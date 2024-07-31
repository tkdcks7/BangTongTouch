import axios from "axios";

export const getUserAddressKr = (): Promise<Array<string>> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        axios({
          method: "GET",
          headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_CLIENT_ID_NAVER_MAP,
            "X-NCP-APIGW-API-KEY":
              process.env.REACT_APP_CLIENT_SECRET_NAVER_MAP,
          },
          url: `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${position.coords.longitude},${position.coords.latitude}&orders=admcode&output=json`,
        })
          .then((response) => {
            const address: Array<string> = [];
            address.push(response.data.results[0].region.area1.name);
            address.push(response.data.results[0].region.area2.name);
            address.push(response.data.results[0].region.area3.name);
            resolve(address);
          })
          .catch((error) => {
            reject(error);
          });
      },
      (error) => {
        reject(error);
      }
    );
  });
};
