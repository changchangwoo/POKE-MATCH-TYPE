import { useQuery } from "@tanstack/react-query";
import { fetchDetailType } from "../../api/api"; // 실제 API 함수 경로
import { getDetailType, getGroupType } from "../../utils/getDetailType";
import { getAddAbility } from "../../utils/getAddAbility";

const useFetchDetailType = (typeNo: number[], selectedAbility?: string) => {
  return useQuery({
    queryKey: ["detailType", typeNo],
    queryFn: async () => {
      const fetchDetailTypeData = await fetchDetailType(typeNo);
      const circulateTypeData = await getDetailType(fetchDetailTypeData);
      if (selectedAbility && selectedAbility !== "") {
        getAddAbility(circulateTypeData, selectedAbility);
      }
      let groupResult = await getGroupType(circulateTypeData);
      return groupResult;
    },

    // refetchOnWindowFocus: true, // 포커스 시 다시 패칭
    // staleTime: 1000 * 60 * 5, // 5분 동안 데이터가 신선하게 유지
  });
};

export default useFetchDetailType;
