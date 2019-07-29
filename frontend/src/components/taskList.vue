<template>
  <div class="task-list">
      {{tasks}}
  </div>
</template>

<script>
export default {
    async created(){
        await this.$store.dispatch({type:'loadTasks'})
    },
    computed: {
        tasks(){
            return this.$store.getters.tasks
        }
    }
}
</script>
