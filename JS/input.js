class Input{
  constructor(gen){
    this.generator= gen;
    this.content;

    this.selected; //has the info
    this.selectedType;
    this.camera= false;

    this.url;

  }
  deleteMats(){
    if(this.selected!=undefined){
      this.selected.delete();
    }
  }

  getContent(){
    return this.content;
  }
  getType(){
    if(this.selected != null && this.selected != 'undefined'){
      return this.selected.getType();
    }else{
      return "None";
    }
  }
  getSelected(){
    return this.selected.getContent();
  }
  getWidth(){
    return this.selected.getWidth();
  }
  getHeight(){
    return this.selected.getHeight();
  }
  getCopyOriginal(){
    return this.selected.getCopyOriginal();
  }
  getContentResize(c, r, f){
    return this.selected.getContentResize(c,r, f);
  }

  hasInput(){
    if(this.selected!=null){
      return true;
    }else{
      return false;
    }
  }

  setContentResize(c, r, f){
    this.selected.setContentResize(c, r, f);
  }


  handleInput(e, obj){

    switch(e){
      case "Upload":
          this.camera=false;
          if (obj.files && obj.files[0]) {
            var allowedImgTypes = ["image/png", "image/jpeg", "image/gif"];
            var allowedVideoTypes = ["video/mp4", "image/ogg", "image/mov"];

            if(allowedImgTypes.indexOf(obj.files[0].type) > -1){ // is if a video or an image?
              window.URL.revokeObjectURL(this.url);
              this.url=window.URL.createObjectURL(obj.files[0]);
              var url= this.url;
              let img;

              async function runInOrder(e){
                await a(e);
              }
              runInOrder(this);
              function a(e){
                var imgHTML= document.querySelector("#ImgLoads");
                imgHTML.src=url;
                imgHTML.onload = function() {
                  img = cv.imread(imgHTML );
                  e.selected = new InputImage(img, e.generator);
                  e.selectedType="Image";
                  e.generator.handleInput("EndUpload");
                }
              }

            }else if(allowedVideoTypes.indexOf(obj.files[0].type) > -1){ //unfinished
              window.URL.revokeObjectURL(this.url);
              this.url=window.URL.createObjectURL(obj.files[0]);
              var url= this.url;
              var e=this;
              let video = document.getElementById("VideoLoads");
                  video.src= url;
                  video.onloadstart = function() {
                    video.addEventListener('loadedmetadata', (event) => {
                      video.play();
                      e.selected= new InputVideo(video, e.generator);
                      e.generator.handleInput("EndUpload");
                    });
                  }
          }
        }
        break;

      case "Webcam":
        this.camera=true;
        var e=this;
        let video = document.getElementById("WebcamLoads"); // video is the id of video tag
        video.src= "";
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
                video.addEventListener('loadedmetadata', (event) => {
                  video.width= video.videoWidth;
                  video.height= video.videoHeight;
                  e.selected= new InputWebcam(video, e.generator);
                  e.generator.handleInput("EndUpload"); //INPUT+ E
                });

            })
            .catch(function(err) {
                console.log("An error occurred! " + err);
            });

        break;

      case "Blank":
        this.camera=true;
        this.selected= new InputBlank(obj, this.generator);
        this.generator.handleInput("EndUpload"); //INPUT+ E
        break;

      case "LocalImage":
        this.camera=false;
        this.url= obj;
        let v = document.getElementById("VideoLoads");
        v.src="";
        let img;
        async function runInOrder(e){
          await a(e, obj);
        }
        runInOrder(this);
        function a(e, obj){
          var imgHTML= document.querySelector("#ImgLoads");
          imgHTML.src=obj;
          imgHTML.onload = function() {
            img = cv.imread(imgHTML );

            e.selected = new InputImage(img, e.generator);
            e.selectedType="Image";
            e.generator.handleInput("EndUpload");
          }
        }
        break;

      case "LocalVideo":
          this.camera=false;
          this.url= obj.url;
                    obj.addEventListener('loadedmetadata', (event) => {
                    obj.play();
                      this.selected= new InputVideo(obj, this.generator);
                      this.generator.handleInput("EndUpload");
                    });
            break;


    }

  }
}




class InputType{
  constructor(content, gen){
    this.content= content; //original
    this.gen=gen;
    this.type;
    this.contentUpdated;
    this.contentResized;
  }
  getContent(){
    return this.content;
  }
  setContentResize(c, r, f){
    var r = this.content.resize( c, r)
    return r;
  }
  getType(){
    return this.type;
  }
  getCopyOriginal(){

  }
  setFiltered(){

  }
}




class InputImage extends InputType{
  constructor(image, gen){
    super();
    this.content= image;
    this.contentUpdated;
    this.gen=gen;
    this.contentResized;
  }
  getContent(){
    let i= this.content.clone();
    return i;
  }
  getContentResize(c, r, f){
    return this.contentResized;
  }
  getType(){
    return "Image";
  }
  getWidth(){
    return this.content.cols;
  }
  getHeight(){
    return this.content.rows;
  }
  setContentResize(c, r, f){

    let src = this.content.clone();
    let dsize = new cv.Size(c, r);
    src= f.executeAll(src);
    cv.resize(src, src, dsize, 0, 0, cv.INTER_AREA);
    this.contentResized = src;
  }

}



