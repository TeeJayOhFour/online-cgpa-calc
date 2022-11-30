let addSem = document.getElementById('addSem');
addSem.addEventListener('click', addSemester);

let calc = document.getElementById('calc');
calc.addEventListener('click', fin)

let subjectCount = 0;


function addSemester() {
    let count = document.getElementsByClassName('semester');
    const id = (count.length + 1);

    const newDiv = document.createElement("div");
    const newSubBtn = document.createElement('button');
    
    newSubBtn.innerHTML = "Add Another Subject";
    newSubBtn.className = 'subBtn';
    newSubBtn.id = id;


    newSubBtn.addEventListener('click', newSub, false);
    newSubBtn.origin = id;
    
    newDiv.className = 'semester'
    newDiv.id = 'semester-' + id;
    newDiv.innerHTML =  'Semester ' + id;
    
    newDiv.append(newSubBtn);
    //creating the table.

    const table = document.createElement('table');
    table.id = ("sem-" + id + "-sublist");
    table.append(document.createElement('thead'));
    table.createTHead();
    table.createTBody();
    const row = table.createTHead().insertRow(0);

    row.insertCell(0).innerHTML = "Course";
    row.insertCell(1).innerHTML = "Credits";
    row.insertCell(2).innerHTML = "Grade";

    newDiv.append(table);

    const target = document.getElementById('semesters');
    target.append(newDiv);
}

function newSub(evt) {

    subjectCount++;

    const tab = document.getElementById("sem-" + this.id + "-sublist").createTBody();
    const row = tab.insertRow(0);

    const subjField = document.createElement('input')
    subjField.id = ("subject-" + subjectCount);
    subjField.placeholder = "Click here to input course";
    subjField.className = "subject";

    const credField = document.createElement('input')
    credField.id = ("credits-" + subjectCount);
    credField.placeholder = "Click here to input course credit";

    const gradField = document.createElement('input');
    gradField.id = ("grade-" + subjectCount);
    gradField.placeholder = "Click here to input your grade";

    row.insertCell(0).append(subjField);
    row.insertCell(1).append(credField);
    row.insertCell(2).append(gradField);

}

function fin() {
    
    let subCount = document.getElementsByClassName('subject').length;
    let semcount = document.getElementsByClassName('semester').length;
    
    if (semcount <= 0) {
        alert('Add atleast 1 semester.');
        return;
    }
    if (subjectCount <= 0) {
        alert('Add atleast 1 subject.');
        return;
    }

    let totalGi = 0;
    let totalCred = 0;

    for(let i = 1; i < subjectCount + 1; i++) {
        
        
        credit = document.getElementById("credits-" + i).value;
        grade = document.getElementById("grade-" + i).value;

        totalGi += (credit * grade);
        totalCred += parseInt(credit);

        console.log(credit + " * " + grade + " += " + totalGi);
    } 

    let cgpa = (totalGi/totalCred);
    document.getElementById('cgpa').innerText = cgpa;

    console.log("total gi: " + totalGi);
    console.log("total cred: " + totalCred);


}