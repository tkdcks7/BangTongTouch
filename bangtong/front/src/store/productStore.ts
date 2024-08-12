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
    set((state) => ({
      optionObj: {
        ...state.optionObj,
        [key]: !state.optionObj[key],
      },
    })),
}));

// 검색 store 기본값 인터페이스
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
}

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
  ...productSearchInitialState,
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

// 선호 설정을 위한 인터페이스
interface PreferenceI {
  preferenceId: number;
  preferenceName: string;
  userId: number;
  regionId: string;
  regionAddress: string;
  preferenceDeposit: number;
  preferenceRent: number;
  preferenceType: string;
  preferenceInfra: string;
  preferenceStartDate: string;
  preferenceEndDate: string;
  setPreference: (payload: any) => void; // 선호값 변경
  reSetPreference: () => void; // 초기화
}

// 선호 설정 기본값 인터페이스
const preferenceDefault: Omit<
  PreferenceI,
  "setPreference" | "reSetPreference"
> = {
  preferenceId: 0,
  preferenceName: "서울에서 살래~!!!",
  userId: 0,
  regionId: "1150010400",
  regionAddress: "서울특별시 강서구 가양동",
  preferenceDeposit: 5000,
  preferenceRent: 70,
  preferenceType: "00111",
  preferenceInfra: "11111111",
  preferenceStartDate: "2024-09-06T04:54:15.802+00:00",
  preferenceEndDate: "2025-08-18T06:27:35.802+00:00",
};

// 선호 설정 store
export const preferenceStore = create<PreferenceI>((set) => ({
  ...preferenceDefault,
  setPreference: (payload) => set((state) => ({ ...state, ...payload })),
  reSetPreference: () => set((state) => ({ ...state, ...preferenceDefault })),
}));

export default useProductOptionStore;
