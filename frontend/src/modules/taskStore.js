import taskService from '../services/taskService'

export default {
    state: {
        tasks:[],
    },
    mutations: {
        setTasks(state, {tasks}) {
            state.tasks = tasks
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
        }
    },
}