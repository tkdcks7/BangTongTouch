import axios from "axios";

// const getCoords = async () => {
//   const temp: any = await getUserAddressNum("서울 광진구 군자동 98");
//   console.log(temp);
// };
// getCoords();
// 한국어 주소명을 경위도로

export const getUserAddressNum = (addr: string): Promise<Array<number>> => {
  return new Promise((resolve, reject) => {
    console.log(addr);
    axios({
      method: "GET",
      headers: {
        "Content-Type": "charset=UTF-8",
        "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_CLIENT_ID_NAVER_MAP,
        "X-NCP-APIGW-API-KEY": process.env.REACT_APP_CLIENT_SECRET_NAVER_MAP,
      },
      url: `/naver/map-geocode/v2/geocode?query=${addr}`,
    })
      .then((response) => {
        console.log(response);
        const address: Array<number> = [];
        address.push(response.data.addresses[0].x);
        address.push(response.data.addresses[0].y);
        resolve(address);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// const getAddress = async () => {
//   const temp: any = await getUserAddressKr();
//   console.log(temp);
// };
// getAddress();
// ip주소를 기반으로 탐색한 경위도로 한글 주소를 반환

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
          url: `/naver/map-reversegeocode/v2/gc?coords=${position.coords.longitude},${position.coords.latitude}&orders=legalcode&output=json`,
        })
          .then((response) => {
            const address: Array<string> = [];
            address.push(response.data.results[0].region.area1.name);
            address.push(response.data.results[0].region.area2.name);
            address.push(response.data.results[0].region.area3.name);
            address.push(response.data.results[0].code.id);
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
