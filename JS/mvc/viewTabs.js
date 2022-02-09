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

    window.mobileCheck = function() {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    function checkForInp(){
      if(window.mobileCheck() == true){
        view.controller.handleInput("Input+LocalImage", "assets/placeholders/place3.jpg");
      }else{
        view.controller.handleInput("Input+LocalVideo", vid);
      }
    }

    this.setCanvas();
    document.getElementById('mainInside').style.animation= "faceAppear 4s";
    document.getElementById('topbar').style.animation= "waitFor 3s 0s, faceAppear 2s 3s";

    cnv= createCanvas(windowWidth, windowHeight);
    function gen(){generator = new Generator(140);}
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
            await checkForInp();
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
