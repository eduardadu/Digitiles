class CommandHistory{

  constructor(){
    this.cmdList=[];
    this.cmdListRedo=[];
  }
  do(e){
    e.do();
    if(this.cmdList < 15){
      this.cmdList.push(e);
    }else{
      this.cmdList.shift();
      this.cmdList.push(e);
    }
  }

  undo(){
    if(this.cmdList.length < 15){
      this.cmdListRedo.push( this.cmdList[ this.cmdList.length -1 ] );
    }else{
      this.cmdList.shift();
      this.cmdListRedo.push( this.cmdList[ this.cmdList.length -1 ] );
    }
    this.cmdList[ this.cmdList.length -1 ].undo();
    this.cmdList.pop();
  }
  redo(){
    this.cmdListRedo[ this.cmdListRedo.length -1 ].do();
    var aux = this.cmdListRedo.pop();
    this.cmdList.push(aux);
  }

}

class Command{
  constructor(){
  }
  do(){}
  undo(){}
}

//------------------------------------------------------------------------------

class TileTypeCom extends Command{
  constructor(){super();}
  do(){}
  undo(){}
}

class TileColourCom extends Command{
  constructor(){super();}
  do(){}
  undo(){}
}

//------------------------------------------------------------------------------

class GridColsCom extends Command{
  constructor(){super();}
  do(){}
  undo(){}
}

class GridRowsCom extends Command{
  constructor(){super();}
  do(){}
  undo(){}
}

//------------------------------------------------------------------------------

class TextAddCom extends Command{
  constructor(){super();}
  do(){}
  undo(){}
}


//------------------------------------------------------------------------------

class FilterExposureCom extends Command{
  constructor(){super();}
  do(){}
  undo(){}
}

class FilterContrastCom extends Command{
  constructor(){super();}
  do(){}
  undo(){}
}

class FilterSharpnessCom extends Command{
  constructor(){super();}
  do(){}
  undo(){}
}

class FilterNoiseCom extends Command{
  constructor(){super();}
  do(){}
  undo(){}
}

//------------------------------------------------------------------------------

class DrawerDrawCom extends Command{
  constructor(){super();}
  do(){}
  undo(){}
}

class DrawerEraseCom extends Command{
  constructor(){super();}
  do(){}
  undo(){}
}
