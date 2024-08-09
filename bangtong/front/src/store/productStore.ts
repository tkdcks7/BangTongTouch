import { create } from "zustand";
import dayjs from "dayjs";

interface ProductOption {
  풀옵션: boolean;
  가스레인지: boolean;
  냉장고: boolean;
  세탁기: boolean;
  에어컨: boolean;
  전자레인지: boolean;
  침대: boolean;
  티비: boolean;
}

interface ProductStore {
  optionObj: ProductOption;
  setProductOption: (key: keyof ProductOption) => void;
}

const useProductOptionStore = create<ProductStore>((set) => ({
  optionObj: {
    풀옵션: false,
    가스레인지: false,
    냉장고: false,
    세탁기: false,
    에어컨: false,
    전자레인지: false,
    침대: false,
    티비: false,
  },

  setProductOption: (key) =>
    set((state) => {
      const productOptionKeys: (keyof ProductOption)[] = Object.keys(
        state.optionObj
      ) as (keyof ProductOption)[];
      const newObj = { ...state.optionObj };
      console.log(newObj);
      // 풀옵션일 경우
      if (key === "풀옵션") {
        if (state.optionObj["풀옵션"]) {
          console.log("all false");
          productOptionKeys.forEach((el) => (newObj[el] = false)); // 풀옵션을 끌 경우, 전체를 false로
        } else {
          console.log("all true");
          productOptionKeys.forEach((el) => (newObj[el] = true)); // 풀옵션을 켤 경우, 전체를 true로
        }
      } else {
        newObj[key] = !newObj[key];
      }
      console.log("newObj는...");
      console.log(newObj);
      return { optionObj: newObj };
    }),
}));

// 검색 store 인터페이스
interface ProductSearchParams {
  productsList: any[]; // 조회한 매물 목록
  order: number;
  minDeposit: number;
  maxDeposit: number;
  minRent: number;
  maxRent: number;
  homeType: number[]; // type은 빌드업 네임이므로 바꿔준다
  address: string;
  rentSupportable: Boolean;
  furnitureSupportable: Boolean;
  infra: number[]; // 비트마스킹용 array
  startDate: string;
  endDate: string;
  setProductsList: (data: any) => void; // 매물 목록 갱신
  setOrder: (idx: number) => void; // 검색 방법 setter
  setDeposit: (min: number, max: number) => void; // 보증금 setter
  setRent: (min: number, max: number) => void; // 월세 setter
  setHomeType: (index: number) => void; // 집 유형 setter
  setAddress: (ad: string) => void; // 주소 문자열 setter
  setRentSupportable: () => void; // 월세 지원 여부 setter
  setFurnitureSupportable: () => void; // 가구 지원 여부 setter
  setInfra: (index: number) => void; // 주변 편의시설 setter
  setDate: (st: any, ed: any) => void; // 날짜 start, end setter
  setInitailize: () => void; // 옵션을 초기화하는 함수
}

// 검색 store 초기값 interface
type ProductSearchParamsInitialI = Omit<
  ProductSearchParams,
  | "setProductsList"
  | "setOrder"
  | "setDeposit"
  | "setRent"
  | "setHomeType"
  | "setAddress"
  | "setRentSupportable"
  | "setFurnitureSupportable"
  | "setInfra"
  | "setDate"
  | "setInitailize"
>;

// 검색 store 초기값 선언
const productSearchInitialState: ProductSearchParamsInitialI = {
  productsList: [],
  order: 0,
  minDeposit: 0,
  maxDeposit: 3000,
  minRent: 0,
  maxRent: 300,
  homeType: [0, 0, 0, 0, 0],
  address: "",
  rentSupportable: false,
  furnitureSupportable: false,
  infra: [0, 0, 0, 0, 0, 0, 0, 0],
  startDate: "0000-00-00",
  endDate: "0000-00-00",
};

// 검색 옵션 store
export const productSearchStore = create<ProductSearchParams>((set) => ({
  ...productSearchInitialState, // 초기값을 넣어줌
  setProductsList: (data: any) => set(() => ({ productsList: data })),
  setOrder: (idx: number) => set(() => ({ order: idx })),
  setDeposit: (min: number, max: number) =>
    set(() => ({
      minDeposit: min,
      maxDeposit: max,
    })),
  setRent: (min: number, max: number) =>
    set(() => ({
      minRent: min,
      maxRent: max,
    })),
  setHomeType: (index: number) =>
    set((state) => {
      const newHomeType = [0, 0, 0, 0, 0];
      newHomeType[index] = 1;
      return { homeType: newHomeType };
    }),
  setAddress: (ad: string) => set(() => ({ address: ad })),
  setRentSupportable: () =>
    set((state) => ({ rentSupportable: !state.rentSupportable })),
  setFurnitureSupportable: () =>
    set((state) => ({ furnitureSupportable: !state.furnitureSupportable })),
  setInfra: (index: number) =>
    set((state) => {
      const newInfra = [...state.infra];
      if (newInfra[index]) {
        newInfra[index] = 0;
      } else {
        newInfra[index] = 1;
      }
      return { infra: newInfra };
    }),
  setDate: (st: any, ed: any) =>
    set(() => ({
      startDate: dayjs(st).format("YYYY-MM-DD"),
      endDate: dayjs(ed).format("YYYY-MM-DD"),
    })),
  setInitailize: () =>
    set((state) => ({ ...state, ...productSearchInitialState })),
}));

export default useProductOptionStore;
