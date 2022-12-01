let addSem = document.getElementById('addSem');
addSem.addEventListener('click', addSemester);

let calc = document.getElementById('calc');
calc.addEventListener('click', fin)

let subjectCount = 0;
let exclusions = [];

let semList = [{
    id:"",
    subList:[],
}];

// semList[0].subList.push(1,2,3,4);

// console.log(semList[0])

function addSemester() {

    let count = document.getElementsByClassName('semester');
    const id = (count.length + 1);


    const newDiv = document.createElement("div");
    const newSubBtn = document.createElement('button');
    const removeSemBtn = document.createElement('button');
    
    newSubBtn.innerHTML = "Add Another Subject";
    newSubBtn.className = 'subBtn';
    newSubBtn.id = id;
    newSubBtn.addEventListener('click', newSub);

    removeSemBtn.innerHTML = "Remove This Semester";
    removeSemBtn.id = "removeSem-" + id;
    removeSemBtn.addEventListener('click', removeSem);
    
    
    newDiv.className = 'semester'
    newDiv.id = 'semester-' + id;
    newDiv.innerHTML =  'Semester ' + id;

    //adding sem id to list
    semList.push({id: newDiv.id, subList: []});

    newDiv.append(removeSemBtn, newSubBtn);
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

    console.log(semList);
}

function newSub() {

    const selectedSem = document.getElementById("sem-" + this.id + "-sublist").parentElement.id;

    let selectedSemID = getIdForSem(selectedSem);
    console.log(semList[selectedSemID]);

    subjectCount++;

    const tab = document.getElementById("sem-" + this.id + "-sublist").createTBody();
    const row = tab.insertRow(0);

    const subjField = document.createElement('input')
    subjField.id = ("subject-" + subjectCount);
    subjField.placeholder = "Click here to input course";

    const credField = document.createElement('input')
    credField.id = ("credits-" + subjectCount);
    credField.placeholder = "Click here to input course credit";

    const gradField = document.createElement('input');
    gradField.id = ("grade-" + subjectCount);
    gradField.placeholder = "Click here to input your grade";

    const removeBtn = document.createElement('button');
    removeBtn.id = ("remove-" + subjectCount);
    removeBtn.innerHTML = "X";
    removeBtn.addEventListener('click', removeSub);

    row.insertCell(0).append(subjField);
    row.insertCell(1).append(credField);
    row.insertCell(2).append(gradField);
    row.insertCell(3).append(removeBtn);

    //adding subject id to sublist within semlist.
    semList[selectedSemID].subList.push(subjectCount);

}

function removeSub() {

    // let id = document.getElementById(this.id).parentNode.parentNode.querySelector('input').id.toString();
    console.log(this.id);
    let id = parseInt(this.id.toString().substring(7));
    exclusions.push(id);
    document.getElementById(this.id).parentNode.parentNode.remove();

    console.log(exclusions);
    let subTagCount = document.getElementsByTagName('input').length;

    //resetting exclusions if there's no subjects, also resets the count.
    if (subTagCount == 0) {
        exclusions = []
        subTagCount = 0;
    }

}

function removeSem() {

    let id = this.id.toString().substring(10);

    let sem = "semester-" + id;
    //adding exclusions for semester subjects
    
    semList[id].subList.forEach(element => {
        exclusions.push(element)
    });

    document.getElementById(sem).remove();

    console.log("Removed Semester " + id + ", the subjects :" + semList[id].subList);

    semCount = document.getElementById('semesters').childElementCount;
    
    //resetting semList when no more semesters are available.
    if (semCount == 0) {

        subjectCount = 0;
        exclusions = [];
        const temp = [{
            id:"",
            subList:[],
        }];

        semList = temp;

    }
}

function getIdForSem(semester) {

    let id = -1;

    for (let index = 0; index < semList.length; index++) {
        if (semList[index].id == semester) id = index;
    }

    return id;
}

function fin() {

    let procSub = 0;

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
        
        if (!exclusions.includes(i)) {

            procSub++;

            credit = document.getElementById("credits-" + i).value;
            grade = document.getElementById("grade-" + i).value;
    
            totalGi += (credit * grade);
            totalCred += parseInt(credit);
    
            console.log(credit + " * " + grade + " += " + totalGi);
        }
        
    } 

    let cgpa = (totalGi/totalCred);
    document.getElementById('cgpa').innerText = cgpa;

    console.log("total gi: " + totalGi);
    console.log("total cred: " + totalCred);
    console.log("courses included in calculation: " + procSub);

}