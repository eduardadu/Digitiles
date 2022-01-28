class TileManager{
  constructor(){
    this.backgroundC ='#ffffff';    //fix this
    this.tileC ='#000000';

    this.tileGroup= [];
    this.tileGroup.push(new Rec1LSSM());
    this.notMix=false;
  }

  setBackColor(e){
    this.backgroundC=e;
  }
  setTileColor(e){
    this.tileC=e;
  }
  invertColors(){

  }


  setTile(e){
    let eaux= new e();
    if(this.notMix==false){
      const testClasses = (element) => element.constructor.name == eaux.constructor.name;
      if(this.tileGroup.some(t => t.constructor.name == eaux.constructor.name )){
        this.tileGroup.splice( this.tileGroup.findIndex(testClasses), 1);
      }else{
        this.tileGroup.push(eaux);
      }
    }else{
      this.tileGroup= [];
      this.tileGroup.push(eaux);
    }
  }

  setMix(e){
    this.notMix= !this.notMix;
    if(this.notMix==true){
      if(this.tileGroup.length!=1){
          this.tileGroup.splice(0, this.tileGroup.length-1 );
      }
    }
  }
  getTileGroup(){
    return this.tileGroup;
  }

  getTileLength(){
    return this.tileGroup.length;
  }

  getTileColor(){
    return this.tileC;
  }
  getBackColor(){
    return this.backgroundC;
  }

  getTile(){
    return this.tileGroup[0];
  }
  getTileFromGroup(){
    let aux= this.tileGroup[parseInt(Math.random()* this.tileGroup.length)];
    return aux;
  }

  randomize(){
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    let n2 = (Math.random() * 0xfffff * 1000000).toString(16);
    this.tileC = '#' + n.slice(0, 6);
    this.backgroundC = '#' + n2.slice(0, 6);
    this.setRandom();
  }

  setRandom(){
    var n= parseInt(Math.random()*4) +1;
    this.tileGroup=[];
    var t= new TileList();
    var list= t.getAllSubclasses();
    for(var i=0; i<n; i++){
      var e= list[ parseInt(Math.random() * (list.length-1)) ];
      let eaux= new e();
      this.tileGroup.push(eaux);
    }
  }
}
