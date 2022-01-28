class CacheParse{
  constructor(){
    this.localTasksString= localStorage.getItem("tasks");
    this.tasks=  JSON.parse(this.localTasksString);
  }

  getTasks(){

    if(this.tasks!= undefined && this.tasks!= null){
      return this.tasks;

    }else{
      return {
        "must": [
          {"name": "Finish AI Project Tasks",  "done": true, "id":"0", "type":"Must"},
          {"name": "State of Art Intro",  "done": false, "id":"1", "type":"Must"}
        ],
        "should": [
          {"name": "Abstract",  "done": false, "id":"0", "type":"Should"},

        ],
        "could": [
          {"name": "Dissertation reffs",  "done": true, "id":"0", "type":"Could"},
          {"name": "Buy Pens",  "done": false, "id":"1", "type":"Could"}
        ],
        "want": [
          {"name": "French Lesson",  "done": true, "id":"0", "type":"Want"},
          {"name": "Poster for PCD",  "done": false, "id":"1" , "type":"Want"}
        ],
      };
    }
  }

}
