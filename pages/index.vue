<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig();
const { data, refresh, pending } = await useFetch(config.public.wordpressUrl, {
  method: 'get',
  query: {
    query: `
      query NewQuery {
        posts{
          nodes {
            title
            date
            excerpt
            uri
          }
        }
      }
    `
  }, 
  transform(data:any){
    return data.data.posts.nodes as Array<Record<'title' | 'date' | 'excerpt' | 'uri', string>>;
  }
  });
  
</script>

<template>
  <div>
    <TheHeader />
    <!-- Blog Grid Start -->
    <section class="container py-16">
      <div class="grid sm:grid-cols-3 gap-5">
        <Post v-for="post in data" :key="post.uri" :post="post" />
      </div>
      <!-- :excerpt="post.excerpt.rendered" -->
    </section>
    <!-- Blog Grid End -->
  </div>
</template>