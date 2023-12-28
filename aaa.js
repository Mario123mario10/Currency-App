var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/')); dir = dir.replace(/%20/g, ' ');


function showMessage(){
    number = document.getElementById("userNumber").value
    document.getElementById("message").innerHTML = dir+"/baza_danych.py"

}

function runPythonScript() {
    // Get the path to the Python script.
    var pythonScriptPath = " "+dir+"/baza_danych.py";
    // Run the Python script.
    subprocess.run(["python3", pythonScriptPath]);
  }

