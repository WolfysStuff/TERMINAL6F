let input = document.querySelector('.txt-input');
let content = document.querySelector('.content');
let clear = document.getElementsByClassName('.clear');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

input.addEventListener('keydown', handleCommand);

function handleCommand(event) {
    if(event.key === 'Enter') {
        const command = input.value.trim();
        input.value = '';
        content.innerHTML += `$ ${command}<br>`;
        executeCommand(command);
    }
}

function executeCommand(command) {
    switch (command) {
        case "help":
            content.innerHTML += '<p class="dummy-txt">Available commands: <span class="cmd-txt">help</span>, <span class="cmd-txt"> </span> <span class="cmd-txt"> </span> <span class="cmd-txt"> </span> <span class="cmd-txt"> </span> <span class="cmd-txt">updates</span>, <span class="cmd-txt">about .</span></p><br>';
            break;
        case "about":
            let aboutMe = document.createElement('div');
            aboutMe.classList.add('about-me');
            aboutMe.innerHTML =
            `
            <span class="about-txt">Hello USER95,<br> TERMINAL 6F is an experimental program by [REDACTED] incorperated company. Experiments, Data Sheets, and Time frames will be noted and saved here.<br>
              </div>
            `

            content.appendChild(aboutMe);
            input.value = '';
            break;
          case "updates":
            let updates = document.createElement('div');
            updates.classList.add('about-me');
            updates.innerHTML =
            `
            <span class="about-txt"> 
            Updates:<br>
            LOG UPDATES : Added the 3875EXPERIMENT Timeframe.
            </span>
            `

            content.appendChild(updates);
            input.value = '';
          break;
        default:
            content.innerHTML += `Unknown command: ${command}, for a list of commands type help.<br>`;
    }
}
function handleAddTask(event) {
    if (event.key === "Enter") {
      const task = input.value.trim();
      if (task !== "") {
        todos.push(task);
        content.innerHTML += `<span class="added-task">Task added: ${task}</span><br>`;
        input.value = '';  

        localStorage.setItem('todos', JSON.stringify(todos));
      }
      input.removeEventListener("keydown", handleAddTask);
      input.addEventListener("keydown", handleCommand);
    }
  }

  function handleRemoveTask(event) {
    if (event.key === "Enter") {
      const index = parseInt(input.value) - 1;
      if (isNaN(index) || index < 0 || index >= todos.length) {
        content.innerHTML += "Invalid task number<br>";
        input.value = '';
      } else {
        const task = todos[index];
        todos.splice(index, 1);
        content.innerHTML += `<span class="removed-task">Task removed: ${task}</span><br>`;
        input.value = '';

        localStorage.setItem('todos', JSON.stringify(todos));
      }
      input.removeEventListener("keydown", handleRemoveTask);
      input.addEventListener("keydown", handleCommand);
    }
  }