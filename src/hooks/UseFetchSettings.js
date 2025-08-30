import { useQuery } from "@tanstack/react-query";
import { FetchSettingsData } from "../services/ApiSettings";

export default function useFetchSettings() {
  const { isFetched, isLoading, isError, data } = useQuery({
    queryKey: ["settings"],
    queryFn: () => FetchSettingsData(),
  });

  return { isFetched, isLoading, isError, data };
}
