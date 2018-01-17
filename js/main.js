$(document).ready(function () {
    var baseUrl = 'https://vivify-academy-todo.now.sh';
    $.get(baseUrl + '/todos', function (response) {
            for (var i = 0; i < response.length; i++){
                $('#todo-list').prepend(makeTodo(response[i]));
               
     }     

    });

    $('#add-todo').click(addTodo);

    function addTodo() {
        

    var body = {
        description: $('#todo-input').val(),
        completed: false,
    };

        if (body.description == ''){
            $('.alert').show();
        }
        else {
            $.post(baseUrl + '/todos', body, function (response){
            console.log(response);
            var element = makeTodo(response);
            $('#todo-list').prepend(element);

            });
            
            $('.alert').hide();
            $('#todo-input').val('');

        }

       
    }

    function makeTodo(data) {
        var todo =  $('<li></li>').text(data.description);
        var removeButton = $('<span>\u00D7</span>').addClass('remove-todo');

        removeButton.click(function () {

        $.ajax({
            url: baseUrl + '/todos/' + data.id,
            method: 'DELETE',
            data: data

        }).done(function (data){
            todo.remove();
        }).fail(function(){
            console.log("nesto ne radi");
        });
        });
        console.log(data);

           todo.append(removeButton); 

           if(data.completed){
                todo.addClass('is-completed');
           }

           todo.click(function(){

            $.ajax({
            url: baseUrl + '/todos/' + data.id,
            method: 'PUT',
            data: {
            description: data.description,
            completed: !data.completed
        }
         }).then(function(response){
            todo.toggleClass("is-completed");
         });
           });
       
    
        return todo;
    } 

        $('#todo-input').keypress(function (event) {
               if (event.which == 13) {
                  addTodo();
               }
          });
});

