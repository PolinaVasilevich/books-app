import { ref } from "vue";

export default function useNodeService() {
  const isExpandAll = ref(false);
  const expandedKeys = ref({});

  const expandNode = (node) => {
    if (node.children && node.children.length) {
      expandedKeys.value[node.key] = true;

      for (let child of node.children) {
        expandNode(child);
      }
    }
  };

  const expandAll = (nodes) => {
    for (let node of nodes) {
      expandNode(node);
    }

    isExpandAll.value = true;

    expandedKeys.value = { ...expandedKeys.value };
  };

  const collapseAll = () => {
    expandedKeys.value = {};
    isExpandAll.value = false;
  };

  return { isExpandAll, expandedKeys, expandAll, collapseAll };
}
