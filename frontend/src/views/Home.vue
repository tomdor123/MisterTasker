<template>
  <div class="home">
    <task-list/>
  </div>
</template>

<script>
import taskList from '@/components/taskList'

export default {
  name: 'home',

  components: {
    taskList
  }
}
</script>
