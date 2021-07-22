<template>
  <div class="posts">
    <h1>Posts</h1>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "test",
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=3"
    );

    const posts = await res.json();
    this.posts = posts;
  },
};
</script>
<style>
.posts {
  margin: 60px auto;
  width: 400px;
}

.post {
  border: 1px solid gray;
  border-radius: 5px;
}
</style>
