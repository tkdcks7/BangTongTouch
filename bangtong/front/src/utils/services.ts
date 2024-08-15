import axios from "axios";
import jsonp from "jsonp";

// const getCoords = async () => {
//   const temp: any = await getUserAddressNum("서울 광진구 군자동 98");
//   console.log(temp);
// };
// getCoords();
// 한국어 주소명을 경위도로

export const getUserAddressNum = (addr: string): Promise<Array<number>> => {
  return new Promise((resolve, reject) => {
    jsonp(
      `https://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&address=${addr}&refine=false&simple=false&type=road&key=${process.env.REACT_APP_SEARCH_API}`,
      { param: "callback" },
      (err: any, data: any) => {
        if (err) {
          console.error("Error:", err);
          reject(err);
        } else {
          const address: Array<number> = [];
          address.push(data.response.result.point.x);
          address.push(data.response.result.point.y);
          resolve(address);
        }
      }
    );
  });
};

//지번 주소용

export const getUserAddressNum2 = (addr: string): Promise<Array<number>> => {
  return new Promise((resolve, reject) => {
    jsonp(
      `https://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&address=${addr}&simple=false&type=parcel&key=${process.env.REACT_APP_SEARCH_API}`,
      { param: "callback" },
      (err: any, data: any) => {
        if (err) {
          console.error("Error:", err);
          reject(err);
        } else {
          const address: Array<number> = [];
          address.push(data.response.result.point.x);
          address.push(data.response.result.point.y);
          resolve(address);
        }
      }
    );
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
        jsonp(
          `https://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&point=${position.coords.longitude},${position.coords.latitude}&simple=false&type=BOTH&key=${process.env.REACT_APP_SEARCH_API}`,
          { param: "callback" },
          (err: any, data: any) => {
            if (err) {
              console.error("Error:", err);
              reject(err);
            } else {
              const str: string = data.response.result[0].text;
              const strArray: Array<string> = str.split(" ");
              const returnArray: Array<string> = [];
              returnArray.push(strArray[0]);
              returnArray.push(strArray[1]);
              returnArray.push(strArray[2]);
              returnArray.push(data.response.result[0].structure.level4LC);
              resolve(returnArray);
            }
          }
        );
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const getUserAddressKr2 = (
  lat: number,
  lng: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    console.log(lat, lng);
    jsonp(
      `https://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&point=${lat},${lng}&simple=false&type=BOTH&key=${process.env.REACT_APP_SEARCH_API}`,
      { param: "callback" },
      (err: any, data: any) => {
        if (err) {
          console.error("Error:", err);
          reject(err);
        } else {
          resolve(data.response.result[0].structure.level4LC);
        }
      }
    );
  });
};
