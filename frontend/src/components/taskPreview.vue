<template>
  <section class="task-preview">
    <button class="delete-btn" @click="removeTask">Delete</button>
    <div class="title">
      <span>Title:</span>
      {{task.title}}
    </div>
    <div class="description">
      <span>Desctiption:</span>
    </div>
    <textarea></textarea>
    <div class="importance">
      <span>Importance:</span>
      {{task.importance}}
    </div>
    <div class="created-at">
      <span>Created At:</span>
      {{task.createdAt}}
    </div>
    <div class="tries-count">
      <span>Tries Count:</span>
      {{task.triesCount}}
    </div>
    <button class="send-btn">Send</button>
  </section>
</template>

<script>
export default {
  props: ["task"],
  methods: {
    removeTask() {
      this.$store.dispatch({ type: "removeTask", id: this.task._id });
    }
  }
};
</script>


<style lang="scss" scoped>
@mixin btn {
  border-radius: 10px;
  padding: 5px;
}
.task-preview {
  background-color: white;
  border-radius: 5px;
  margin: 10px;
  & > div > span {
    font-weight: bold;
  }

  & .delete-btn {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    @include btn;
    background-color: #ff6d6d;
  }

  & .send-btn {
    @include btn;
    margin-bottom:5px;
    background-color: #00d800;
  }
}
</style>
