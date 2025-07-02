import axios from "axios";

// CDS 서비스 연결 (managed approuter 환경)
const baseURL = "/odata/v4/catalog";

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// CDS Interactions_Header 엔티티에서 데이터 가져오기
export const getTableData = async (params = { $top: 100, $skip: 0 }) => {
  try {
    const { data } = await instance.get("/Interactions_Header", {
      params: {
        ...params,
        $expand: "items" // Items도 함께 가져오기
      }
    });

    return data.value || data.d?.results || data;
  } catch (error) {
    console.error("Error fetching interactions data:", error);
    throw error;
  }
};

// CDS 서비스에서 카운트 가져오기
export const getTableCount = async () => {
  try {
    const { data } = await instance.get("/Interactions_Header/$count");
    return data;
  } catch (error) {
    console.error("Error fetching count:", error);
    throw error;
  }
};

// 새로운 Interaction 생성
export const createInteraction = async (interactionData) => {
  try {
    const { data } = await instance.post("/Interactions_Header", interactionData);
    return data;
  } catch (error) {
    console.error("Error creating interaction:", error);
    throw error;
  }
};

// Interaction 업데이트
export const updateInteraction = async (id, interactionData) => {
  try {
    const { data } = await instance.patch(`/Interactions_Header(${id})`, interactionData);
    return data;
  } catch (error) {
    console.error("Error updating interaction:", error);
    throw error;
  }
};
