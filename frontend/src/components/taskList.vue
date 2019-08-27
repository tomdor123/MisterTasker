<template>
  <section class="task-list">
    <task-preview v-for="currTask in tasks" :key="currTask._id" :task="currTask" />
    <div class="add-task">
      <button @click="addTask" class="add-btn">+ Add Task</button>
      <input type="text" v-model="task.title" placeholder="Write a title for this task..."/>
    </div>
    <button @click="performAllTasks">Perform All Tasks</button>
  </section>
</template>

<script>
import taskPreview from "@/components/taskPreview";

export default {
  async created() {
    await this.$store.dispatch({ type: "loadTasks" });
  },
  data(){
    return {
      task: {
        title:'',
        description:'',
        importance: 3,
        createdAt: '',
        lastTried:'',
        triesCount: 0,
        doneAt:''
      }
    }
  },
  methods: {
    addTask(){
      if(!this.task.title){
        alert('Must Enter Task Name')
        return
      } else {
        this.$store.dispatch({type: 'addTask', task: this.task})
      }
    },
    performAllTasks(){
      this.$store.dispatch({type: 'performAllTasks'})  
    }
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

