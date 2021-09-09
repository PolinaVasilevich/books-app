import { ref, computed } from "vue";

export default function useSearchedAuthors(authors) {
  const searchQuery = ref("");
  const searchedAuthors = computed(() => {
    return authors.value.filter(
      (item) =>
        item.first_name
          ?.toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        item.last_name?.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return { searchQuery, searchedAuthors };
}
