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
  // 옵션 정보 setter
  setProductOption: (key) =>
    set((state) => ({
      optionObj: {
        ...state.optionObj,
        [key]: !state.optionObj[key],
      },
    })),
}));

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
  setOrder: (idx: number) => void;
  setDeposit: (min: number, max: number) => void;
  setRent: (min: number, max: number) => void;
  setHomeType: (index: number) => void;
  setAddress: (ad: string) => void;
  setRentSupportable: () => void;
  setFurnitureSupportable: () => void;
  setInfra: (index: number) => void;
  setDate: (st: any, ed: any) => void;
}

// 검색 옵션 store
export const productSearchStore = create<ProductSearchParams>((set) => ({
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
}));

export default useProductOptionStore;
