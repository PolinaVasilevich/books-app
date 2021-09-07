import { computed, ref } from "vue";

export default function useSortedBooks(books) {
  const searchQuery = ref("");
  const searchedBooks = computed(() => {
    return books.value.filter((book) => {
      if (searchQuery.value === "") return true;
      else
        return (
          book.title.toLowerCase().includes(searchQuery.value) ||
          book.author.first_name.toLowerCase().includes(searchQuery.value) ||
          book.author.last_name.toLowerCase().includes(searchQuery.value)
        );
    });
  });
  return {
    searchQuery,
    searchedBooks,
  };
}
