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
                console.log('got error: ', err)
            }
        }
    },
}