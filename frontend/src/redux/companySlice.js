import { createSlice } from "@reduxjs/toolkit";
const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    serchComapyByText: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompany: (state, action) => {
      state.companies = action.payload;
    },
    setSerchCompany: (state, action) => {
      state.serchComapyByText = action.payload;
    },
  },
});
export const { setSingleCompany, setCompany, setSerchCompany } =
  companySlice.actions;
export default companySlice.reducer;
