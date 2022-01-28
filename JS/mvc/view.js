class View extends Observer{
  constructor(model){
    super();
    this.shapesAnim = [];
    this.selExport="PNG";
    this.hide=false;
    this.svgSize=20;
    this.about=false;
    this.lastImport="Upload";

    this.intervalDisplay;

    this.loading=false;

    this.notMixTile=false;

    this.generator= model;
    this.createController();
    this.generator.addObserver(this);

    //this.addListenersTopbar();  //buttons on top bar + title
  }

  startHome(){
    this.addMainListeners();

  }


  startApp(){
    this.addListenersBotBar();  //bottom small bar settings
    this.addTileList();         //generate the animations of tiles for the sidebar

    this.addListeners();
    this.addDrawerListeners();  //listeners for drawing feature

    this.addTileRotation();
    this.addTextSetup();              //add the text inputs

    this.setSideBarInteraction();     //set listeners for the sidebar in general
    this.addInputNumberInteraction(); //input number drag up and hover
    this.addColorInput();
    this.addMainListeners();
  }



  createController(){
    this.controller= new Controller(this);
  }

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  addColorInput(){

    var eventClick = new Event('click', {
        bubbles: true,
        cancelable: true,
    });


    $('#color-picker-tile').spectrum({
      type: "component",
      clickoutFiresChange: true
    });
    $('#color-picker-background').spectrum({
      type: "component",
      clickoutFiresChange: true
    });
    var auxC = this.controller;
    $('#color-picker-tile').on("dragstop.spectrum", function(e, color) {
        color.toHexString();
        auxC.handleInput("Style+TileC", color.toHexString());
    });
    $('#color-picker-background').on("dragstop.spectrum", function(e, color) {
        color.toHexString();
        auxC.handleInput("Style+BackgroundC", color.toHexString());
    });
    $( ".sp-colorize-container" ).each(function() {
        $(this).on("click", function(){
          let id= str("#" + $(this).next('input')[0].id);
          $(id).spectrum("toggle");
          return false;
        });
    });
  }

  addMainListeners(){
    var auxC= this.controller;
    var auxG= this.generator;
    //var canvas = document.getElementById("myCanvas");
    var main = document.getElementsByTagName("main")[0];
    var c =document.getElementById("myCanvas");
    var mousedownID = -1;

    var calledDraw=false;
    var calledText=false;
    var lastTile;


    main.addEventListener("mousedown", function(e){

      var openTab="None";
      if(document.querySelector("#sectiontitleSelected")!= undefined){
        openTab= document.querySelector("#sectiontitleSelected").getElementsByTagName('span')[0].innerHTML;
      }
      switch(openTab){
        case "Draw":
          if(auxG.getDrawSwitch() == true){
            if(mousedownID==-1){  //Prevent multimple loops!
              calledDraw=true;
              mousedownID = setInterval(function(){
                if(mouseX>=0 && mouseY>=0 && mouseX <= parseFloat(c.offsetWidth) && mouseY <= parseFloat(c.offsetHeight) && calledDraw==true){
                  calledDraw=true;
                  if(auxG.checkLastTileDrawn(mouseX, mouseY)==false){
                    executedraw(e);
                  }
                }
              }, 0);
            }
          }
          break;
        case "Text":
          if(mouseX>=0 && mouseY>=0 && mouseX <= parseFloat(c.offsetWidth) && mouseY <= parseFloat(c.offsetHeight)){
            if(mousedownID==-1){
              mousedownID =1;
              calledText=true;
              var ogx = mouseX;
              var ogy = mouseY;
              selectOnMousedown();
              mousedownID = setInterval(function(){
                if(calledText==true){
                  moveTextBox(ogx, ogy);
                  ogx = mouseX; ogy = mouseY;
                }
              }, 0 ); /*execute every 100ms*/
            }else{
              clearInterval(mousedownID);
              mousedownID=-1;
            }
          }
          break;
        default:
          break;
      }
    });
    main.addEventListener("mouseup", function(){

      var openTab=  document.querySelector("#sectiontitleSelected").getElementsByTagName('span')[0].innerHTML;
      switch(openTab){
        case "Draw":
          if(auxG.getDrawSwitch() == true){
            clearInterval(mousedownID);
            mousedownID=-1;
            calledDraw=false;
            auxG.drawer.lastDrawn=undefined;
          }
          break;
        case "Text":
          clearInterval(mousedownID);
          mousedownID=-1;
          calledText=false;
          break;
        }
    });
    function executedraw(e){
      var a=[];
      a.push(mouseX);
      a.push(mouseY);
      auxC.handleInput("Draw+MouseDown", a);
    }
    function stopdraw(e){
      auxC.handleInput("Draw+MouseUp",);
    }
    function moveTextBox(ogx, ogy){
      var a=[];
      a.push(ogx, ogy);
      a.push(mouseX);
      a.push(mouseY);
      auxC.handleInput("Text+MoveMouseDown", a);
    }
    function selectOnMousedown(){
      var a=[];
      a.push(mouseX);
      a.push(mouseY);
      auxC.handleInput("Text+SelectMouseDown", a);
    }
  }


    addListenersTopbar(){

      var topbar= document.getElementById("topbar");

      $('#topbar').load("content/topbar.html", function (){
        var aboutPage= document.getElementById("about");
        var galleryPage= document.getElementById("gallery");
        var createPage= document.getElementById("create");
        var homePage= document.getElementById("title");

        homePage.addEventListener("click", function(){
            window.history.pushState('page2', 'About', '/about.html');
            if(homePage.classList.contains("tbSelected")){
            }else{
              createPage.classList.remove("tbSelected");
              aboutPage.classList.remove("tbSelected");
              homePage.classList.add("tbSelected");

              document.getElementsByTagName("main")[0].style.display="none";
              $("#mainContent").load("content/homeContent.html");
            }
        });

        aboutPage.addEventListener("click", function(){
            window.history.pushState('page2', 'About', '/about.html');
            if(aboutPage.classList.contains("tbSelected")){
            }else{
              createPage.classList.remove("tbSelected");
              aboutPage.classList.add("tbSelected");

              document.getElementsByTagName("main")[0].style.display="none";
              $("#mainContent").load("content/aboutContent.html");
            }
        });

        createPage.addEventListener("click", function(){
            window.history.pushState('page2', 'Create', '/create.html');
            if(createPage.classList.contains("tbSelected")){
            }else{
              aboutPage.classList.remove("tbSelected");
              createPage.classList.add("tbSelected");
              document.getElementsByTagName("main")[0].style.display="block";
              $("#mainContent").load("content/createContent.html");

            }
        });
      });

    }

    setSideBarInteraction(){
      var auxC= this.controller;
      var auxG= this.generator;
      var sectionList= document.querySelectorAll('.sectiontitle');
      for(var i=0; i<sectionList.length; i++){
        var aux= sectionList[i];

        sectionList[i].addEventListener("click", function(){
          if(this.parentNode.clientHeight > 60){
            this.parentNode.style.maxHeight="2rem";
            this.parentNode.classList.remove("sectionSelected");
            this.parentNode.querySelector(".help").style.display="none";

            this.setAttribute("id", "");
            this.querySelectorAll("svg")[0].setAttribute("id", "");
            if(this.parentNode.id!="Draw"){
              auxC.handleInput("Draw+Switch", false);
            }

          }else{
            auxC.handleInput("Tab", this.parentNode.id);  //----------change mod

            for(var i=0; i< sectionList.length ; i++){    //----------minimize tab
              sectionList[i].parentNode.style.maxHeight="2rem";
              sectionList[i].parentNode.classList.remove("sectionSelected");
              sectionList[i].setAttribute("id", "");
              sectionList[i].querySelectorAll("svg")[0].setAttribute("id", "");
              sectionList[i].parentNode.querySelector(".help").style.display="none";
            }

            this.parentNode.style.maxHeight="100vh";  //----------change styling
            this.parentNode.classList.add("sectionSelected");
            this.setAttribute("id", "sectiontitleSelected");
            this.parentNode.querySelector(".help").style.display="block";
            this.querySelectorAll("svg")[0].setAttribute("id", "sectionSVGSelected");
            if(this.parentNode.id=="Draw"){           //----------change styling
              auxC.handleInput("Draw+Switch", true);
            }else{
              auxC.handleInput("Draw+Switch", false);

            }
            //mudar os cursores
            cursorChanges(this);
            function cursorChanges(e){
              switch(e.parentNode.id){
                case "Draw":
                  document.getElementsByTagName("main")[0].style.cursor="crosshair";
                  break;
                case "Type":
                  document.getElementsByTagName("main")[0].style.cursor="move";
                  break;
                default:
                  document.getElementsByTagName("main")[0].style.cursor="default";
                  break;
              }

            }
          }
        });
      }
    }

  addListenersBotBar(){
      	var bc= document.getElementById("bottomcontainer");
        var main = document.getElementsByTagName("main");
        main[0].appendChild(bc);
        bc.style.display="flex";

        var auxC= this.controller;
        this.zoom= document.getElementById("zoomSlider");
        this.zoomout= document.getElementById("zoomout");
        this.zoomin= document.getElementById("zoomin");
        this.setFullscreen= document.getElementById("setFullscreen");
        this.setFit= document.getElementById("fitScreen");
        this.hideMenu= document.getElementById("hideMenu");

        //---------------------------------------------------------------------------menu / fullscreen / fit
        this.hideMenu.addEventListener("click",function(){
          auxC.handleInput("Settings+Hide", null);
        });

        this.setFit.addEventListener("click",function(){
          var f=[];
          f.push(document.querySelector("main").getBoundingClientRect().width);
          f.push(document.querySelector("main").getBoundingClientRect().height);
          auxC.handleInput("Fit", f );
        });

        this.fullscreen = false;
          var fs= this.fullscreen;
          this.setFullscreen.addEventListener("click",function(){
          var elem = document.documentElement;
            if(fs==false){
              if (elem.requestFullscreen) {
                elem.requestFullscreen();
              } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
              } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
              }
            }else{
              if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
              }
            }
            fs=!fs;
          });
          if (document.addEventListener){
            document.addEventListener('fullscreenchange', exitHandler, false);
            document.addEventListener('mozfullscreenchange', exitHandler, false);
            document.addEventListener('MSFullscreenChange', exitHandler, false);
            document.addEventListener('webkitfullscreenchange', exitHandler, false);
          }
        function exitHandler(){
          var h= view.hide;
          switch(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement ){
            case !null:
              var f=[];
              f.push(window.screen.width);
              f.push(window.screen.height);
              auxC.handleInput("Fit", f );
              if(h==false){
                auxC.handleInput("Settings+Hide", null);
              }
              break;
            default:
              var f=[];
              f.push(600);
              f.push(600);
              auxC.handleInput("Fit", f );
              if(h==true){
                auxC.handleInput("Settings+Hide", null);}
              break;
              }
            }

  }

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  addDoubleSlider(){
    function getVals(){
      // Get slider values
      var parent = this.parentNode;
      var slides = parent.getElementsByTagName("input");
        var slide1 = parseFloat( slides[0].value );
        var slide2 = parseFloat( slides[1].value );
      // Neither slider will clip the other, so make sure we determine which is larger
      if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
      var displayElement = parent.getElementsByClassName("rangeValues")[0];
          displayElement.innerHTML = slide1 + " - " + slide2;
    }

    window.onload = function(){
      // Initialize Sliders
      var sliderSections = document.getElementsByClassName("range-slider");
          for( var x = 0; x < sliderSections.length; x++ ){
            var sliders = sliderSections[x].getElementsByTagName("input");
            for( var y = 0; y < sliders.length; y++ ){
              if( sliders[y].type ==="range" ){
                sliders[y].oninput = getVals;
                // Manually trigger event first time to display values
                sliders[y].oninput();
              }
            }
          }
    }
  }
  addInputNumberInteraction(){
    var speed = 140;
    this.occupied=false;
    var occupied=this.occupied;

    var eventInput = new Event('change', {
        bubbles: true,
        cancelable: true,
    });

    $('.change_value_up_down').each( function(i, obj){
        let my = $(this).offset().top;
        let counter;
        let down = false;
        $(this).mousedown(function() {
          if(occupied==false){
            occupied=true;
            down = true;
          }
        })
        $(document).mouseup(function() {
          down = false;
          occupied=false;
          clearInterval(counter);
        });

        $(this).mouseenter(function(e) {
          clearInterval(counter);
        })

        $(this).mouseout(function(e) {
          var current_value = $(this).val();
          var self = $(this);
          if(down) {
            if(e.clientY<my) {
               counter = setInterval(function(){
                  self.val(current_value++);
                  obj.dispatchEvent(eventInput);
               },speed);
            }else{
              counter = setInterval(function(){
                  self.val(current_value--);
                  obj.dispatchEvent(eventInput);
               },speed);
            }
          }
        });
        var lastScrollTop = 0;
        $(this).bind('mousewheel', function(e){
          var current_value = parseInt($(this).val() );
          var self = $(this);
          if(e.originalEvent.wheelDelta /60 > 0) { //originally 120
              self.val(current_value+1);
          }else{
              self.val(current_value-1);
          }
          obj.dispatchEvent(eventInput);
        });

    })

  }


  addListeners(){
    this.uploadButton= document.getElementById("uploadButton");
    this.webcamButton= document.getElementById("webcamButton");
    this.blankButton= document.getElementById("blankButton");

    this.columns= document.getElementById("columns");
    this.rows= document.getElementById("rows");
    this.cellW= document.getElementById("cellW");
    this.cellH= document.getElementById("cellH");
    this.squared= document.getElementById("keepSquare");
    this.showGrid= document.getElementById("showGrid");
    this.invertTile= document.getElementById("invertTile");
    this.notMixTile= document.getElementById("mixTile");

    this.imageW= document.getElementById("imageW");
    this.imageH= document.getElementById("imageH");

    this.tileC= document.getElementById("color-picker-tile");
    this.backgroundC= document.getElementById("color-picker-background");
    this.minSize= document.getElementById("minSize");
    this.maxSize= document.getElementById("maxSize");
    this.maxShade = document.getElementById("maxShadeSlider");

    this.imageW = document.getElementById("imageW");
    this.imageH = document.getElementById("imageH");
    this.selExport = "PNG";
    this.export = document.getElementById("exportButton");
    this.png = document.getElementById("exportPNG");
    this.pdf = document.getElementById("exportPDF");
    this.svg = document.getElementById("exportSVG");


    this.newbox = document.getElementById("newBox");
    this.textupdate = document.getElementById("textUpdate");
    this.textX = document.getElementById("textX");
    this.textY = document.getElementById("textY");

    this.brightness= document.getElementById("briSlider");
    this.contrast= document.getElementById("contSlider");
    this.bluriness= document.getElementById("bluSlider");
    this.noise= document.getElementById("noiSlider");
    this.resetFilters= document.getElementById("resetFilterButton");


    var auxC= this.controller;
    var auxG= this.generator;

    //--------------------------------------------------------------------------

    var li= this.lastImport;
    var saved=this.uploadButton;
    var modal = document.querySelector("#modalBoxUpload");
    this.counter=0;
    var c=this.counter;
    this.uploadButton.addEventListener('change', function() {
      li ="Upload";
      saved=this;
      if(c==0){
        auxC.handleInput("Input+Upload", saved);
        c++;
      }else{
        modal.style.display="flex";
      }

    });
    this.webcamButton.addEventListener("click",function(){
      li ="Webcam";
      if(c==0){
        auxC.handleInput("Input+Webcam", null);
        c++;
      }else{
        modal.style.display="flex";
      }
    });
    this.blankButton.addEventListener("click",function(){
      li ="Blank";
      if(c==0){
        var a=[];
        a.push(auxG.getColumns());
        a.push(auxG.getRows());
        auxC.handleInput("Input+Blank", a);
        c++;
      }else{
        modal.style.display="flex";
      }
    });

    function importChange(){
      if(li== "Upload"){
        auxC.handleInput("Input+Upload", saved);
      }else if(li== "Webcam"){
        auxC.handleInput("Input+Webcam", null);
      }else{
        var a=[];
        a.push(auxG.getColumns());
        a.push(auxG.getRows());
        auxC.handleInput("Input+Blank", a);
      }
      modal.style.display="none";
    }
    document.getElementById("maintain").addEventListener("click", function(){
      importChange();
    });
    document.getElementById("notmaintain").addEventListener("click", function(){
      auxC.handleInput("Reset+All", null);
      importChange();
    });
    document.getElementById("closemodal").addEventListener("click", function(){
      modal.style.display="none";
    });


    //--------------------------------------------------------------------------

    this.columns.addEventListener("change",function(){
      limitInput(this, 2,300);
      auxC.handleInput("Grid+Columns", parseInt(document.getElementById("columns").value));
    });
    this.rows.addEventListener("change",function(){
      limitInput(this, 2,300);
      auxC.handleInput("Grid+Rows", parseInt(document.getElementById("rows").value));
    });
    this.showGrid.addEventListener("change",function(){
      auxC.handleInput("Grid+ShowGrid", null);
    });


    function limitInput(input, min, max){
      if(!input.value){
        input.value= min;
      }else if(input.value!=null || input.value!=undefined  ){
        if(parseFloat(input.value) < min){
          input.value= min;
        }else if(parseFloat(input.value) > max ){
          input.value=max;
        }
      }
    }

    //--------------------------------------------------------------------------


    this.maxSize.addEventListener("input",function(){
        document.querySelector("#sizeInput").value= this.value/100;
      auxC.handleInput("Style+MaxSize", document.getElementById("maxSize").value);
    });
    this.maxValue= document.querySelector("#maxValue");
    this.maxValue.addEventListener("input",function(){
        document.querySelector("#valueInput").value= this.value/100;
      auxC.handleInput("Style+MaxValue", document.getElementById("maxValue").value/100);
    });
    this.invertTile.addEventListener("change",function(){ //change to check if its checked
      auxC.handleInput("Style+Invert", null);
    });
    this.notMixTile.addEventListener("change",function(){  //change to check if its checked
      auxC.handleInput("Style+Mix", null);
    });

    document.querySelector("#sizeInput").addEventListener("change", function(){
      limitInput(this, 0,3);
      document.querySelector("#maxSize").value= this.value*100;
      auxC.handleInput("Style+MaxSize", this.value*100);
    });

    document.querySelector("#valueInput").addEventListener("change", function(){
      limitInput(this, 0,1);
      document.querySelector("#maxValue").value= this.value*100;
      auxC.handleInput("Style+MaxValue", this.value);
    });

    //here

    this.intervals="";
    var c=this.intervals;

    function zoom(btn, action, start, speedup) {
      var t;
      var repeat = function () {
          action();
          t = setTimeout(repeat, start);
          start = start / speedup;
      }
      btn.addEventListener("mousedown",function(){ clearTimeout(t); repeat(); });
      btn.addEventListener("mouseup",function(){ clearTimeout(t); });
    };
    function zI(){auxC.handleInput("ZoomIn", null);}
    function zO(){auxC.handleInput("ZoomOut", null);}
    zoom(this.zoomin, zI, 20,2);
    zoom(this.zoomout, zO, 20,2);

    document.querySelector('main').addEventListener('wheel', function (e) {
        var dir;
        dir = (e.deltaY > 0) ? 0.1 : -0.1;
        if(dir== 0.1){
          zO();
        }else{
          zI();
        }
        e.preventDefault();
        e.stopPropagation();
        return;
    });

    //--------------------------------------------------------------------------FILTERS
    this.brightness.addEventListener("input",function(){
      var m= parseInt(map(this.value, 0, 300, -100, 100, ));
      document.querySelector("#briInput").value= m;
      auxC.handleInput("Filter+Brightness", document.getElementById("briSlider").value);
    });
    this.contrast.addEventListener("input",function(){
      var m= parseInt(map(this.value, 0, 300, -100, 100, ));
      document.querySelector("#contInput").value= m;
      auxC.handleInput("Filter+Contrast", document.getElementById("contSlider").value);
    });
    this.bluriness.addEventListener("input",function(){
      var m= parseInt(map(this.value, 0, 300, -100, 100, ));
      document.querySelector("#bluInput").value= m;
      auxC.handleInput("Filter+Blurriness", document.getElementById("bluSlider").value);
    });
    this.resetFilters.addEventListener("click",function(){
      var m= map(this.value, 0, 300, -100, 100, );
      auxC.handleInput("Filter+FilterReset", null);
    });

    document.querySelector("#briInput").addEventListener("change", function(){
      limitInput(this, -100,100);
      var t= parseInt(this.value);
      var m= map(t, -100, 100, 0, 300,);
      document.querySelector("#briSlider").value= m;
      auxC.handleInput("Filter+Brightness", m);
    });
    document.querySelector("#contInput").addEventListener("change", function(){
      limitInput(this, -100,100);
      var m= map(this.value, -100, 100, 0, 300,);
      document.querySelector("#contSlider").value=m;
      auxC.handleInput("Filter+Contrast", m);
    });
    document.querySelector("#bluInput").addEventListener("change", function(){
      limitInput(this, -100,100);
      var m= map(this.value, -100, 100, 0, 300,);
      document.querySelector("#bluSlider").value=m;
      auxC.handleInput("Filter+Blurriness", m);
    });




  //----------------------------------------------------------------------------EXPORT
    this.export.addEventListener("click",function(){
      auxC.handleInput("Export+Export", null);
    });



    $('input[type=radio][name=exportFile]').change(function() {
      auxC.handleInput("Export+File", this.value);
      if(this.value!= 'PDF'){
        document.getElementById('proportionSettings').style.opacity="1";
        document.getElementById('proportionSettings').style.pointerEvents = "auto";
      }
    });

    var t= this;
    $('input[type=radio][name=exportFormat]').change(function() {
      var i= document.getElementById("imageExpCont");
      var v= document.getElementById("videoExpCont");
      var vS= document.getElementById("motionSettings");


      if(this.value == "Image" && t.generator.getExportFormat() != "Image"){
        i.style.display = "flex";
        v.style.display = "none";
        vS.style.display = "none";
        document.getElementById('oriSettings').style.opacity="1";
        document.getElementById('oriSettings').style.pointerEvents = "auto";
        auxC.handleInput("Export+File", "PNG");
      }else if(this.value == "Video" && t.generator.getExportFormat() != "Video"){
        v.style.display = "flex";
        vS.style.display = "block";
        i.style.display = "none";
        auxC.handleInput("Export+File", "MP4");
        document.getElementById('proportionSettings').style.opacity="1";
        document.getElementById('proportionSettings').style.pointerEvents = "auto";
      }
    });

    $('#oripdf').change(function() {
      auxC.handleInput("Export+Orientation", this.value);
    });

    document.getElementById('proportionSettings').style.opacity="1";
    document.getElementById('proportionSettings').style.pointerEvents = "auto";
    document.getElementById('oriSettings').style.opacity="0.4";
    document.getElementById('oriSettings').style.pointerEvents = "none";

    $('#formatpdf').change(function() {
      auxC.handleInput("Export+Format", this.value);
      if(this.value!='custom'){
        document.getElementById('proportionSettings').style.opacity="0.4";
        document.getElementById('proportionSettings').style.pointerEvents = "none";
        document.getElementById('oriSettings').style.opacity="1";
        document.getElementById('oriSettings').style.pointerEvents = "auto";
      }else{
        document.getElementById('proportionSettings').style.opacity="1";
        document.getElementById('proportionSettings').style.pointerEvents = "auto";
        document.getElementById('oriSettings').style.opacity="0.4";
        document.getElementById('oriSettings').style.pointerEvents = "none";
      }
    });


    $('#unitspdf').change(function() {
      auxC.handleInput("Export+Units", this.value);
    });

    this.imageW.addEventListener("change",function(){
      limitInput(this, 10 , 10000);
      auxC.handleInput("Export+ImageW", document.getElementById("imageW").value);
    });

    this.imageH.addEventListener("change",function(){
      limitInput(this, 10 , 10000);
      auxC.handleInput("Export+ImageH", document.getElementById("imageH").value);
    });

    function limitInput(input, min, max){
      if(!input.value){
        input.value= min;
      }else if(input.value!=null || input.value!=undefined  ){
        if(parseFloat(input.value) < min){
          input.value= min;
        }else if(parseFloat(input.value) > max ){
          input.value=max;
        }
      }
    }

    var stop= document.querySelector("#stopRecording");
    var stopBubble= document.querySelector("#stopRecording2");
    var start= document.querySelector("#startRecording");
    stop.addEventListener("click", function(){
      auxC.handleInput("Export+StopRecording", null);
    });
    stopBubble.addEventListener("click", function(){
      auxC.handleInput("Export+StopRecording", null);
    });
    start.addEventListener("click", function(){
      auxC.handleInput("Export+StartRecording", null);
    });
  }


  //---------------------------------------------------------------------------- TILE LIST
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  addTileList(){
    var tileList= new TileList();
    var list= tileList.getAllSubclasses();
    var tileListContainer = document.getElementById('tileListContainer');

    function returnTile(i){
      return list[i];
    };


    for(var i=0; i<list.length; i++){
      let img= document.createElement('div');
      var auxP= Raphael(img,18,18);

      (i!=0) ? img.classList.add("tileListInd") : img.classList.add("tileListIndSelected")

      //do the giff and append it
      tileListContainer.appendChild(img);
      let e= returnTile(i);
      let auxT= new e();
      auxT.getAnimationBackground(auxP,0,0, 18,18, this.generator.getBackgroundCol());
      auxT.getAnimation(img, auxP,0,0, 18,18, 0.75, this.generator.getTileCol(), this.generator.getBackgroundCol());
      this.shapesAnim.push(auxT);

      img.setAttribute('id',e.name); //changed here

      var auxC= this.controller;
      var auxN= document.getElementById("mixTile");

      img.addEventListener("click", function(){
        if(auxN.checked){
          var all= document.querySelectorAll(".tileListIndSelected");
          for(var i=0; i<all.length; i++){
              all[i].classList.remove("tileListIndSelected");
              all[i].classList.add("tileListInd");
          }
        }
        if(document.getElementsByClassName('tileListIndSelected').length !=1 || document.getElementsByClassName('tileListIndSelected')[0]!=img){    // FIX ?
          img.classList.toggle("tileListInd");
          img.classList.toggle("tileListIndSelected");
          auxC.handleInput("Style+Tile", e);

        }
      });
    }

    document.querySelector("#resetTiles").addEventListener("click", function(){
      auxC.handleInput("Reset+Tiles", null);
    });
    document.querySelector("#randomize").addEventListener("click", function(){
      auxC.handleInput("Reset+Randomize", null);
    });
  }

  addTileRotation(){
    var auxC= this.controller;
    var rotate= document.getElementById("rotateTile");

    rotate.addEventListener("change", function(){
      auxC.handleInput("Style+Rotate", this.checked);
      if(this.checked){
        document.querySelector(".smallradio").style.opacity=1;
      }else{
        document.querySelector(".smallradio").style.opacity=0.3;
      }
    });
    $('input[type=radio][name=rotation]').change(function() {
      auxC.handleInput("Style+Rotate"+this.value);
    });
  }

  //---------------------------------------------------------------------------- TEXT SETUP
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  addTextSetup(){
    var auxC= this.controller;
    var sel= document.getElementById("fonts"); //list of existing fonts
    var fvalues= this.generator.getFontList();

    var textX= document.getElementById("textX");
    var textY= document.getElementById("textY");
    var textSiz= document.getElementById("textSiz");
    var textLineHeight= document.getElementById("textLineHeight");

    var kerning= document.getElementById("textKerning");

    sel.addEventListener("change", function(){
      auxC.handleInput("Text+Font", sel.value );
    });

    var counter=0;
    var n= this.generator.fontreader.n;
  //-----------------------------------------------------
    for(var i of Object.entries(fvalues)){
      var name= n[counter]; counter++;//var name = i[1].name;
      var value = i[0];
      var opt = document.createElement('option');
      opt.appendChild( document.createTextNode(name) );
      opt.value = value;
      sel.appendChild(opt);
    }

  //-----------------------------------------------------

    var addText = document.getElementById("addText");
    this.ids=0;
    var ids=this.ids;
    addText.addEventListener("click", function(){
      let newTB = document.createElement('div');      //container
      newTB.className = "textbox";

      let input = document.createElement("input");    //text field
      input.setAttribute('type', 'text');
      input.placeholder="Write Here";

      let deleteTB = document.createElement("div");    //text field
      deleteTB.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>';
      deleteTB.classList.add("deleteTB");
      newTB.appendChild(input);
      newTB.appendChild(deleteTB);                       //append it to the group
      document.getElementById("textboxGroup").appendChild(newTB);

      let id=ids;

      newTB.setAttribute("id",id);                       //append it to the group
      ids++;
      let obj= new TextBox("New Box", sel.value, 2, 2, 1, 1, 1, id);

      deleteTB.addEventListener("click", function(){
        var g = this.parentNode.id;
        auxC.handleInput("Text+Delete",g );
      });
      auxC.handleInput("Text+Add", obj);
      newTB.addEventListener("click", function(){
        auxC.handleInput("Text+Select", newTB.id );
      });
      input.addEventListener("input", function(){
        auxC.handleInput("Text+String", input.value);
      });

    });


    //-----------------------------------------------------

    textX.addEventListener("change", function(){
      auxC.handleInput("Text+PosX", parseInt(textX.value));
    });
    textY.addEventListener("change", function(){
      auxC.handleInput("Text+PosY", parseInt(textY.value));
    });
    textSiz.addEventListener("change", function(){
      auxC.handleInput("Text+Size", parseInt(parseInt(textSiz.value)));
    });

    textKerning.addEventListener("change", function(){
      auxC.handleInput("Text+Kerning", parseInt(textKerning.value));
    });
    textLineHeight.addEventListener("change", function(){
      auxC.handleInput("Text+LineHeight", parseInt(textLineHeight.value));
    });

    $('input[type=radio][name=align]').change(function() {
      auxC.handleInput("Text+Align",this.value);
    });
  }


  //----------------------------------------------------------

  addDrawerListeners(){
    function limitInput(input, min, max){
      if(!input.value){ input.value= min;
      }else if(input.value!=null || input.value!=undefined  ){
        if(parseFloat(input.value) < min){ input.value= min;
        }else if(parseFloat(input.value) > max ){ input.value=max;
        }
      }
    }

    this.pencil= document.getElementById("pencil");
    this.eraser= document.getElementById("eraser");
    this.eraseDraw= document.getElementById("eraseDraw");

    this.brushSize= document.getElementById("brushSize");
    this.brushHard= document.getElementById("brushHard");
    this.brushShade= document.getElementById("brushShade");
    var auxC= this.controller;

    this.pencil.addEventListener("click",function(){
      auxC.handleInput("Draw+Pencil", null);
    });
    this.eraser.addEventListener("click",function(){
      auxC.handleInput("Draw+Eraser", null);
    });
    this.eraseDraw.addEventListener("click",function(){
      auxC.handleInput("Draw+EraseDraw", null);
    });
    this.brushSize.addEventListener("input",function(){
      document.querySelector("#brushSizeInput").value= this.value;
      auxC.handleInput("Draw+BrushSize", this.value);
    });

    this.brushShade.addEventListener("input",function(){
      document.querySelector("#lightInput").value= this.value;
      auxC.handleInput("Draw+BrushShade", this.value);
    });
    document.querySelector("#brushSizeInput").addEventListener("change", function(){
      limitInput(this,1,8);
      document.querySelector("#brushSize").value= this.value;
      auxC.handleInput("Draw+BrushSize", this.value);
    });
    document.querySelector("#lightInput").addEventListener("change", function(){
      limitInput(this,0,100);
      document.querySelector("#brushShade").value= this.value;
      auxC.handleInput("Draw+BrushShade", this.value);
    });
  }


  //---------------------------------------------------------------------------- MENU AND DISPLAYS
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------


  display(){
    this.generator.generate();
  }
  getGenerator(){
    return this.generator;
  }


  hideMenus(e){
    function fadeBottom(){
        document.querySelector('#bottomcontainer').classList.remove('bottomcontainer');
        document.querySelector('#bottomcontainer').classList.add('bottomcontainerFade');
    }
    function nofadeBottom(){
        document.querySelector('#bottomcontainer').classList.add('bottomcontainer');
        document.querySelector('#bottomcontainer').classList.remove('bottomcontainerFade');
    }

    if(this.hide==false){
      document.querySelector("#sidebar").style.left="calc(-1 * var(--sidebar-width))";
      document.querySelector("#topbar").style.top="calc(-1 * var(--top-height))";
      document.querySelector('main').style.left ="0px";
      document.querySelector('main').style.top ="0px";
      document.querySelector('main').style.maxHeight ="100%";
      document.querySelector('main').style.height ="100%";
      document.querySelector('main').style.maxWidth ="100%";
      fadeBottom();
    }else{
      document.querySelector("#sidebar").style.left="0rem";
      document.querySelector("#topbar").style.top="0rem";
      document.querySelector('main').style.left ="var(--sidebar-width)";
      document.querySelector('main').style.top = "var(--top-height)";;

      document.querySelector('main').style.maxHeight = str("calc(100% - var(--top-height))");
      document.querySelector('main').style.maxWidth = str("calc(100% - var(--sidebar-width))");
      nofadeBottom();
    }
    this.hide=!this.hide;
  }

  //---------------------------------------------------------------------------- VIEW CHANGES FUNCTIONS
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  changeColorTileList(c){
    for(var i=0; i< this.shapesAnim.length; i++){
      //this.shapesAnim[i].changeAnimColors(c);
      this.shapesAnim[i].changeAnimColors(0,0, 18,18, 0.75, c, this.generator.getBackgroundCol());
    }
  }
  changeColorTileBList(c){
    for(var i=0; i< this.shapesAnim.length; i++){
      //this.shapesAnim[i].changeAnimColorsB(c);
      this.shapesAnim[i].changeAnimColorsB(0,0, 18,18, 0.75, this.generator.getTileCol(), c);
    }
  }

  startLoading(){
    this.loading=true;
    document.getElementsByClassName("progressLoading")[0].style.display="block";
  //  document.getElementsByClassName("separator")[0].style.display="block";
  //  document.querySelector("#sepTiles").animation="rotateSep 3s infinite";
    //
  }
  stopLoading(){
    this.loading=false;
    document.getElementsByClassName("progressLoading")[0].style.display="none";
  /*  var c = setTimeout(function(){
      //
      document.getElementsByClassName("separator")[0].style.display="none";
      document.querySelector("#sepTiles").animation="";
    }, 500); */

  }
  //---------------------------------------------------------------------------- UPDATE
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  update(e){
    if(document.title== "Digitiles"){
      switch(e){
        case "EndUpload":
          let g=[];
          g.push(document.querySelector("main").getBoundingClientRect().width);
          g.push(document.querySelector("main").getBoundingClientRect().height);
          this.generator.setFitScreenMargin(g);
          this.uploadButton.value = '';
          this.display();
          break;
        case "Update":
          //this.display();
          break;

        case "Grid":
          document.getElementById("columns").value = this.generator.getColumns();
          document.getElementById("rows").value = this.generator.getRows();

          document.getElementById("imageW").value = parseInt(this.generator.getWidth());
          document.getElementById("imageH").value = parseInt(this.generator.getHeight());
          break;


        case "Draw":
          changeDrawBrush(this);
          function changeDrawBrush(e){
            var brush = document.getElementsByClassName("brush");
            for(var i=0; i< brush.length; i++){
              if(brush[i].id== e.generator.getBrush()){
                brush[i].classList.add("BSS");
              }else{
                brush[i].classList.remove("BSS");
              }
            }
          }
          break;


        case "Rotate":
          if(this.generator.rotate==false){

          }else{

          }
          break;
        case "Export+StopRecording":
          document.querySelector('#RL').style.opacity="1";
          document.querySelector('#RL').style.pointerEvents="auto";
          document.querySelector('#SRL').style.opacity="0.5";
          document.querySelector('#SRL').style.pointerEvents="none";

          document.querySelector('#RS').style.display="block"; //record saved shows up
          document.querySelector('#RB').style.display="none";
          break;
        case "Export+Recording":
          document.querySelector('#SRL').style.opacity="1";
          document.querySelector('#SRL').style.pointerEvents="auto";
          document.querySelector('#RL').style.opacity="0.5";
          document.querySelector('#RL').style.pointerEvents="none";

          document.querySelector('#RS').style.display="none"; //record saved shows up
          document.querySelector('#RB').style.display="block";
          break;
        case "Export":
          document.getElementById("imageW").value = this.generator.getExportW();
          document.getElementById("imageH").value = this.generator.getExportH();
          var pdfSettings= document.getElementById("pdfSettings");
          var f = this.generator.getExportType();
          var aux;
          function exportButtonsSwitch(f){
            var e= document.querySelector('.buttonSelected');
            $('input[type=radio][name=exportFile]').each(function() {
              if(this.value != f){
                $(this).prev('label').removeClass('BSS');

              }else{
                $(this).prev('label').addClass('BSS');
                aux=this.value;
              }
            });

            if( aux=="PDF"){
              pdfSettings.style.display="block";
            }else{
              pdfSettings.style.display="none";
            }
            if(aux!= "GIF" && aux!="MP4"){
                document.querySelector('#RS').style.display="none"; //record saved shows up
            }
          }
          var h = this.generator.getExportFormat();
          $('input[type=radio][name=exportFormat]').each(function() {
            if(this.value != h){
              $(this).prev('label').removeClass('BSS');

            }else{
              $(this).prev('label').addClass('BSS');
              aux=this.value;
            }
          });
          exportButtonsSwitch(this.generator.getExportType());

          break;
        case "Update":
          //this.display();
          break;
        case "Tiles":
          this.tileListReset();
          break;
        case "Text":
          if(this.generator.hasTextBoxes() && this.generator.hasSelected()){
            changeSelect(this);
            document.getElementById("textX").value = this.generator.getTextBox("PosX");
            document.getElementById("textY").value = this.generator.getTextBox("PosY");
            document.getElementById("textSiz").value = this.generator.getTextBox("Size");
            document.getElementById("textKerning").value = this.generator.getTextBox("Kerning");
            document.getElementById("fonts").value = this.generator.getTextBox("Font");
            document.getElementById("textLineHeight").value = this.generator.getTextBox("LineHeight");
            //document.getElementById("textFont").value = this.generator.getTextBox("Font");
            if(this.generator.getSelected()!=undefined){
              changeAlign(this);
            }

            function changeSelect(e){
              if(e.generator.getSelected()!=undefined ){
                var list= document.getElementsByClassName("textbox");
                for(var i=0; i<list.length;i++){
                  if(list[i].id == e.generator.getSelected().getId()){
                    list[i].classList.remove("NTBS");
                    list[i].classList.add("TBS");
                  }else{
                    list[i].classList.remove("TBS");
                    list[i].classList.add("NTBS");
                  }
                }
              }
            }
            function changeAlign(e){
              var aligns = document.getElementsByClassName("align");
              $('input[type=radio][name=align]').each(function(index) {
                if(e.generator.getAlign() == this.value){
                  aligns[index].classList.add("AS");
                }else{
                  aligns[index].classList.remove("AS");
                }
              });
            }
          }
          break;

        case "TextDelete":
          var list= document.getElementsByClassName("textbox");
          for(var i=0; i< list.length ;i++){

            if(list[i].id == this.generator.getTextBoxIdDeleted()){
              list[i].remove();
            }
          }
          changeSelect(this);
          function changeSelect(e){
            if(e.generator.getSelected()!=undefined ){
              var list= document.getElementsByClassName("textbox");
              for(var i=0; i<list.length;i++){
                if(list[i].id == e.generator.getSelected().getId()){
                  list[i].classList.remove("NTBS");
                  list[i].classList.add("TBS");
                }else{
                  list[i].classList.remove("TBS");
                  list[i].classList.add("NTBS");
                }
              }
            }
          }
          break;

          case "FilterReset":
            this.filterReset();
            this.textReset();
            break;
          case "Reset":
            this.filterReset();
            this.textReset();
            this.tilesReset();
            this.tileListReset();
            break;
          case "ResetTiles":
            this.tilesReset();
            this.tileListReset();
            break;
      }
    }


  }


  filterReset(){
    document.getElementById("briSlider").value=150;
    document.getElementById("contSlider").value=150;
    document.getElementById("bluSlider").value=150;
    document.getElementById("invertTile").checked = false;

    document.getElementById("briInput").value=0;
    document.getElementById("contInput").value=0;
    document.getElementById("bluInput").value=0;
  }

  textReset(){
    var tb= document.querySelectorAll(".textbox");
    tb.forEach(element => element.remove());
  }

  tilesReset(){
    $("#color-picker-tile").spectrum("set", this.generator.getTileCol());
    $("#color-picker-background").spectrum("set", this.generator.getBackgroundCol());
    this.changeColorTileList(this.generator.getTileCol());
    this.changeColorTileBList(this.generator.getBackgroundCol());
    document.getElementById("mixTile").value=this.generator.getBackgroundCol();

    document.querySelector("#sizeInput").value= 1;
    document.querySelector("#maxSize").value= 100;

    document.querySelector("#valueInput").value= 1;
    document.querySelector("#valueSize").value= 100;
  }
  tileListReset(){
    var groupsel = document.getElementById('tileListContainer').getElementsByTagName("div");
    for (const el of groupsel) {
      el.classList.add("tileListInd");
      el.classList.remove("tileListIndSelected");
    }
    var grouphtml = document.getElementsByClassName('tileListInd');
    var group = this.generator.getTileGroup();
    for(var i=0; i<grouphtml.length; i++){
      for(var j=0; j< group.length; j++){
        if(grouphtml[i].id != undefined && group[j].constructor.name == grouphtml[i].id){
          grouphtml[i].classList.add("tileListIndSelected");
          grouphtml[i].classList.remove("tileListInd");

        }
      }
    }
  }

}
