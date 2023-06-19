<script setup>
const route = useRoute();
const uri = route.params.uri.join('/');
const config = useRuntimeConfig();
const {data} = await useFetch(config.public.wordpressUrl, {
    method: 'get',
    query: { 
        query: `
        query MyQuery($uri: String!) {
            nodeByUri(uri: $uri) {
                ... on Post {
                    id
                    title
                    date
                    content
                    featuredImage {
                        node {
                        sourceUrl
                        }
                    }
                    comments {
                        nodes {
                        id
                        content
                        date
                        author {
                            node {
                            name
                            }
                        }
                        }
                    }
                }
            }
        }
        `,
        variables: {
            uri: uri
        }
    }, 
    transform(data){
        return data.data.nodeByUri
    }
});

useHead({
    title: data.value.title
});

// Format the date to exclude the timestamp
const formattedDate = computed(() => {
if (data.value?.date) {
    const dateObject = new Date(data.value.date);
    return dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    });
}
    return '';
});

// Get the URL of the featured image
const featuredImage = computed(() => {
    return data.value?.featuredImage?.node?.sourceUrl ?? '';
});

</script>

<template>
    <TheHeader />
    
    <main class="bg-gray-100 container mx-auto mt-6 p-6 rounded-lg">
        <h1 class="text-4xl text-center font-bold">{{ data.title }}</h1>
        <div class="text-sm mt-4 text-center">
            Published on {{ formattedDate }}
        </div>
        <!-- POST IMAGE  -->
        <div class="post-image">
            <img :src="featuredImage" alt="Featured Image" class="mt-4 mx-auto" v-if="featuredImage">
        </div>
        <article class="post-content mt-4 space-y-2 px-9" v-html="data.content">
        </article>
        <!-- COMMENTS SECTION -->
        <div v-if="data.comments">
            <h2>Comments</h2>
            <ul>
                <li v-for="comment in data.comments.nodes" :key="comment.id">
                    <div v-html="comment.content"> </div>
                    <p>Posted by: {{ comment.author.node.name }}</p>
                    <p>Date: {{ comment.date }}</p>
                </li>
            </ul>
        </div>
        <!-- COMMENT FORM -->
        <form @submit="submitComment">
            <textarea v-model="newComment" placeholder="Enter your comment"></textarea>
            <button type="submit">Submit</button>
        </form>
    </main>
    

</template>

<style >
.post-content {
    @apply sm:px-10;
}
.post-content h1,
.post-content h2,
.post-content h3,
.post-content h4,
.post-content h5,
.post-content h6,
.post-content p {
    @apply my-5;
}
.post-content h1,
.post-content h2,
.post-content h3,
.post-content h4,
.post-content h5,
.post-content h6 {
    @apply font-bold;
}

.post-content h1 {
    @apply text-2xl sm:text-4xl;
}

.post-content h2 {
    @apply text-xl sm:text-3xl;
}

.post-content h3 {
    @apply text-lg sm:text-2xl;
}

.post-content h4 {
    @apply sm:text-xl;
}

.post-content h5 {
    @apply text-sm sm:text-lg;
}
</style>