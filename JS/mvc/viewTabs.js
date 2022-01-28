class ViewTabs{
  constructor(){


    this.curr=0;
    this.visited = sessionStorage.getItem('visited');

    if(this.visited ){

    }else if(document.location.pathname.split("/").pop() != "create.html" && document.location.pathname.split("/").pop() != "about.html"){
      document.title="Welcome to Digitiles";
      sessionStorage.setItem('visited', 'true');
      window.history.pushState('page' + 3, "Welcome to Digitiles", "home.html");
    }




    if(/^((?!chrome|android).)*safari/i.test(navigator.userAgent) == true){
    //if(true){
      var t=this;
      $("#mainContent").load("content/notavailable.html", function(){
        t.outSeparator();
      });
    }else{
      this.manageTabs();
    }

  }

  manageTabs(){
    var t=this;
      switch(document.title){
        case "Digitiles":
          $('#topbar').load("content/topbar.html", function(){
            t.addTopbarInt(t);

            $("#mainContent").load("content/create.html", function(){
              t.switchToApp();
              t.create.classList.add("tbSelected");
              t.about.classList.remove("tbSelected2");

              t.clickListeners();
              t.addTopbarInt(t);
              t.outSeparator();
            });
          });

          break;
        case "Welcome to Digitiles":
          $('#topbar').load("content/topbarHome.html", function(){

            t.addTopbarInt(t);
              $("#mainContent").load("content/home.html", function(){
                t.switchToHome();
                t.addTopbarInt(t);
                t.create.classList.remove("tbSelected");
                t.about.classList.remove("tbSelected2");

                t.clickListeners();
                t.outSeparator();
              });
            });
          break;

        case "About":
          $('#topbar').load("content/topbarHome.html", function(){
            t.addTopbarInt(t);
            $("#mainContent").load("content/about.html", function(){
              t.switchToAbout();
              t.addTopbarInt(t);
              t.create.classList.remove("tbSelected");
              t.about.classList.add("tbSelected2");

              t.clickListeners();
              t.outSeparator();
            });
          });
          break;
      }

  }




  manageNav(){
    var t=this;

      switch(document.title){
        case "Digitiles":
          $('#topbar').load("content/topbar.html", function(){
            t.clickListeners();
            t.addTopbarInt(t);
            t.switchToApp();
            t.create.classList.add("tbSelected");
            t.about.classList.remove("tbSelected");

            t.outSeparator();
          });
          break;
        case "Welcome to Digitiles":
          $('#topbar').load("content/topbarHome.html", function(){
            t.clickListeners();
            t.addTopbarInt(t);
            t.switchToHome();
            t.create.classList.remove("tbSelected");
            t.about.classList.remove("tbSelected");

            t.outSeparator();
          });
          break;
        case "About":

          $('#topbar').load("content/topbarHome.html", function(){
            t.clickListeners();
            t.addTopbarInt(t);
            t.switchToAbout();
            t.create.classList.remove("tbSelected");
            t.about.classList.add("tbSelected");

            t.outSeparator();
          });
          break;
      }

  }



  clickListeners(){
    var t=this;
    this.create.addEventListener("click", function(){
      t.about.classList.remove("tbSelected2");
      t.create.classList.add("tbSelected");
    });

    this.about.addEventListener("click", function(){
      t.create.classList.remove("tbSelected");
      t.about.classList.add("tbSelected2");
    });

    $(".aTop").click(
      function (evt){
         event.preventDefault();
        return false;
      }
    );
  }


  setCanvas(){
    cnv= createCanvas(0, 0);
    cnv.id('myCanvas');
    var cont = document.createElement("div");
    cont.id='mainInside';
    document.getElementsByTagName('main')[0].appendChild(cont);
    document.getElementById('mainInside').appendChild(document.getElementById('myCanvas'));
  }






  switchToHome(){
    this.setCanvas();
    document.getElementById('mainInside').style.animation= "faceAppear 4s";
    document.getElementById('topbar').style.animation= "waitFor 3s 0s, faceAppear 2s 3s";

    cnv= createCanvas(windowWidth, windowHeight);
    function gen(){generator = new Generator(160);}
    function vie(){ view = new View(generator);}

    document.getElementById('mainInside').appendChild(document.getElementById('myCanvas'));
    var t= this;

    let vid = document.getElementById("VideoLoads");
        vid.src= "assets/placeholders/wings.mp4";
        vid.onloadstart = function() {

          async function runInOrder(vid){

            await gen();
            await vie();
            await view.startHome();
            await view.controller.handleInput("Input+LocalVideo", vid);
            await view.controller.handleInput("Style+TileC", '#bababa');
            await view.display();
            await view.controller.handleInput("Style+Mix", '');
          }
          runInOrder(vid);

          document.getElementsByTagName('main')[0].id="mainHome";

          document.body.onkeyup = function(e){
              if(e.keyCode == 32){
                  var x= t.getRandom();

                  view.controller.handleInput("Style+Tile", x);
              }
          }
        }


  }


  switchToApp(){
    document.body.onkeyup = null;
    this.setCanvas();
    document.getElementById('mainInside').style.animation= "growPixel 4s";

    function gen(){generator = new Generator();}
    function vie(){ view = new View(generator);}


    document.getElementsByTagName('main')[0].appendChild(document.getElementById('RB'));
    document.querySelector("#mainContent").appendChild(document.getElementsByTagName('main')[0]);

    async function runInOrder(){
      await gen();
      await vie();
      await view.controller.handleInput("Input+LocalImage", "assets/placeholders/place3.jpg");
      await view.display();
      await view.startApp();
    }
    runInOrder();
    document.getElementsByTagName('main')[0].id="";


  }




  switchToAbout(){
    document.body.onkeyup = null;
  }




  addHyper(clickables, pageNumber, pageName, pageURL, contentURL){

      function getBaseUrl() {
          var re = new RegExp(/^.*\//);
          return re.exec(window.location.href);
      }
      var t=this;

      clickables.forEach(function(element){

        if (element.getAttribute('listener') !== 'true') {
          element.addEventListener("click", function(){
            t.triggerSeparator();

            var s= setTimeout(function(){
              var vala= getBaseUrl();

              window.history.pushState('page' + pageNumber, pageName,  vala + pageURL);
              localStorage.setItem("response",  vala + pageURL);

              setTimeout(function(){
                $("#mainContent").load(contentURL, function(){
                  t.manageNav();
                  setTimeout(function(){

                  },  600);
                });
              },300);

            },500);
          });
          element.setAttribute('listener', 'true');
        }
      });



      window.onpopstate = function (event) {
        let state = event.state;
              if (state === null) {
                  state = { value: 1 };
              }
              //triggerSeparator();
              t.triggerSeparator();
              var s= setTimeout(function(){
                var pageName= "";

                var contentURL= document.location.pathname.split("/").pop();
                
                if(contentURL.length==0){contentURL= "create.html"}
                contentURL = "content/" + contentURL;

                setTimeout(function(){

                  $("#mainContent").load(contentURL, function(){
                    t.manageNav();

                  });
                },300);
              }, 500);


      }


  }



  addHyps(){
    var t=this;
    $('#topbar').load("content/topbar.html", function(){
      t.addTopbarInt(t);
      t.manageTabs();
    });
  }


  addTopbarInt(t){


    var aboutHyp= document.querySelectorAll(".aboutHyp");
    var homeHyp= document.querySelectorAll(".homeHyp");
    var worksHyp= document.querySelectorAll(".createHyp");
    t.addHyper(homeHyp, 3, 'Welcome to Digitiles', 'home.html', 'content/home.html');
    t.addHyper(aboutHyp, 4, 'About', 'about.html', 'content/about.html');
    t.addHyper(worksHyp, 2, 'Digitiles', 'create.html', 'content/create.html');

    t.create = document.querySelector("#create");
    t.about = document.querySelector("#about");


  }




  triggerSeparator(){

    $(".separator").fadeIn(500);
  }

  outSeparator(){

    var timeoutID = setTimeout(function(){
      var sep = document.querySelector(".separator")[0];
      $(".separator").fadeOut(400);
      document.querySelector("#sepTiles").animation="";
    },800);



  }

  getRandom(){

    var list= listTiles.getAllSubclasses();
    var x= int(Math.random() * list.length);

    while(x== this.curr){
      var x= int(Math.random() * list.length);
    }
    this.curr=x;
    return list[x];
  }

}
