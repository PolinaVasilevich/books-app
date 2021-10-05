import { ref, computed } from "vue";

export default function useSearchedAuthors(reservedBooks) {
  const searchQuery = ref("");
  const filteredData = ref(null);

  const searchedReservedBooks = computed(() => {
    if (filteredData.value) {
      return [...filteredData.value];
    }

    return reservedBooks.value.filter((item) => {
      return (
        item.data.book.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        item.data.user.username
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        item.data.reservation_number
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
      );
    });
  });

  return { searchQuery, searchedReservedBooks, filteredData };
}
