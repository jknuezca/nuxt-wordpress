<template>
    <NuxtLink :to='post.uri'>
        <div class="flex 
            items-center 
            bg-gradient-to-r
            from-cyan-700 
            to-sky-500 
            p-8 
            rounded-lg 
            text-white 
            transition duration-500 ease-in-out 
            hover:scale-105"
        >
            <div>
                <h2 class="font-semibold text-2xl">{{ post.title }}</h2>
                <p>{{ formattedDate }}</p>
                <div class="mt-4 text-sm" v-html="truncatedExcerpt()" > </div>
                <!-- <div class="mt-4" v-html="post.excerpt" > </div> -->
                <!-- <p>{{ new Date(post.date).toLocaleDateString() }}</p> -->
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
    const props = defineProps<{
        post: Record< 'title' | 'date' | 'excerpt' | 'uri', string>
    }>();

    // Format the date to exclude the timestamp
    const formattedDate = computed(() => {
    if (props.post?.date) {
        const dateObject = new Date(props.post.date);
        return dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        });
    }
        return '';
    });

    const MAX_EXCERPT_LENGTH = 120; // Define the maximum length of the excerpt
    const truncatedExcerpt = () => {
    // const excerptText = props.post.excerpt.replace(/<\/?p>/g, '');
    const excerptText = props.post.excerpt;
    if (excerptText.length > MAX_EXCERPT_LENGTH) {
        return excerptText.slice(0, MAX_EXCERPT_LENGTH) + '...';
    }
        return excerptText;
    };
</script>