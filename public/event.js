const testCallback = () => {
  console.log("Callback Working");
};

class Events {
  constructor(){
    this.all_events = new Map();
  }
  
  // Register an event handler
  on(eventName, callback) {
    if (!this.all_events.get(eventName)){
      this.all_events.set(eventName,[callback]);
    }
    else{
      this.all_events.get(eventName).push(callback);
    }
  }

  // Trigger all callbacks associated
  // with a given eventName
  trigger(eventName) {
    if(this.all_events.get(eventName))
    {    
      this.all_events.get(eventName).forEach(callback => {
      callback();
    })
    }
  }

  // Remove all event handlers associated
  // with the given eventName
  off(eventName) {
    if(this.all_events.get(eventName)) {
      this.all_events.delete(eventName);
    }
  }
}

  let events = new Events();

// console.log("Working");
    
$('.on').on('click', () => {
  console.log("On Click");
  events.on('TestEvent', testCallback);
});

$('.trigger').on('click', () => {
  console.log("Trigger Click")
  events.trigger('TestEvent');
});

$('.off').on('click', () => {
  console.log("Off Click")
  events.off('TestEvent');
});