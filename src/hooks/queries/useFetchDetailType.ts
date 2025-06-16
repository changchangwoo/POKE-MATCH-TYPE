import { useQuery } from "@tanstack/react-query";
import { fetchDetailType } from "../../api/api"; // 실제 API 함수 경로
import { getDetailType, getGroupType } from "../../utils/getDetailType";
import { getAddAbility } from "../../utils/getAddAbility";

const useFetchDetailType = (no: number[], selectedAbility?: string) => {
  return useQuery({
    queryKey: ["detailType", no, selectedAbility],
    queryFn: async () => {
      const fetchDetailTypeData = await fetchDetailType(no);
      const circulateTypeData = await getDetailType(fetchDetailTypeData);
      if (selectedAbility && selectedAbility !== "") {
        getAddAbility(circulateTypeData, selectedAbility);
      }
      let groupResult = await getGroupType(circulateTypeData);
      return groupResult;
    },
  });
};

export default useFetchDetailType;
