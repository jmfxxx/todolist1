
$(function () {
  load();
  // 1.TodoList按下Enter後寫入localStorage中，然後再從裏面讀出資料渲染到畫面上
  $("#title").on("keypress", function (e) {
    // console.log('aaaa'+data)

    if (e.keyCode == 13) {
      if ($(this).val() === "") {
        alert("不能為空值，請重新輸入");
      } else {
        var todos = getData();
        // console.log($(this).val())
        todos.push({ todo: $(this).val(), done: false });
        saveData(todos);
        $(this).val("");
        load();
      }
    }
  });
  // 2. toDoList 删除操作
  // 按下刪除A連結後，會從資料中，刪除該筆對應的資料，再寫回localStorage後再渲染出來

  //     $('.deltodo').on('click',function(){
  //    alert('111')
  //     })

  $("ol,ul").on("click", "a", function () {
    var data = getData();
    console.log(data);
    var index = $(this).parent().index();
    data.splice(index, 1);
    //   寫回去localStorage再渲染
    saveData(data);
    console.log($(this).parent().index());
    load();
  });
  // 3. toDoList進行查是否完成，若完成則移到下方完成項目中，否則放在進行中
  // 從localStorage中讀出資料，並重新寫回後再渲染
  
  var data = getData() ;
  
  console.log(data)
  $('ul,ol').on('click','input',function(){

// var index =$(this).siblings("a").attr("id");
var index =$(this).attr("id");
console.log(index)
data = JSON.parse(data)
data[index].done= $(this).prop("checked");
console.log((data))
// // 寫回資料
saveData(data)
// // 重新讀取
load()
  })



  // 讀取LocalStorage中的資料並返回 ,如果沒資料送回空字串
  getData();
  function getData() {
    data = localStorage.getItem("todolist");
    // console.log('1111:'+data)
    if (data !== null) {
      // console.log(JSON.parse(data))
      // console.log('getDate:'+JSON.parse(localStorage.getItem('todolist')));
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  // 寫入資料到LocalStorage 要先做 JSON.stringfy()再寫入
  function saveData(data) {
    localStorage.setItem("todolist", JSON.stringify(data));
  }

  // 渲染顯示資料，依localStorage中取出的資料，批次顯示並調整為html顯示於主畫面中
  // 使用$.each方式進行迴圈取出資料 ,並在最後計算完成數量，及進行中數量顯示於畫面中
  function load() {
    var data = getData();
    var todocount = 0;
    var donecount = 0;

    $("#todolist").empty();
    $("#donelist").empty();
    $.each(data, function (index, item) {
        if (item.done) {
            // 完成項目
    var li =
          "<li><input type='checkbox'checked='checked'  id='"+index+"' ></input><p>" +
          item.todo +
          "</p><a href='javascript:;'   ></a> </li>";
        $("#donelist").prepend(li);
        donecount++;
      } else {
         //  未完成項目
        var li =
          "<li><input type='checkbox' id='"+index+"'></input><p>" +
          item.todo +
          "</p><a href='javascript:;'  ></a> </li>";
        $("#todolist").prepend(li);
        todocount++;  
      }


    });
    $("#todocount").text(todocount);
    $("#donecount").text(donecount);

    
    // 增加移動時color
$('#todolist li,#donelist li').on({
    mouseenter: function(){
        $(this).css("background-color","skyblue")
    },
    mouseleave: function(){
        $(this).css("background-color","#fff")
    }
})
  }
});
