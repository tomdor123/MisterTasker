import taskService from '../services/taskService'

export default {
    state: {
        tasks:[],
    },
    mutations: {
        setTasks(state, {tasks}) {
            state.tasks = tasks
        },
        removeTask(state, { id }) {
            const idx = state.tasks.findIndex(task => task._id === id)
            state.tasks.splice(idx, 1);
        },
        addTask(state, { task }){
            state.tasks.push(task);
        }
    },
    getters: {
        tasks(state) {
            return state.tasks
        }
    },
    actions: {
        async loadTasks(context){
            try {
                const tasks = await taskService.query()
                context.commit({type: 'setTasks', tasks})
            } catch (err) {
                console.log('got error: ', err)
            }
        },
        async removeTask(context , { id }){
            try {
                await taskService.remove(id);
                context.commit({type: 'removeTask', id})
            } catch (err) {
                console.log('got error while removing task: ', err)
            }
        },
        async performAllTasks(context, { task }){
            try {
                const result = await taskService.performAllTasks();
                console.log('all tasks performed: ',result)
            } catch (err) {
                console.log('got error while performing all tasks: ', err);
            }
        },
        async addTask(context, { task }) {
            try {
                const taskWithId = await taskService.add(task);
                context.commit({type:'addTask', task: taskWithId})
            } catch(err) {
                console.log('got error while adding task')
            }
        }
    },
}