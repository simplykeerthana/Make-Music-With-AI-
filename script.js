
// adding a variablee to keeep track of the notes

let notes =[];
//variables to keep track 
const notesEmptyStaff = "B4/4/r, B4/4/r,B4/4/r,B4/4/r";
let renderNotes;

//Vexflow variable
const VF = Vex.Flow;

//event listenter for dom
document.addEventListener('DOMContentLoaded', () =>{

//Create a new Staff
createStaff(notesEmptyStaff);  
  

    //disable options for user selection
  document.getElementById('duration').addEventListener('change', function(obj){
    
    //get user information
    let inputPitch = document.getElementById('pitch');
    let inputAccidental = document.getElementById('accidental');
    let inputOctave = document.getElementById('octave');
    let inputDot = document.getElementById('dotted');
    
    //disable pitch if it is at rest
    inputPitch.disabled = (this.value.includes('r'));
    inputAccidental.disabled = (this.value.includes('r'));
    inputOctave.disabled = (this.value.includes('r'));
    
    //disable dot if it is 16 or 1 
    inputDot.disabled = (this.value.includes('16') || this.value.included('1'));
    
  });
  
  //retriev submitted form info
  document.querySelector('#input-form').onsubmit = (e) => {
    
    //dont send default form, need info
    e.preventDefault();
    
    //store the info
    let inputDuration = document.getElementById('duration').value;
    let inputPitch = document.getElementById('pitch').value;
    let inputAccidental = document.getElementById('accidental').value;
    let inputOctave = document.getElementById('octave').value;
    
    //add the note together
    let inputNote = inputPitch + inputAccidental + inputOctave;
    
    //check if note is dotted
    let isDotted = false;
    
    if(document.getElementById('dotted').checked == true){
      isDotted = true;
      inputDuration += '.';
    }
    
    //create the note
    let note = {'duration': inputDuration, 'pitch': inputNote, 'isDotted': isDotted};
    
    //add note to the array
    notes = [...noted, note];
    
    console.log(notes);
  }
  
})

//Create a Staff
function createStaff(renderNotes){
  //remove any old staff
  const staff = document.getElementById('staff');

  while(staff.hasChildNodes()){
    staff.removeChild(staff.lastChild);
  }

  //creating an svg rendereer and attach it to the DIV element
  var vf = new VF.Factory({renderer:{elementId:'staff'}});
  var score = vf.EasyScore();
  var system = vf.system();

  // Add a staff and voices to our systms
  system.addStave({
    voices:[score.voice(score.notes(renderNotes))]
  }).addClef('treble').addTimeSignature('4/4');

  vf.draw();
}
