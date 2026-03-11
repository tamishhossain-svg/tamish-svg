// Form submission
document.getElementById('student-form').addEventListener('submit', addStudent);

// Inputs and buttons
let nameInput = document.getElementById('student-name');
let rollInput = document.getElementById('student-roll');
let addButton = document.getElementById('add-btn');
let studentList = document.getElementById('student-list');


// Disable Add button when name is empty
nameInput.addEventListener('input', function () {
    addButton.disabled = nameInput.value.trim() === '';
});


// Add student
function addStudent(event) {

    event.preventDefault();

    let studentName = nameInput.value.trim();
    let studentRoll = rollInput.value.trim();

    if (studentName === '' || studentRoll === '') {
        alert("Please enter both roll and name");
        return;
    }

    // Create list item
    let li = document.createElement('li');
    li.classList.add('student-item');

    // Student text
    let span = document.createElement('span');
    span.textContent = studentRoll + " - " + studentName;

    // Present checkbox
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";

    checkbox.addEventListener('change', function () {
        li.classList.toggle('present');
        updateAttendance();
    });

    // Edit button
    let editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.classList.add('btn-edit');

    editButton.addEventListener('click', function () {

        let newRoll = prompt("Enter new roll:", studentRoll);
        let newName = prompt("Enter new name:", studentName);

        if (newRoll !== null && newName !== null && newRoll !== '' && newName !== '') {

            studentRoll = newRoll;
            studentName = newName;

            span.textContent = studentRoll + " - " + studentName;
        }

    });

    // Delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('btn-delete');

    deleteButton.addEventListener('click', function () {

        if (confirm("Are you sure you want to delete this student?")) {

            li.remove();
            updateStudentCount();
            updateAttendance();

        }

    });

    // Append elements
    li.appendChild(span);
    li.appendChild(checkbox);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    studentList.appendChild(li);

    // Clear inputs
    nameInput.value = '';
    rollInput.value = '';

    addButton.disabled = true;

    updateStudentCount();
    updateAttendance();
}



// Update student count
function updateStudentCount() {

    let total = document.querySelectorAll('.student-item').length;

    document.getElementById('student-count').textContent =
        "Total students: " + total;

}



// Update attendance
function updateAttendance() {

    let students = document.querySelectorAll('.student-item');

    let present = 0;

    students.forEach(student => {

        let checkbox = student.querySelector('input[type="checkbox"]');

        if (checkbox.checked) {
            present++;
        }

    });

    let absent = students.length - present;

    document.getElementById('attendance-count').textContent =
        "Present: " + present + " , Absent: " + absent;

}



// Search students
document.getElementById('search-box').addEventListener('input', function () {

    let searchText = this.value.toLowerCase();

    let students = document.querySelectorAll('.student-item');

    students.forEach(student => {

        let name = student.querySelector('span').textContent.toLowerCase();

        if (name.includes(searchText)) {
            student.style.display = "flex";
        }
        else {
            student.style.display = "none";
        }

    });

});



// Sort students A-Z
document.getElementById('sort-btn').addEventListener('click', function () {

    let students = Array.from(studentList.children);

    students.sort((a, b) => {

        let nameA = a.querySelector('span').textContent.toLowerCase();
        let nameB = b.querySelector('span').textContent.toLowerCase();

        return nameA.localeCompare(nameB);

    });

    students.forEach(student => studentList.appendChild(student));

});



// Highlight first student
document.getElementById('highlight-first').addEventListener('click', function () {

    let students = document.querySelectorAll('.student-item');

    students.forEach(student => {
        student.classList.remove('top-student');
    });

    if (students.length > 0) {
        students[0].classList.add('top-student');
    }

});



// Highlight all students
function changeListStyle() {

    let students = document.querySelectorAll('.student-item');

    students.forEach(student => {
        student.classList.toggle('highlight');
    });

}



// Highlight button
document.getElementById('highlight-btn').addEventListener('click', changeListStyle);