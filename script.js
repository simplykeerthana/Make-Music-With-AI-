
// adding a variablee to keeep track of the notes

let notes =[];
//variables to keep track 
const notesEmptyStaff = "B4/4/r, B4/4/r,B4/4/r,B4/4/r";
let renderNotes;

//Vexflow variable
const VF = Vex.Flow;

//current duration of the seed meldy
let totalCurrentDuration =0;

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
    
    let noteDurationInSixteenth = calculateNoteDurationInSixteenth(note);

    if(noteDurationInSixteenth + totalCurrentDuration >16){
      return false;
    }
    
    //add note to the array
    notes = [...notes, note];

    let restsString = restsToComplete(notes);

    //parsing notes
    let [notesString, currentDuration] = parseNotesToVex(notes);

    console.log(restsString, notesString);

    //update total current duration
    totalCurrentDuration = currentDuration;

    renderNotes = notesString + restsString;

    //Draw the staff
    createStaff(renderNotes);

    if(totalCurrentDuration === 16)
    {
      document.getElementById('input').disabled  = true;
    }

    
    //console.log(notes);
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

//parsing notes to renderNotes

function parseNotesToVex(notes){
  //create empty string
  let notesString = '';
  //initialize current duration
  let currentDuration =0;

  //looping over each notes
  for (let note of notes){
    let noteString = '';
    let noteDuration;
    //if its a rest
    if(note.duration.includes('r')){
      noteDuration = note.duration.replace('r','');

      if(note.isDotted){
        noteString = noteDuration.replace('.','');
        noteString = 'B4/' + noteDuration + '/r,';

      }else{
        noteString = 'B4/' + noteDuration + '/r,';
      }
    }
    else{
       //if it's not a rest
       noteString = note.pitch + '/'  + note.duration + ',';
       noteDuration = note.duration;

    }
    notesString += noteString;

    //calculate duration
    let noteDurationInSixteenth = calculateNoteDurationInSixteenth(note);

    //update current duration
    currentDuration += noteDurationInSixteenth;
   
  }

  return [notesString, currentDuration];
}

function calculateNoteDurationInSixteenth(note){
  let noteDuration = note.duration.replace('r', '');

  let noteDurationInSixteenth = (16/parseInt(noteDuration));

  if(note.isDotted){
    noteDurationInSixteenth += noteDurationInSixteenth/2;
  }

  return noteDurationInSixteenth;
}

function restsToComplete(notes){
  let restsDuration =16;
  let notesDuration = 0;

  for(let note of notes){
    let noteDuration = calculateNoteDurationInSixteenth(note);

    notesDuration = noteDuration;
  }
  restsDuration -= notesDuration;

  let quarterRests = Math.floor(restsDuration/4);
  let sixteenRests = restsDuration % 4;

  let quarterRestsString = 'B4/4/r,'.repeat(quarterRests);
  let sixteenthRestsString = "B4/4/r,".repeat(sixteenRests);

  return quarterRestsString + sixteenthRestsString;
}