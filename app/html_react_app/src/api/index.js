import axios from "axios";

const baseURL = "ZAM_DEV_SAML_ASSERTION/sap/opu/odata/sap/YUI_ASIM0010N_O2";

const instance = axios.create({
  baseURL
});

export const getTableData = async (params = { $top: 100, $skip: 0 }) => {
  const { data } = await instance.get("/YI_ASIM0010N", {
    params
  });

  return data.d?.results || data.d || data.value;
};

export const getTableCount = async () => {
  const { data } = await instance.get("/YI_ASIM0010N/$count");
  return data;
};
