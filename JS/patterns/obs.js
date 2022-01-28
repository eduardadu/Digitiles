

class Observer{
  constructor(){

  }
  update(){}
}


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


class Observable{
  constructor(){
    this.listObs=[];
  }
  addObserver(e){
    this.listObs.push(e);
  }
  removeObserver(){
    const index = array.indexOf(e);
    if (index > -1) {
      this.listObs.splice(index, 1);
    }
  }
  notifyObservers(e, obj){
    for(var i=0; i< this.listObs.length; i++){
      this.listObs[i].update(e,obj);
    }
  }

}
