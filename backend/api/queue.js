function createQueue() {
    const queue = []
  
    return {
      enqueue(x) {
        queue.push(x)
      },
      dequeue() {
        if (queue.length === 0) {
          return undefined
        }
        return queue.shift()
      },
      peek() {
        if (queue.length === 0) {
          return undefined
        }
        return queue[queue.length - 1]
      },
      get length() {
        return queue.length
      },
      isEmpty() {
        return queue.length === 0
      }
    }
}

module.exports = createQueue;