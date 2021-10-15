import { ref, computed } from "vue";
import Library from "@/models/Library";

export default function useSearchedLibraries(data) {
  const searchQuery = ref("");
  const searchedLibraries = computed(() => {
    return data.value.filter(
      (item: Library) =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item?.address?.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return { searchQuery, searchedLibraries };
}
