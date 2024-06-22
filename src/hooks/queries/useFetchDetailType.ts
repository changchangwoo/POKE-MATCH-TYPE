import { useQuery } from "@tanstack/react-query";
import { fetchDetailType } from "../../api/api"; // 실제 API 함수 경로

const useFetchDetailType = (typeNo: number[]) => {
  return useQuery({
    queryKey: ["detailType", typeNo],
    queryFn: () => fetchDetailType(typeNo),
    // refetchOnWindowFocus: true, // 포커스 시 다시 패칭
    // staleTime: 1000 * 60 * 5, // 5분 동안 데이터가 신선하게 유지
  });
};

export default useFetchDetailType;
