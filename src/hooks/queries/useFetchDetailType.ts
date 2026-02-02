import { useQuery } from "@tanstack/react-query";
import { fetchDetailType } from "../../api/api";
import { getDetailType, getGroupType } from "../../utils/getDetailType";
import { getAddAbility } from "../../utils/getAddAbility";

const useFetchDetailType = (
  no: number[],
  selectedAbility?: string,
  selectedTerastal_no?: string
) => {
  return useQuery({
    queryKey: ["detailType", no, selectedAbility, selectedTerastal_no],
    queryFn: async () => {
      let typeNoArray = [...no];

      if (selectedTerastal_no) {
        typeNoArray = [Number(selectedTerastal_no)];
      }

      const fetchDetailTypeData = await fetchDetailType(typeNoArray);
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
