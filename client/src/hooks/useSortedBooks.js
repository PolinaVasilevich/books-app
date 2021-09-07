import {ref, computed} from 'vue';

export default function useSortedBooks(books) {
    const selectedSort = ref('');
    const isSortUp = ref(false);
    const sortedBooks = computed(() => {
        if (typeof books.value[0][selectedSort.value] === "string") {
            [...books.value].sort((firstField, secondField) => {
              if (isSortUp.value) {
                return firstField[selectedSort.value].toLowerCase() >
                  secondField[selectedSort.value].toLowerCase()
                  ? 1
                  : -1;
              } else {
                return firstField[selectedSort.value].toLowerCase() <
                  secondField[selectedSort.value].toLowerCase()
                  ? 1
                  : -1;
              }
            });
          } else if (typeof books.value[0][selectedSort.value] === "number") {
            [...books.value].sort((firstField, secondField) => {
              if (isSortUp.value) {
                return firstField[selectedSort.value] - secondField[selectedSort.value];
              } else {
                return secondField[selectedSort.value] - firstField[selectedSort.value];
              }
            });
          }
        }),

        return {
            selectedSort, sortedBooks, isSortUp
        }
}