class MatrixBuilder{
  constructor(){

  }
  getBrightnessMatrix(image, invert) {
    let output = [];
    for (let row = 0; row < image.rows; row++) {
      output[row] = [];
      for (let col = 0; col < image.cols; col++) {
        var r= image.ucharPtr(row, col)[0];
        var g= image.ucharPtr(row, col)[1];
        var b= image.ucharPtr(row, col)[2];;
        output[row][col] = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
        //output[row][col] = (0.299 * r) + (0.587 * g) + (0.114 * b);
        if(invert==false){
          output[row][col]= map(output[row][col], 0,255, 1,0);
        }else{
          output[row][col]= map(output[row][col], 0,255, 0,1);
        }
      }
    }

    return output;
  }
  getBrightnessValue(pixelNumber, image, invert) {
    var r= image.pixels[pixelNumber*4];
    var g= image.pixels[(pixelNumber*4) +1];
    var b= image.pixels[(pixelNumber*4) +2];
    var output = (0.299 * r) + (0.587 * g) + (0.114 * b);

    if(invert==false){
      output= map(output, 0,255, 1,0);
    }else{
    output= map(output, 0,255, 0,1);
    }

    return output;
  }

  setMatrix(image, invert){ //a is input resized
    var matrix= this.getBrightnessMatrix(image, invert);
    return matrix;
  }

}




class MatrixStill extends MatrixBuilder{
  constructor(){
    super();
  }
  checkForMatrixGen(a,b,invert){
    return a.matrix;
  }
}



class MatrixMotion extends MatrixBuilder{
  constructor(){
    super();
  }

  checkForMatrixGen(image, matrix, invert){
    matrix = this.setMatrix(image,invert);
    return matrix;
  }

}
