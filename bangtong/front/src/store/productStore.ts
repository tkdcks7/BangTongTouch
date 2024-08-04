import { create } from "zustand";

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

// order: Integer,
// minDeposit: Integer,
// maxDeposit: Integer,
// minRent: Integer,
// maxRent: Integer,
// type: String,
// address: String,
// rentSupportable: Boolean,
// furnitureSupportable: Boolean,
// infra: Integer,
// startDate: String,
// endDate: String

interface ProductSearchParams {
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
  setDeposit: (min: number, max: number) => void;
  setRent: (min: number, max: number) => void;
  setHomeType: (index: number) => void;
  setAddress: (ad: string) => void;
  setRentSupportable: () => void;
  setFurnitureSupportable: () => void;
  setInfra: (index: number) => void;
  setDate: (st: string, ed: string) => void;
}

// 검색 옵션 store
export const productSearchStore = create<ProductSearchParams>((set) => ({
  order: 0,
  minDeposit: 0,
  maxDeposit: 0,
  minRent: 0,
  maxRent: 0,
  homeType: [0, 0, 0, 0, 0],
  address: "",
  rentSupportable: false,
  furnitureSupportable: false,
  infra: [0, 0, 0, 0, 0, 0, 0, 0],
  startDate: "",
  endDate: "",
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
  setDate: (st: string, ed: string) =>
    set(() => ({
      startDate: st,
      endDate: ed,
    })),
}));

export default useProductOptionStore;
