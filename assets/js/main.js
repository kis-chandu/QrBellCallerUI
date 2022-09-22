const my_number = Math.floor(Math.random()*1000);
const peer = new Peer(my_number);
/*const peer = new Peer(my_number,{
    host:"localhost",
    port:9000,
    path:"/myapp"
});*/
//var navigator = navigator.getUserMedia()
var navigator = navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
var mystream;
var mycall;

/*Original
peer.on("open",(id)=>{
    $("#my_id").html(id);
    let scope = {audio:true, video:true};
    navigator.mediaDevices.getUserMedia(scope).then((stream)=>{
        let video = document.getElementById("my_local_video");
        mystream = stream;
        if("srcObject" in video){
            video.srcObject = stream;
        }else{
            video.src = URL.createObjectURL(stream);
        }
    }).catch((err)=>{
    })
})*/


peer.on("open",(id)=>{
console.log("peer.on(OPEN) called");

/*
console.log("####"+window.location.search);
if(window.location.search){

  const urlParams = new URLSearchParams(window.location.search);
  console.log("#### "+urlParams);
  $("#peer_id").html(urlParams.get('firstname'));
}
*/


    $("#my_id").html(id);
    let scope = {audio:true, video:true};
    navigator.mediaDevices.getUserMedia(scope).then((stream)=>{
        let video = document.getElementById("my_local_video");
        mystream = stream;
        if("srcObject" in video){
            video.srcObject = stream;
        }else{
            video.src = URL.createObjectURL(stream);
        }
        call();
    }).catch((err)=>{
    })
    //call();
})

/*peer.on("call",(call)=>{
console.log("peer.on(call) called");
    $("#call_notification_popup").modal("show");
    mycall = call;
})*/

/*function answer(){
console.log("answer() called");
    if(mycall){
        mycall.answer(mystream);
        mycall.on("stream",connectCall);
        $("#call_notification_popup").modal("hide");
    }
}*/

/*Original
function call(){
    let pnumber = $("#peer_id").val();
    if(pnumber==''){
        alert("Please fill peer number");
        return;
    }
    let micall = peer.call(pnumber,mystream);
    micall.on("stream",connectCall)
}*/

function call(){
console.log("call() called");

  const urlParams = new URLSearchParams(window.location.search);
  console.log("#### "+urlParams);
  let pnumber = urlParams.get('ownerId');

    //let pnumber = $("#peer_id").val();
    if(pnumber==''){
        alert("Please fill peer number");
        return;
    }
    let micall = peer.call(pnumber,mystream);
    micall.on("stream",connectCall);
}

function connectCall(remoteStream){
console.log("connectCall() called");
    $("#my_local_video").removeClass("before_call").addClass("after_call");
    $("#my_remote_video").removeClass("after_call").addClass("before_call");
    let video = document.getElementById("my_remote_video");
    if("srcObject" in video){
        video.srcObject = remoteStream;
    }else{
        video.src = URL.createObjectURL(remoteStream);
    }
}




