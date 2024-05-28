
var x=[{name:"shimaa", ismarried:true,id:1},
{name:"ahmed", ismarried:false,id:2},
{name:"baker", ismarried:true ,id:3}]


for(var person of x){
    // console.log(person)
}
// فلتر غالبا بتاخد مني فنكشن 
// بتلف ع كل عنصر من عناصر الاريه الفلتر
// فعشان بتلف ع كل عنصر من عناصر الاريه فلو دخلت 
// براميتر فهو بيعبر عن الاشي الي بيلف عليه وهيا ديربالك اريه ميثود
var filterPerson=x.filter(function(person){
  return person.ismarried ==true
})
// هيك بترجعلي اريه جديده 
// console.log(filterPerson)


// برضو ميثود للاريه بتاخد بداخلها فنكشن 

var findIndex=x.findIndex(function(user){
    return user.id== 3
})
// رجعلي الاندكس تبع الاوبجكت الاي دي بتاعه تلاته 
// console.log(findIndex)

var taskInputBtn  = document.getElementById("taskInput");
var todoAddButton = document.getElementById("todo-button");
var todosContainer = document.getElementById("todos-container");
var mySelect  = document.getElementById("mySelect");
var searchInput=document.getElementById("searchInput");



var allTodos = []
if(localStorage.getItem('allTodos') !=null){
    allTodos=JSON.parse(localStorage.getItem('allTodos'));
    displayData(allTodos)
    
}else{
    allTodos=[]
}
todoAddButton.addEventListener("click",function(){
    var task={
        taskDetails:taskInputBtn.value,
        isCompleted:false,
        id:`${Math.random()*10000} - ${Math.random()*10000}`

    }
    allTodos.push(task);
    localStorage.setItem('allTodos',JSON.stringify(allTodos))
    displayData(allTodos);
    clear()



})

function displayData(arr){
    var cartoona="";
    for(var task of arr){
           cartoona+=`<div class="col-11 todo ${task.isCompleted==true? "completed":""}">
           <div class="row bg-dark">
             <div class="col-8  py-3 fs-5">${task.taskDetails}</div>
             <div class="col-2  py-3 bg-success d-flex justify-content-center"><i class="fa-solid fa-check fs-3  d-flex align-items-center" onclick="beCompleted('${task.id}')"></i></div>
             <div class="col-2  py-3 bg-danger d-flex justify-content-center"><i class="fa-solid fa-trash fs-3  d-flex align-items-center" onclick="deltedTodo('${task.id}')"></i></div>
           </div>
         </div>`
         console.log(cartoona)
    }

    todosContainer.innerHTML=cartoona;
}

function beCompleted(id){
    // بدي اجيب الاندكس تبع الاوبجكت الي ضفته عن طريق الاي دي بتاعه 
    //بدها ترجعلي الاندكس تبع الاوبحكت من خلال الاي دي
    // لو غلط الاي دي مش موجود هترجع -1 لو موجود هترجعلي الاندكس بتاع الاوبجكت
     var foundIndex= allTodos.findIndex(function(task){return task.id ==id})
     allTodos[foundIndex].isCompleted=allTodos[foundIndex].isCompleted ==true? false:true;
     localStorage.setItem('allTodos',JSON.stringify(allTodos));
     DisplayAccordingToSelectValue();
     
      
}



function clear(){
    taskInputBtn.value= ""
}

// انو لما يحصلك تشينج تغير بالقيمه نفذلي فنكشن معينه 
mySelect.addEventListener("change", function(){
    // اذا اخترت وغيرت اي خيار من القائمة هيروح يطبع فاليو تشينج
    // console.log("value changed");
    // طبعت الاوبشن تاعت السيلكت
    // في داخل الاوبشنز لما انطبعت كل وحده هيكون الها سيلكتيد اندكس
   // console.log(mySelect.options[0].value); //هادي طبعتلي القيمه الموجوده بأول اندكس هيا الاويل
   //mySelect.options[mySelect.options.selectedIndex].value // سارت بشكل داينمك
   DisplayAccordingToSelectValue()
})  

function DisplayAccordingToSelectValue(){
    switch(mySelect.options[mySelect.options.selectedIndex].value){
        case "all":
             displayData(allTodos);
             break;
        case "completed":
              allTodos.filter(function(){
                var compltedFilterd =  allTodos.filter(function(task){ return task.isCompleted == true});
                displayData(compltedFilterd);
               
              })
              break;  
        case "uncompleted":
            var uncompltedFilterd = allTodos.filter(function(task){ return task.isCompleted == false});
            displayData(uncompltedFilterd)
    }

}

function deltedTodo(id){
    var index= allTodos.findIndex(function(task){return task.id ==id});
    allTodos.splice(index,1)
    localStorage.setItem("allTodos",JSON.stringify(allTodos)); 
    displayData(allTodos);
    
}


// searchInput.addEventListener("input",function(e){
//     // التارقيت هوا العنصر الي عملت عليه الايفينت دا فهو الاينبت بحد ذاته
     
//      var searchResult=[] 
//      for(var i=0; i<allTodos.length; i++){
//         if(allTodos[i].taskDetails.toLowerCase().includes(e.target.value.toLowerCase)){
//             searchResult.push(allTodos[i]);
           
//         }
       
//      }
//      displayData(searchResult)
// })



searchInput.addEventListener('input',function(e){
    // التارقيت هوا العنصر الي عملت عليه الايفينت دا فهو الاينبت بحد ذاته
    console.log(e.target.value);

    var searchResult=[] 
    for(var i = 0 ; i<allTodos.length ;i++){
        
        if(allTodos[i].taskDetails.toLowerCase().includes(e.target.value.toLowerCase())){
            searchResult.push(allTodos[i])
        }
    }
    displayData(searchResult)
})








