<template>
  <section class="task-list">
    <task-preview v-for="currTask in tasks" :key="currTask._id" :task="currTask" />
    <div class="add-task">
      <button class="add-btn">+ Add Task</button>
      <input type="text"  placeholder="Write a title for this task..."/>
    </div>
  </section>
</template>

<script>
import taskPreview from "@/components/taskPreview";

export default {
  async created() {
    await this.$store.dispatch({ type: "loadTasks" });
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    }
  },
  components: {
    taskPreview
  }
};
</script>


<style lang="scss">
.task-list {
  width: 50vw;
  padding-top:1px;
  margin: 0 auto;
  background-color: lightgrey;
}
</style>

