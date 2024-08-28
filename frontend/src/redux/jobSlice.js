import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singlJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    serchQuery: "",
    jobMsgs: [],
  },
  reducers: {
    //actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singlJob = action.payload;
    },
    setAdminJob: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJob: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },

    setSerchQuery: (state, action) => {
      state.serchQuery = action.payload;
    },
    setMsgs: (state, action) => {
      const data = action.payload;
      const indexs = state.jobMsgs.findIndex((msg) => msg._id == data._id);
      if (indexs < 0) {
        state.jobMsgs.push(data);
        // console.log("repit");
      }
      //  else {

      // }
    },
    removeUser: (state, action) => {
      const data = action.payload;
      // confirm(data);
      // const indexs = state.jobMsgs.indexOf(action.payload);
      const indexs = state.jobMsgs.findIndex((msg) => msg._id == data);
      // confirm(indexs);
      if (indexs >= 0) {
        state.jobMsgs.splice(indexs, 1);
      }
    },
  },
});
export const {
  setAllJobs,
  setSingleJob,
  setAdminJob,
  setSearchJob,
  setAllAppliedJobs,
  setSerchQuery,
  setMsgs,
  removeUser,
} = jobSlice.actions;
export default jobSlice.reducer;
