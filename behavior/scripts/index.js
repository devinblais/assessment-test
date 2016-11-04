'use strict'

exports.handle = (client) => {
  // Create steps
  const sayHello = client.createStep({
    satisfied() {
      return false;
    },

    prompt() {
      client.addResponse('app:response:name:welcome/select_topic')
      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('app:response:name:apology/untrained')
      client.done()
    }
  })

  client.runFlow({
    classifications: {
    },
    streams: {
      main: 'onboarding',
      onboarding: [sayHello],
      end: [untrained],
    },
  })
}
