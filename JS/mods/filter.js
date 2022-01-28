

class FilterProcess{
  constructor(exp, cont, sharp, noise){

    this.listFilters=[new BrightnessContrast(), new Bluriness(), new Noise()];
  }
  executeAll(img){

    for(var i=0; i<this.listFilters.length; i++){

      if(this.listFilters[i].getActive()==true){

        this.listFilters[i].execute(img);
      }
    }
     return img;
  }
  setFilterReset(){
    for(var i=0; i<this.listFilters.length; i++){
      this.listFilters[i].setValue(150);
    }
  }
  set(type, value){
    switch(type){
      case "Brightness":
        this.listFilters[0].setValueBeta(value);
        break;
      case "Contrast":
        this.listFilters[0].setValueAlpha(value);
        break;
      case "Bluriness":
        this.listFilters[1].setValue(value);
        break;
      case "Noise":
        this.listFilters[2].setValue(value);
        break;
    }
  }

}

class Filter{
  constructor(){
    this.value=0;
    this.value2=0;
  }
  execute(img){

    return img;
  }
  setValue(e){
    this.value= e;
  }
  getType(){
    return "Filter";
  }
  getActive(){
    if(this.value==0){
      return false;
    }else{ return true;}
  }
}


class BrightnessContrast extends Filter{
  //alpha - gain -contrast [1.0-3.0], beta  - bias- brightness [0-300]
  constructor(){
    super();
    this.value=parseInt(150);
    this.value2=parseInt(150);
  }
  execute(img){

    var alpha=map( parseFloat(this.value), 0,300,  0, 2);
    var beta= map(parseFloat(this.value2), 0,300, -127,127);

    cv.convertScaleAbs(img, img, alpha, beta);
    return img;
  }
  setValue(e){
    this.value=e;
    this.value2=e;
  }
  setValueAlpha(e){
    this.value= parseFloat(e);
  }
  setValueBeta(e){
    this.value2= parseFloat(e);
  }
  getType(){
    return "Brightness";
  }
  getActive(){
    if(this.value==150 && this.value2==150){
      return false;
    }else{ return true;}
  }
}





class Bluriness extends Filter{
  constructor(){
    super();
    this.value=150;}

  execute(img){
    var v= map(this.value, 0,300,-300,300);
    if( v>0){
      var k= parseInt(abs(v)/10);
      if(k%2==0){k++;}
      let ksize = new cv.Size(k, k);
      cv.GaussianBlur(img, img, ksize, 0, 0, cv.BORDER_DEFAULT);  //ksize.width > 0 && ksize.width % 2 == 1 && ksize.height > 0 && ksize.height % 2 == 1
      return img;
    }else{
      var aux= img.clone();
      var k= parseInt(abs(v)/10);
      if(k%2==0){k++;}
      let ksize = new cv.Size(k, k);
      cv.GaussianBlur(aux, aux, ksize, 0, 0, cv.BORDER_DEFAULT);
      cv.addWeighted(img, 1 + 1, aux, -1, 0, img);
      aux.delete();
      return img;
    }
    return img;
  }
  setValue(e){
    this.value= e;
  }
  getType(){
    return "Blurriness";
  }
  getActive(){
    if(this.value==150){
      return false;
    }else{ return true;}
  }
}


class Noise extends Filter{
  constructor(){
    super();
    this.value=0;
  }
  execute(image){

  }
  setValue(e){
    this.value= e;
  }
  getType(){
    return "Noise";
  }
  getActive(){
    if(this.value==150){
      return false;
    }else{ return true;}
  }
}
