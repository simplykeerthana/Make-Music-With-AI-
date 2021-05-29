
// adding a variablee to keeep track of the notes

let notes =[];

//event listenter for dom
document.addEventListener('DOMContentLoaded', () =>{
  
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
