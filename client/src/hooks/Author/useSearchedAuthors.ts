import { ref, computed } from "vue";
import Author from "@/models/Author";

export default function useSearchedAuthors(authors) {
  const searchQuery = ref("");
  const searchedAuthors = computed(() => {
    return authors.value.filter(
      (item: Author) =>
        item.first_name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return { searchQuery, searchedAuthors };
}