class InputVideo extends InputType{
  constructor(video, gen){
    super();

    this.cap = new cv.VideoCapture(video);

    this.video= video;
    //this.reading = this.video.read();

    this.gen=gen;
    this.contentResized;
    this.content;
    this.r=this.video.videoHeight;
    this.c=this.video.videoWidth;

    this.pause=false;
    this.stop=false;
  }
  getContent(){
    let canvasFrame = document.getElementById("videoCanvas");
    let context = canvasFrame.getContext("2d");
    let src = new cv.Mat(height, width, cv.CV_8UC4);

    context.drawImage(this.video, 0, 0, width, height);
    src.data.set(context.getImageData(0, 0, width, height).data);
    this.content =src;
    src.delete();
    return this.content;
  }
  getContentResize(c, r, f){
    this.r=r;
    this.c=c;

    let canvasFrame = document.getElementById("videoCanvas");
    let context = canvasFrame.getContext("2d");
    let src = new cv.Mat(r, c, cv.CV_8UC4);


    context.drawImage(this.video, 0, 0, c,r);
    src.data.set(context.getImageData(0, 0, c, r).data);
    src= f.executeAll(src);
    let dsize = new cv.Size(c,r);

    cv.resize(src, src, dsize, 0, 0, cv.INTER_AREA);
    this.contentResized= src;
    return this.contentResized;
  }
  getType(){
    return "Video";
  }
  getWidth(){
    return parseInt(this.c);
  }
  getHeight(){
    return parseInt(this.r);
  }
  setContentResize(c, r, f){
    this.r=r;
    this.c=c;
    let canvasFrame = document.getElementById("videoCanvas");
    let context = canvasFrame.getContext("2d");
    let src = new cv.Mat(height, width, cv.CV_8UC4);

    context.drawImage(this.video, 0, 0, width, height);
    src.data.set(context.getImageData(0, 0, width, height).data);

    let dsize = new cv.Size(parseInt(c), parseInt(r));
    cv.resize(src, src, dsize, 0, 0, cv.INTER_AREA);
    this.contentResized= src;
  }
  setPause(){
    if(this.pause==false){
      this.video.pause();
    }else{
      this.video.play();
    }
    this.pause= !this.pause;
  }
  setStop(){
    if(this.stop==false){
      this.video.pause();
      this.video.currentTime = 0;
      this.video.load();
    }else{
      this.video.play();
    }
    this.stop =  !this.stop;
  }
}




class InputWebcam extends InputType{
  constructor(video, gen){
    super();
    this.video= video;
    this.gen=gen;
    this.content= this.getContent();
    this.contentResized=this.content;
    this.curr;
  }
  getContent(){
    let canvasFrame = document.getElementById("videoCanvas");
    let context = canvasFrame.getContext("2d");
    let src = new cv.Mat(height, width, cv.CV_8UC4);

    context.drawImage(this.video, 0, 0, width, height);
    src.data.set(context.getImageData(0, 0, width, height).data);

    this.content =src;
    return this.content;
  }
  getContentUpdated(){
    return this.contentUpdated;
  }
  getContentResize(c, r, f){
    this.contentResized.delete();
    let canvasFrame = document.getElementById("videoCanvas");
    let context = canvasFrame.getContext("2d");
    let src = new cv.Mat(r, c, cv.CV_8UC4);

    context.drawImage(this.video, 0, 0, c, r);
    src.data.set(context.getImageData(0, 0, c, r).data);
    src= f.executeAll(src);
    let dsize = new cv.Size(parseInt(c), parseInt(r));
    cv.resize(src, src, dsize, 0, 0, cv.INTER_AREA);

    this.contentResized= src;
    return this.contentResized;
  }
  getType(){
    return "Camera";
  }
  setContentResize(c, r, f){
    let canvasFrame = document.getElementById("videoCanvas");
    let context = canvasFrame.getContext("2d");
    let src = new cv.Mat(r, c, cv.CV_8UC4);
    context.drawImage(this.video, 0, 0, c, r);
    src.data.set(context.getImageData(0, 0, c, r).data);

    let dsize = new cv.Size(parseInt(c), parseInt(r));
    cv.resize(src, src, dsize, 0, 0, cv.INTER_AREA);

    this.contentResized= src;
  }
  getWidth(){
    return this.video.width;
  }
  getHeight(){
    return this.video.height;
  }

  setPause(){
    if(this.pause==false){
      this.content.enabled =true;
    }else{
      this.content.enabled =false;
    }
    this.pause= !this.pause;
  }
  setStop(){
  }
}




class InputBlank extends InputType{
  constructor(a, gen){
    super();
    //this.content= createImage(a[0], a[1]);
    this.content = new cv.Mat(a[1], a[0], cv.CV_8UC4);
    this.gen=gen;
    this.c= a[0];
    this.r= a[1];
    for (let x = 0; x < a[0]; x++) {
     for (let y = 0; y < a[1]; y++) {
       this.content.ucharPtr(y, x)[0] =255;
       this.content.ucharPtr(y, x)[1]=255;
       this.content.ucharPtr(y, x)[2]=255;
       this.content.ucharPtr(y, x)[3]=255;
     }
   }
  }
  getContent(){

    return this.content;
  }
  getContentResize(c, r, f){
    return this.content;
  }

  getType(){
    return "Blank";
  }
  setContentResize(c, r, f){
    let dsize = new cv.Size(parseInt(c), parseInt(r));
    cv.resize(this.content, this.content, dsize, 0, 0, cv.INTER_AREA);
  }

  getWidth(){
    return this.content.cols;
  }
  getHeight(){
    return this.content.rows;
  }
}
