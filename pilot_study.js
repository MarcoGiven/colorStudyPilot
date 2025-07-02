/********************
 * Pilot_Study *
 ********************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2025.1.1.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const {abs, sin, cos, PI: pi, sqrt} = Math;
const {round} = util;
//below gets the query string from the search bar of the current window
//Prolific's default one is:
//?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}}
const query_str = new URLSearchParams(window.location.search);
//we will also expect ?IVal=4&DVal=2.5&GVal=0
// var pilot_study_or_not = false; -- OLD LOGIC

const possibleIVals = [4, 6];
const possibleDVals = [2.5, 5, 7.5, 10];
const possibleGVals = [0, 1];

function getRandomElement(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

let IVal = query_str.has('IVal') ? parseInt(query_str.get('IVal')) : getRandomElement(possibleIVals);
let DVal = query_str.has('DVal') ? parseFloat(query_str.get('DVal')) : getRandomElement(possibleDVals);
let GVal = query_str.has('GVal') ? parseInt(query_str.get('GVal')) : getRandomElement(possibleGVals);

if(GVal === 1) {
  document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.style.filter = "grayscale(100%)";
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

let expName = 'pilot_study';
let pilotInfo = {
  'IVal': IVal,
  'DVal': DVal,
  'GVal': GVal
};

let expInfo = {
    'participant': '',
    'session': '001',
};

var pilot_study_or_not = query_str.has('IVal') || query_str.has('DVal') || query_str.has('GVal');
Object.assign(expInfo, pilotInfo);
console.log("Final experiment settings:", expInfo);


// if(query_str.get("GVal") === "1"){
//   document.addEventListener("DOMContentLoaded", () => {
//     const observer = new MutationObserver(() => {
//       const canvas = document.querySelector("canvas");
//       if(canvas) {
//         canvas.style.filter = "grayscale(100%)";
//         observer.disconnect();
//       }
//     });  
//     observer.observe(document.body, { childList: true, subtree: true });  
//   });
// }

// // store info about the experiment session:
// let expName = 'pilot_study';  // from the Builder filename that created this script
// let pilotInfo = {
// 	'IVal': query_str.get('IVal'),
//     'GVal': query_str.get('GVal'),
// 	'DVal': query_str.get('DVal'),
// }; images are either 4 or 6, difficulty is either 2.5, 5, 7.5, 10, grayscale is 0 for no and 1 for yes
//where DVal is difficulty value, IVal is number of images and GVal is grayscale or not

//the below is commented out for debugging: ctrl+f DEBUG to see all comments
//sets the experimental information equal to the URL parameters in the query string
/*let expInfo = {
    'participant_prolific_id': query_str.get('PROLIFIC_PID'),
    'participant_study_id': query_str.get('STUDY_ID'),
    'participant_session_id': query_str.get('SESSION_ID'),
};*/ //replaced the default stuff with the values from the URL parameters



// if (pilotInfo.DVal != null || pilotInfo.GVal != null
// 	|| pilotInfo.DVal != null) {
// 	//the url search parameters for the pilot aren't empty
// 	pilot_study_or_not = true;

//     pilotInfo.IVal = Number(pilotInfo.IVal);
//     pilotInfo.DVal = Number(pilotInfo.DVal);

// 	Object.assign(expInfo, pilotInfo);
// 	console.log(expInfo);
// 	//merge the pilot info to the experiment info for logging and print to console
// }

// Start code blocks for 'Before Experiment'
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: false,
  color: new util.Color([0,0,0]),
  units: 'height',
  waitBlanking: true,
  backgroundImage: '',
  backgroundFit: 'none',
});

//the below is commented out for debugging: ctrl+f DEBUG to see all comments
//a lot of below can be removed. This schedule() is what calls DlgFromDict() to create a confirmation thing from user
//the scheduleCondition() can also be removed. psychoJS.schedule(flowScheduler) is sufficient

// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); },flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(WelcomeScreenRoutineBegin());
flowScheduler.add(WelcomeScreenRoutineEachFrame());
flowScheduler.add(WelcomeScreenRoutineEnd());
flowScheduler.add(consentRoutineBegin());
flowScheduler.add(consentRoutineEachFrame());
flowScheduler.add(consentRoutineEnd());
flowScheduler.add(taskRoutineBegin());
flowScheduler.add(taskRoutineEachFrame());
flowScheduler.add(taskRoutineEnd());
const trialsEasyLoopScheduler = new Scheduler(psychoJS);
const trialsMedLoopScheduler = new Scheduler(psychoJS);
const trialsHardLoopScheduler = new Scheduler(psychoJS);
const trialsImpLoopScheduler = new Scheduler(psychoJS);
var easyCsv
var medCsv
var hardCsv
var impCsv

//based on URL parameters, one of the below tasks will run
if(pilot_study_or_not){
  //if it is a pilot, check the difficulty, and the number of images
  let pilot_difficulty = pilotInfo.DVal
  let pilot_num = pilotInfo.IVal

  if(pilot_num === 4){
    easyCsv = "resources/easy4Test.csv"
    medCsv = "resources/med4Test.csv"
    hardCsv = "resources/hard4Test.csv"
    impCsv = "resources/imp4Test.csv"
  }
  else{
    //6 by default
    easyCsv = "resources/easyTest.csv"
    medCsv = "resources/loopTest.csv"
    hardCsv = "resources/hardTest.csv"
    impCsv = "resources/impTest.csv"
  }


  if(pilot_difficulty === 2.5){
    //easy mode
      flowScheduler.add(trialsEasyLoopBegin(trialsEasyLoopScheduler));
      flowScheduler.add(trialsEasyLoopScheduler);
      flowScheduler.add(trialsEasyLoopEnd);
  }
  else if(pilot_difficulty === 5){
    //medium mode
      flowScheduler.add(trialsMedLoopBegin(trialsMedLoopScheduler));
      flowScheduler.add(trialsMedLoopScheduler);
      flowScheduler.add(trialsMedLoopEnd);
  }
  else if(pilot_difficulty === 7.5){
    //hard mode
      flowScheduler.add(trialsHardLoopBegin(trialsHardLoopScheduler));
      flowScheduler.add(trialsHardLoopScheduler);
      flowScheduler.add(trialsHardLoopEnd);
  }
  else{
      //impossible mode, pilot_difficulty = 10
      flowScheduler.add(trialsImpLoopBegin(trialsImpLoopScheduler));
      flowScheduler.add(trialsImpLoopScheduler);
      flowScheduler.add(trialsImpLoopEnd);
  }
}
else{
  flowScheduler.add(trialsEasyLoopBegin(trialsEasyLoopScheduler));
  flowScheduler.add(trialsEasyLoopScheduler);
  flowScheduler.add(trialsEasyLoopEnd);

  flowScheduler.add(Next_SetRoutineBegin());
  flowScheduler.add(Next_SetRoutineEachFrame());
  flowScheduler.add(Next_SetRoutineEnd());
  flowScheduler.add(trialsMedLoopBegin(trialsMedLoopScheduler));
  flowScheduler.add(trialsMedLoopScheduler);
  flowScheduler.add(trialsMedLoopEnd);

  flowScheduler.add(Next_SetRoutineBegin());
  flowScheduler.add(Next_SetRoutineEachFrame());
  flowScheduler.add(Next_SetRoutineEnd());
  flowScheduler.add(trialsHardLoopBegin(trialsHardLoopScheduler));
  flowScheduler.add(trialsHardLoopScheduler);
  flowScheduler.add(trialsHardLoopEnd);

  flowScheduler.add(Next_SetRoutineBegin());
  flowScheduler.add(Next_SetRoutineEachFrame());
  flowScheduler.add(Next_SetRoutineEnd());
  flowScheduler.add(trialsImpLoopBegin(trialsImpLoopScheduler));
  flowScheduler.add(trialsImpLoopScheduler);
  flowScheduler.add(trialsImpLoopEnd);
  easyCsv = "resources/easyTest.csv"
  medCsv = "resources/loopTest.csv"
  hardCsv = "resources/hardTest.csv"
  impCsv = "resources/impTest.csv"
}



flowScheduler.add(EndScreenRoutineBegin());
flowScheduler.add(EndScreenRoutineEachFrame());
flowScheduler.add(EndScreenRoutineEnd());
flowScheduler.add(quitPsychoJS, 'Thank you for your patience.', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, 'Thank you for your patience.', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
    {'name': "resources/loopTest.csv", 'path': "resources/loopTest.csv"},
    {"name": "resources/med4Test.csv", "path": "resources/med4Test.csv"},
    {"name": "resources/med5Test.csv", "path": "resources/med5Test.csv"},
    {"name": "resources/easy4Test.csv", "path": "resources/easy4Test.csv"},
    {"name": "resources/easy5Test.csv", "path": "resources/easy5Test.csv"},
    {"name": "resources/easy8Test.csv", "path": "resources/easy8Test.csv"},
    {"name": "resources/hard4Test.csv", "path": "resources/hard4Test.csv"},
    {"name": "resources/hard5Test.csv", "path": "resources/hard5Test.csv"},
    {"name": "resources/hard8Test.csv", "path": "resources/hard8Test.csv"},
    {"name": "resources/imp4Test.csv", "path": "resources/imp4Test.csv"},
    {"name": "resources/imp5Test.csv", "path": "resources/imp5Test.csv"},
    {'name': 'resources/easyTest.csv', 'path': 'resources/easyTest.csv'},
    {'name': 'resources/loopTest.csv', 'path': 'resources/loopTest.csv'},
    {'name': 'resources/hardTest.csv', 'path': 'resources/hardTest.csv'},
    {'name': 'resources/impTest.csv', 'path': 'resources/impTest.csv'},
    {'name': "resources/images/6_matches/m1.png", 'path': "resources/images/6_matches/m1.png"},
    {'name': "resources/images/6_matches/m2.png", 'path': "resources/images/6_matches/m2.png"},
    {'name': "resources/images/6_matches/m3.png", 'path': "resources/images/6_matches/m3.png"},
    {'name': "resources/images/6_matches/m4.png", 'path': "resources/images/6_matches/m4.png"},
    {'name': "resources/images/6_matches/m5.png", 'path': "resources/images/6_matches/m5.png"},
    {'name': "resources/images/6_matches/easy_1.png", 'path': "resources/images/6_matches/easy_1.png"},
    {'name': "resources/images/6_matches/easy_2.png", 'path': "resources/images/6_matches/easy_2.png"},
    {'name': "resources/images/6_matches/easy_3.png", 'path': "resources/images/6_matches/easy_3.png"},
    {'name': "resources/images/6_matches/easy_4.png", 'path': "resources/images/6_matches/easy_4.png"},
    {'name': "resources/images/6_matches/easy_5.png", 'path': "resources/images/6_matches/hard_1.png"},
    {'name': "resources/images/6_matches/hard_1.png", 'path': "resources/images/6_matches/hard_1.png"},
    {'name': "resources/images/6_matches/hard_2.png", 'path': "resources/images/6_matches/hard_2.png"},
    {'name': "resources/images/6_matches/hard_3.png", 'path': "resources/images/6_matches/hard_3.png"},
    {'name': "resources/images/6_matches/hard_4.png", 'path': "resources/images/6_matches/hard_4.png"},
    {'name': "resources/images/6_matches/hard_5.png", 'path': "resources/images/6_matches/hard_5.png"},
    {'name': "resources/images/6_matches/i1.png", 'path': "resources/images/6_matches/i1.png"},
    {'name': "resources/images/6_matches/i2.png", 'path': "resources/images/6_matches/i2.png"},
    {'name': "resources/images/6_matches/i3.png", 'path': "resources/images/6_matches/i3.png"},
    {'name': "resources/images/6_matches/i4.png", 'path': "resources/images/6_matches/i4.png"},
    {'name': "resources/images/6_matches/i5.png", 'path': "resources/images/6_matches/i5.png"},
    {'name': "resources/images/4_matches/med_1.png", 'path': "resources/images/4_matches/med_1.png"},
    {'name': "resources/images/4_matches/med_2.png", 'path': "resources/images/4_matches/med_2.png"},
    {'name': "resources/images/4_matches/med_3.png", 'path': "resources/images/4_matches/med_3.png"},
    {'name': "resources/images/4_matches/med_4.png", 'path': "resources/images/4_matches/med_4.png"},
    {'name': "resources/images/4_matches/med_5.png", 'path': "resources/images/4_matches/med_5.png"},
    {'name': "resources/images/4_matches/easy_1.png", 'path': "resources/images/4_matches/easy_1.png"},
    {'name': "resources/images/4_matches/easy_2.png", 'path': "resources/images/4_matches/easy_2.png"},
    {'name': "resources/images/4_matches/easy_3.png", 'path': "resources/images/4_matches/easy_3.png"},
    {'name': "resources/images/4_matches/easy_4.png", 'path': "resources/images/4_matches/easy_4.png"},
    {'name': "resources/images/4_matches/easy_5.png", 'path': "resources/images/4_matches/hard_1.png"},
    {'name': "resources/images/4_matches/hard_1.png", 'path': "resources/images/4_matches/hard_1.png"},
    {'name': "resources/images/4_matches/hard_2.png", 'path': "resources/images/4_matches/hard_2.png"},
    {'name': "resources/images/4_matches/hard_3.png", 'path': "resources/images/4_matches/hard_3.png"},
    {'name': "resources/images/4_matches/hard_4.png", 'path': "resources/images/4_matches/hard_4.png"},
    {'name': "resources/images/4_matches/hard_5.png", 'path': "resources/images/4_matches/hard_5.png"},
    {'name': "resources/images/4_matches/imp_1.png", 'path': "resources/images/4_matches/imp_1.png"},
    {'name': "resources/images/4_matches/imp_2.png", 'path': "resources/images/4_matches/imp_2.png"},
    {'name': "resources/images/4_matches/imp_3.png", 'path': "resources/images/4_matches/imp_3.png"},
    {'name': "resources/images/4_matches/imp_4.png", 'path': "resources/images/4_matches/imp_4.png"},
    {'name': "resources/images/4_matches/imp_5.png", 'path': "resources/images/4_matches/imp_5.png"},
    {'name': 'default.png', 'path': 'https://pavlovia.org/assets/default/default.png'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.INFO);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2025.1.1';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  //the below is commented out for debugging: ctrl+f DEBUG to see all commentsAdd commentMore actions
  //upon completion, redirects participants to another site
  //psychoJS.setRedirectUrls('http://localhost', '');

  // add info from the URL:
  util.addInfoFromUrl(expInfo);



  if(pilot_study_or_not){
    psychoJS.experiment.dataFileName = (("." + "/") +
        `data/${expName}_${expInfo["date"]}_${pilotInfo["number_of_images_shown"]}_${pilotInfo["number_of_sets_shown"]}_${pilotInfo["image_matching_difficulty"]}`);
  }
  else{
   psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);
  }
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var WelcomeScreenClock;
var welcome_message;
var next_key;
var consentClock;
var ask_consent;
var consent_key;
var taskClock;
var text_3;
var key_resp_2;
var easy_setsClock;
var imageEasy;
var key_easy;
var blank500Clock;
var text;
var Next_SetClock;
var text_4;
var med_setsClock;
var image;
var key_resp;
var hard_setsClock;
var imageHard;
var key_hard;
var imp_setsClock;
var image2;
var key_resp2;
var EndScreenClock;
var end_message;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "WelcomeScreen"
  WelcomeScreenClock = new util.Clock();
  welcome_message = new visual.TextStim({
    win: psychoJS.window,
    name: 'welcome_message',
    text: "Hello, Welcome the Image Matching study conducted by the VIDAR lab.\n\nPress 'SPACE' to continue.",
    font: 'Arial',
    units: undefined,
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0
  });

  next_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});

  // Initialize components for Routine "consent"
  consentClock = new util.Clock();
  ask_consent = new visual.TextStim({
    win: psychoJS.window,
    name: 'ask_consent',
    text: 'In this study, your speed, accuracy, and self-reported confidence will be collected for analysis. No personally identifiable information will be recorded.\nYou may exit and rescind your consent at any time during the study by pressing the escape key (esc).\n\nNow that you understand what will be expected from you as well as what data will be collected, do you consent? (y/n)',
    font: 'Arial',
    units: undefined,
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0
  });

  consent_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});

  // Initialize components for Routine "task"
  taskClock = new util.Clock();
  text_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_3',
    text: "On the following page, you will be given a query image of a hotel room.\n\nYour task is to use keys '1', '2', '3', '4', '5', or '6' to select the corresponding image that pictures the same hotel room.\n\nPress 'SPACE' to begin. ",
    font: 'Arial',
    units: undefined,
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0
  });

  key_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});

  // Initialize components for Routine "easy_sets"
  easy_setsClock = new util.Clock();
  imageEasy = new visual.ImageStim({
    win : psychoJS.window,
    name : 'imageEasy', units : undefined,
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0,
    pos : [0, 0],
    draggable: false,
    size : [1.8, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0
  });
  key_easy = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});

  // Initialize components for Routine "blank500"
  blank500Clock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: '',
    font: 'Arial',
    units: undefined,
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0
  });

  // Initialize components for Routine "Next_Set"
  Next_SetClock = new util.Clock();
  text_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_4',
    text: 'NEXT DIFFICULTY',
    font: 'Arial',
    units: undefined,
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0
  });

  // Initialize components for Routine "med_sets"
  med_setsClock = new util.Clock();
  image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image', units : undefined,
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0,
    pos : [0, 0],
    draggable: false,
    size : [1.8, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0
  });
  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});

  // Initialize components for Routine "hard_sets"
  hard_setsClock = new util.Clock();
  imageHard = new visual.ImageStim({
    win : psychoJS.window,
    name : 'imageHard', units : undefined,
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0,
    pos : [0, 0],
    draggable: false,
    size : [1.8, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0
  });
  key_hard = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});

  // Initialize components for Routine "imp_sets"
  imp_setsClock = new util.Clock();
  image2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image2', units : undefined,
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0,
    pos : [0, 0],
    draggable: false,
    size : [1.8, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0
  });
  key_resp2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});

  // Initialize components for Routine "EndScreen"
  EndScreenClock = new util.Clock();
  end_message = new visual.TextStim({
    win: psychoJS.window,
    name: 'end_message',
    text: 'Thank you for completing! \n\nPlease wait while we save your results...',
    font: 'Arial',
    units: undefined,
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0
  });

  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine

  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var routineForceEnded;
var WelcomeScreenMaxDurationReached;
var _next_key_allKeys;
var WelcomeScreenMaxDuration;
var WelcomeScreenComponents;
function WelcomeScreenRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

    //--- Prepare to start Routine 'WelcomeScreen' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    WelcomeScreenClock.reset();
    routineTimer.reset();
    WelcomeScreenMaxDurationReached = false;
    // update component parameters for each repeat
    next_key.keys = undefined;
    next_key.rt = undefined;
    _next_key_allKeys = [];
    WelcomeScreenMaxDuration = null
    // keep track of which components have finished
    WelcomeScreenComponents = [];
    WelcomeScreenComponents.push(welcome_message);
    WelcomeScreenComponents.push(next_key);

    for (const thisComponent of WelcomeScreenComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function WelcomeScreenRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'WelcomeScreen' ---
    // get current time
    t = WelcomeScreenClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame

    // *welcome_message* updates
    if (t >= 0.0 && welcome_message.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      welcome_message.tStart = t;  // (not accounting for frame time here)
      welcome_message.frameNStart = frameN;  // exact frame index

      welcome_message.setAutoDraw(true);
    }


    // if welcome_message is active this frame...
    if (welcome_message.status === PsychoJS.Status.STARTED) {
    }


    // *next_key* updates
    if (t >= 0.0 && next_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      next_key.tStart = t;  // (not accounting for frame time here)
      next_key.frameNStart = frameN;  // exact frame index

      // keyboard checking is just starting
      next_key.clock.reset();
      next_key.start();
    }

    // if next_key is active this frame...
    if (next_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = next_key.getKeys({keyList: ['space'], waitRelease: false});
      _next_key_allKeys = _next_key_allKeys.concat(theseKeys);
      if (_next_key_allKeys.length > 0) {
        next_key.keys = _next_key_allKeys[_next_key_allKeys.length - 1].name;  // just the last key pressed
        next_key.rt = _next_key_allKeys[_next_key_allKeys.length - 1].rt;
        next_key.duration = _next_key_allKeys[_next_key_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }

    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      routineForceEnded = true;
      return Scheduler.Event.NEXT;
    }

    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of WelcomeScreenComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }

    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function WelcomeScreenRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'WelcomeScreen' ---
    for (const thisComponent of WelcomeScreenComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    next_key.stop();
    // the Routine "WelcomeScreen" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();

    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

var consentMaxDurationReached;
var _consent_key_allKeys;
var consentMaxDuration;
var consentComponents;
function consentRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

    //--- Prepare to start Routine 'consent' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    consentClock.reset();
    routineTimer.reset();
    consentMaxDurationReached = false;
    // update component parameters for each repeat
    consent_key.keys = undefined;
    consent_key.rt = undefined;
    _consent_key_allKeys = [];
    psychoJS.experiment.addData('consent.started', globalClock.getTime());
    consentMaxDuration = null
    // keep track of which components have finished
    consentComponents = [];
    consentComponents.push(ask_consent);
    consentComponents.push(consent_key);

    for (const thisComponent of consentComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function consentRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'consent' ---
    // get current time
    t = consentClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame

    // *ask_consent* updates
    if (t >= 0.0 && ask_consent.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ask_consent.tStart = t;  // (not accounting for frame time here)
      ask_consent.frameNStart = frameN;  // exact frame index

      ask_consent.setAutoDraw(true);
    }


    // if ask_consent is active this frame...
    if (ask_consent.status === PsychoJS.Status.STARTED) {
    }


    // *consent_key* updates
    if (t >= 0.0 && consent_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      consent_key.tStart = t;  // (not accounting for frame time here)
      consent_key.frameNStart = frameN;  // exact frame index

      // keyboard checking is just starting
      consent_key.clock.reset();
      consent_key.start();
    }

    // if consent_key is active this frame...
    if (consent_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = consent_key.getKeys({keyList: ['y', 'n'], waitRelease: false});
      _consent_key_allKeys = _consent_key_allKeys.concat(theseKeys);
      if (_consent_key_allKeys.length > 0) {
        consent_key.keys = _consent_key_allKeys[_consent_key_allKeys.length - 1].name;  // just the last key pressed
        consent_key.rt = _consent_key_allKeys[_consent_key_allKeys.length - 1].rt;
        consent_key.duration = _consent_key_allKeys[_consent_key_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }

    // Run 'Each Frame' code from code
    //check if unconsented
    if (consent_key.keys === 'n' || consent_key.keys === String('n')) {
        quitPsychoJS('Unconsented through pressing the [n] key. Goodbye!', false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }

    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      routineForceEnded = true;
      return Scheduler.Event.NEXT;
    }

    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of consentComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }

    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function consentRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'consent' ---
    for (const thisComponent of consentComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('consent.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(consent_key.corr, level);
    }
    psychoJS.experiment.addData('consent_key.keys', consent_key.keys);
    if (typeof consent_key.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('consent_key.rt', consent_key.rt);
        psychoJS.experiment.addData('consent_key.duration', consent_key.duration);
        routineTimer.reset();
        }

    consent_key.stop();
    // the Routine "consent" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();

    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var taskMaxDurationReached;
var _key_resp_2_allKeys;
var taskMaxDuration;
var taskComponents;
function taskRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

    //--- Prepare to start Routine 'task' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    taskClock.reset();
    routineTimer.reset();
    taskMaxDurationReached = false;
    // update component parameters for each repeat
    key_resp_2.keys = undefined;
    key_resp_2.rt = undefined;
    _key_resp_2_allKeys = [];
    taskMaxDuration = null
    // keep track of which components have finished
    taskComponents = [];
    taskComponents.push(text_3);
    taskComponents.push(key_resp_2);

    for (const thisComponent of taskComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function taskRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'task' ---
    // get current time
    t = taskClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame

    // *text_3* updates
    if (t >= 0.0 && text_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_3.tStart = t;  // (not accounting for frame time here)
      text_3.frameNStart = frameN;  // exact frame index

      text_3.setAutoDraw(true);
    }


    // *key_resp_2* updates
    if (t >= 0.0 && key_resp_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_2.tStart = t;  // (not accounting for frame time here)
      key_resp_2.frameNStart = frameN;  // exact frame index

      // keyboard checking is just starting
      key_resp_2.clock.reset();
      key_resp_2.start();
    }

    if (key_resp_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_2.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_2_allKeys = _key_resp_2_allKeys.concat(theseKeys);
      if (_key_resp_2_allKeys.length > 0) {
        key_resp_2.keys = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].name;  // just the last key pressed
        key_resp_2.rt = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].rt;
        key_resp_2.duration = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }

    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }

    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of taskComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }

    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function taskRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'task' ---
    for (const thisComponent of taskComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    key_resp_2.stop();
    // the Routine "task" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();

    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var trialsEasy;
function trialsEasyLoopBegin(trialsEasyLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop

    // set up handler to look after randomisation of conditions etc
    trialsEasy = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: easyCsv,
      seed: undefined, name: 'trialsEasy'
    });
    psychoJS.experiment.addLoop(trialsEasy); // add the loop to the experiment
    currentLoop = trialsEasy;  // we're now the current loop

    // Schedule all the trials in the trialList:
    for (const thisTrialsEasy of trialsEasy) {
      snapshot = trialsEasy.getSnapshot();
      trialsEasyLoopScheduler.add(importConditions(snapshot));
      trialsEasyLoopScheduler.add(easy_setsRoutineBegin(snapshot));
      trialsEasyLoopScheduler.add(easy_setsRoutineEachFrame());
      trialsEasyLoopScheduler.add(easy_setsRoutineEnd(snapshot));
      trialsEasyLoopScheduler.add(blank500RoutineBegin(snapshot));
      trialsEasyLoopScheduler.add(blank500RoutineEachFrame());
      trialsEasyLoopScheduler.add(blank500RoutineEnd(snapshot));
      trialsEasyLoopScheduler.add(trialsEasyLoopEndIteration(trialsEasyLoopScheduler, snapshot));
    }

    return Scheduler.Event.NEXT;
  }
}


async function trialsEasyLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trialsEasy);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsEasyLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var trialsMed;
function trialsMedLoopBegin(trialsMedLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop

    // set up handler to look after randomisation of conditions etc
    trialsMed = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.FULLRANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: medCsv,
      seed: undefined, name: 'trialsMed'
    });
    psychoJS.experiment.addLoop(trialsMed); // add the loop to the experiment
    currentLoop = trialsMed;  // we're now the current loop

    // Schedule all the trials in the trialList:
    for (const thisTrialsMed of trialsMed) {
      snapshot = trialsMed.getSnapshot();
      trialsMedLoopScheduler.add(importConditions(snapshot));
      trialsMedLoopScheduler.add(med_setsRoutineBegin(snapshot));
      trialsMedLoopScheduler.add(med_setsRoutineEachFrame());
      trialsMedLoopScheduler.add(med_setsRoutineEnd(snapshot));
      trialsMedLoopScheduler.add(blank500RoutineBegin(snapshot));
      trialsMedLoopScheduler.add(blank500RoutineEachFrame());
      trialsMedLoopScheduler.add(blank500RoutineEnd(snapshot));
      trialsMedLoopScheduler.add(trialsMedLoopEndIteration(trialsMedLoopScheduler, snapshot));
    }

    return Scheduler.Event.NEXT;
  }
}


async function trialsMedLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trialsMed);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsMedLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var trialsHard;
function trialsHardLoopBegin(trialsHardLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop

    // set up handler to look after randomisation of conditions etc
    trialsHard = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: hardCsv,
      seed: undefined, name: 'trialsHard'
    });
    psychoJS.experiment.addLoop(trialsHard); // add the loop to the experiment
    currentLoop = trialsHard;  // we're now the current loop

    // Schedule all the trials in the trialList:
    for (const thisTrialsHard of trialsHard) {
      snapshot = trialsHard.getSnapshot();
      trialsHardLoopScheduler.add(importConditions(snapshot));
      trialsHardLoopScheduler.add(hard_setsRoutineBegin(snapshot));
      trialsHardLoopScheduler.add(hard_setsRoutineEachFrame());
      trialsHardLoopScheduler.add(hard_setsRoutineEnd(snapshot));
      trialsHardLoopScheduler.add(blank500RoutineBegin(snapshot));
      trialsHardLoopScheduler.add(blank500RoutineEachFrame());
      trialsHardLoopScheduler.add(blank500RoutineEnd(snapshot));
      trialsHardLoopScheduler.add(trialsHardLoopEndIteration(trialsHardLoopScheduler, snapshot));
    }

    return Scheduler.Event.NEXT;
  }
}


async function trialsHardLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trialsHard);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsHardLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var trialsImp;
function trialsImpLoopBegin(trialsImpLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop

    // set up handler to look after randomisation of conditions etc
    trialsImp = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.FULLRANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: impCsv,
      seed: undefined, name: 'trialsImp'
    });
    psychoJS.experiment.addLoop(trialsImp); // add the loop to the experiment
    currentLoop = trialsImp;  // we're now the current loop

    // Schedule all the trials in the trialList:
    for (const thisTrialsImp of trialsImp) {
      snapshot = trialsImp.getSnapshot();
      trialsImpLoopScheduler.add(importConditions(snapshot));
      trialsImpLoopScheduler.add(imp_setsRoutineBegin(snapshot));
      trialsImpLoopScheduler.add(imp_setsRoutineEachFrame());
      trialsImpLoopScheduler.add(imp_setsRoutineEnd(snapshot));
      trialsImpLoopScheduler.add(blank500RoutineBegin(snapshot));
      trialsImpLoopScheduler.add(blank500RoutineEachFrame());
      trialsImpLoopScheduler.add(blank500RoutineEnd(snapshot));
      trialsImpLoopScheduler.add(trialsImpLoopEndIteration(trialsImpLoopScheduler, snapshot));
    }

    return Scheduler.Event.NEXT;
  }
}


async function trialsImpLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trialsImp);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsImpLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var easy_setsMaxDurationReached;
var _key_easy_allKeys;
var easy_setsMaxDuration;
var easy_setsComponents;
function easy_setsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

    //--- Prepare to start Routine 'easy_sets' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    easy_setsClock.reset();
    routineTimer.reset();
    easy_setsMaxDurationReached = false;
    // update component parameters for each repeat
    imageEasy.setImage(set_img);
    key_easy.keys = undefined;
    key_easy.rt = undefined;
    _key_easy_allKeys = [];
    easy_setsMaxDuration = null
    // keep track of which components have finished
    easy_setsComponents = [];
    easy_setsComponents.push(imageEasy);
    easy_setsComponents.push(key_easy);

    for (const thisComponent of easy_setsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function easy_setsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'easy_sets' ---
    // get current time
    t = easy_setsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame

    // *imageEasy* updates
    if (t >= 0.0 && imageEasy.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      imageEasy.tStart = t;  // (not accounting for frame time here)
      imageEasy.frameNStart = frameN;  // exact frame index

      imageEasy.setAutoDraw(true);
    }


    // *key_easy* updates
    if (t >= 0.0 && key_easy.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_easy.tStart = t;  // (not accounting for frame time here)
      key_easy.frameNStart = frameN;  // exact frame index

      // keyboard checking is just starting
      key_easy.clock.reset();
      key_easy.start();
    }

    if (key_easy.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_easy.getKeys({keyList: ['1', '2', '3', '4', '5', '6'], waitRelease: false});
      _key_easy_allKeys = _key_easy_allKeys.concat(theseKeys);
      if (_key_easy_allKeys.length > 0) {
        key_easy.keys = _key_easy_allKeys[_key_easy_allKeys.length - 1].name;  // just the last key pressed
        key_easy.rt = _key_easy_allKeys[_key_easy_allKeys.length - 1].rt;
        key_easy.duration = _key_easy_allKeys[_key_easy_allKeys.length - 1].duration;
        // was this correct?
        if (key_easy.keys == correct) {
            key_easy.corr = 1;
        } else {
            key_easy.corr = 0;
        }
        // a response ends the routine
        continueRoutine = false;
      }
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }

    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }

    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of easy_setsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }

    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function easy_setsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'easy_sets' ---
    for (const thisComponent of easy_setsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // was no response the correct answer?!
    if (key_easy.keys === undefined) {
      if (['None','none',undefined].includes(correct)) {
         key_easy.corr = 1;  // correct non-response
      } else {
         key_easy.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_easy.corr, level);
    }
    psychoJS.experiment.addData('key_easy.keys', key_easy.keys);
    psychoJS.experiment.addData('key_easy.corr', key_easy.corr);
    if (typeof key_easy.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_easy.rt', key_easy.rt);
        psychoJS.experiment.addData('key_easy.duration', key_easy.duration);
        routineTimer.reset();
        }

    key_easy.stop();
    // the Routine "easy_sets" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();

    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var blank500MaxDurationReached;
var blank500MaxDuration;
var blank500Components;
function blank500RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

    //--- Prepare to start Routine 'blank500' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    blank500Clock.reset(routineTimer.getTime());
    routineTimer.add(1.000000);
    blank500MaxDurationReached = false;
    // update component parameters for each repeat
    blank500MaxDuration = null
    // keep track of which components have finished
    blank500Components = [];
    blank500Components.push(text);

    for (const thisComponent of blank500Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function blank500RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'blank500' ---
    // get current time
    t = blank500Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame

    // *text* updates
    if (t >= 0.0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index

      text.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text.setAutoDraw(false);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }

    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }

    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of blank500Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }

    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function blank500RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'blank500' ---
    for (const thisComponent of blank500Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    if (blank500MaxDurationReached) {
        blank500Clock.add(blank500MaxDuration);
    } else {
        blank500Clock.add(1.000000);
    }
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Next_SetMaxDurationReached;
var Next_SetMaxDuration;
var Next_SetComponents;
function Next_SetRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

    //--- Prepare to start Routine 'Next_Set' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    Next_SetClock.reset(routineTimer.getTime());
    routineTimer.add(2.000000);
    Next_SetMaxDurationReached = false;
    // update component parameters for each repeat
    Next_SetMaxDuration = null
    // keep track of which components have finished
    Next_SetComponents = [];
    Next_SetComponents.push(text_4);

    for (const thisComponent of Next_SetComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Next_SetRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Next_Set' ---
    // get current time
    t = Next_SetClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame

    // *text_4* updates
    if (t >= 0.0 && text_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_4.tStart = t;  // (not accounting for frame time here)
      text_4.frameNStart = frameN;  // exact frame index

      text_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (text_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_4.setAutoDraw(false);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }

    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }

    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Next_SetComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }

    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Next_SetRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Next_Set' ---
    for (const thisComponent of Next_SetComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    if (Next_SetMaxDurationReached) {
        Next_SetClock.add(Next_SetMaxDuration);
    } else {
        Next_SetClock.add(2.000000);
    }
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var med_setsMaxDurationReached;
var _key_resp_allKeys;
var med_setsMaxDuration;
var med_setsComponents;
function med_setsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

    //--- Prepare to start Routine 'med_sets' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    med_setsClock.reset();
    routineTimer.reset();
    med_setsMaxDurationReached = false;
    // update component parameters for each repeat
    image.setImage(set_img);
    key_resp.keys = undefined;
    key_resp.rt = undefined;
    _key_resp_allKeys = [];
    med_setsMaxDuration = null
    // keep track of which components have finished
    med_setsComponents = [];
    med_setsComponents.push(image);
    med_setsComponents.push(key_resp);

    for (const thisComponent of med_setsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function med_setsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'med_sets' ---
    // get current time
    t = med_setsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame

    // *image* updates
    if (t >= 0.0 && image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image.tStart = t;  // (not accounting for frame time here)
      image.frameNStart = frameN;  // exact frame index

      image.setAutoDraw(true);
    }


    // *key_resp* updates
    if (t >= 0.0 && key_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp.tStart = t;  // (not accounting for frame time here)
      key_resp.frameNStart = frameN;  // exact frame index

      // keyboard checking is just starting
      key_resp.clock.reset();
      key_resp.start();
    }

    if (key_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp.getKeys({keyList: ['1', '2', '3', '4', '5', '6'], waitRelease: false});
      _key_resp_allKeys = _key_resp_allKeys.concat(theseKeys);
      if (_key_resp_allKeys.length > 0) {
        key_resp.keys = _key_resp_allKeys[_key_resp_allKeys.length - 1].name;  // just the last key pressed
        key_resp.rt = _key_resp_allKeys[_key_resp_allKeys.length - 1].rt;
        key_resp.duration = _key_resp_allKeys[_key_resp_allKeys.length - 1].duration;
        // was this correct?
        if (key_resp.keys == correct) {
            key_resp.corr = 1;
        } else {
            key_resp.corr = 0;
        }
        // a response ends the routine
        continueRoutine = false;
      }
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }

    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }

    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of med_setsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }

    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function med_setsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'med_sets' ---
    for (const thisComponent of med_setsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // was no response the correct answer?!
    if (key_resp.keys === undefined) {
      if (['None','none',undefined].includes(correct)) {
         key_resp.corr = 1;  // correct non-response
      } else {
         key_resp.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp.corr, level);
    }
    psychoJS.experiment.addData('key_resp.keys', key_resp.keys);
    psychoJS.experiment.addData('key_resp.corr', key_resp.corr);
    if (typeof key_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp.rt', key_resp.rt);
        psychoJS.experiment.addData('key_resp.duration', key_resp.duration);
        routineTimer.reset();
        }

    key_resp.stop();
    // the Routine "med_sets" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();

    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var hard_setsMaxDurationReached;
var _key_hard_allKeys;
var hard_setsMaxDuration;
var hard_setsComponents;
function hard_setsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

    //--- Prepare to start Routine 'hard_sets' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    hard_setsClock.reset();
    routineTimer.reset();
    hard_setsMaxDurationReached = false;
    // update component parameters for each repeat
    imageHard.setImage(set_img);
    key_hard.keys = undefined;
    key_hard.rt = undefined;
    _key_hard_allKeys = [];
    hard_setsMaxDuration = null
    // keep track of which components have finished
    hard_setsComponents = [];
    hard_setsComponents.push(imageHard);
    hard_setsComponents.push(key_hard);

    for (const thisComponent of hard_setsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function hard_setsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'hard_sets' ---
    // get current time
    t = hard_setsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame

    // *imageHard* updates
    if (t >= 0.0 && imageHard.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      imageHard.tStart = t;  // (not accounting for frame time here)
      imageHard.frameNStart = frameN;  // exact frame index

      imageHard.setAutoDraw(true);
    }


    // *key_hard* updates
    if (t >= 0.0 && key_hard.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_hard.tStart = t;  // (not accounting for frame time here)
      key_hard.frameNStart = frameN;  // exact frame index

      // keyboard checking is just starting
      key_hard.clock.reset();
      key_hard.start();
    }

    if (key_hard.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_hard.getKeys({keyList: ['1', '2', '3', '4', '5', '6'], waitRelease: false});
      _key_hard_allKeys = _key_hard_allKeys.concat(theseKeys);
      if (_key_hard_allKeys.length > 0) {
        key_hard.keys = _key_hard_allKeys[_key_hard_allKeys.length - 1].name;  // just the last key pressed
        key_hard.rt = _key_hard_allKeys[_key_hard_allKeys.length - 1].rt;
        key_hard.duration = _key_hard_allKeys[_key_hard_allKeys.length - 1].duration;
        // was this correct?
        if (key_hard.keys == correct) {
            key_hard.corr = 1;
        } else {
            key_hard.corr = 0;
        }
        // a response ends the routine
        continueRoutine = false;
      }
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }

    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }

    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of hard_setsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }

    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function hard_setsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'hard_sets' ---
    for (const thisComponent of hard_setsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // was no response the correct answer?!
    if (key_hard.keys === undefined) {
      if (['None','none',undefined].includes(correct)) {
         key_hard.corr = 1;  // correct non-response
      } else {
         key_hard.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_hard.corr, level);
    }
    psychoJS.experiment.addData('key_hard.keys', key_hard.keys);
    psychoJS.experiment.addData('key_hard.corr', key_hard.corr);
    if (typeof key_hard.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_hard.rt', key_hard.rt);
        psychoJS.experiment.addData('key_hard.duration', key_hard.duration);
        routineTimer.reset();
        }

    key_hard.stop();
    // the Routine "hard_sets" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();

    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var imp_setsMaxDurationReached;
var _key_resp2_allKeys;
var imp_setsMaxDuration;
var imp_setsComponents;
function imp_setsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

    //--- Prepare to start Routine 'imp_sets' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    imp_setsClock.reset();
    routineTimer.reset();
    imp_setsMaxDurationReached = false;
    // update component parameters for each repeat
    image2.setImage(set_img2);
    key_resp2.keys = undefined;
    key_resp2.rt = undefined;
    _key_resp2_allKeys = [];
    psychoJS.experiment.addData('imp_sets.started', globalClock.getTime());
    imp_setsMaxDuration = null
    // keep track of which components have finished
    imp_setsComponents = [];
    imp_setsComponents.push(image2);
    imp_setsComponents.push(key_resp2);

    for (const thisComponent of imp_setsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function imp_setsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'imp_sets' ---
    // get current time
    t = imp_setsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame

    // *image2* updates
    if (t >= 0.0 && image2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image2.tStart = t;  // (not accounting for frame time here)
      image2.frameNStart = frameN;  // exact frame index

      image2.setAutoDraw(true);
    }


    // *key_resp2* updates
    if (t >= 0.0 && key_resp2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp2.tStart = t;  // (not accounting for frame time here)
      key_resp2.frameNStart = frameN;  // exact frame index

      // keyboard checking is just starting
      key_resp2.clock.reset();
      key_resp2.start();
    }

    if (key_resp2.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp2.getKeys({keyList: ['1', '2', '3', '4', '5', '6'], waitRelease: false});
      _key_resp2_allKeys = _key_resp2_allKeys.concat(theseKeys);
      if (_key_resp2_allKeys.length > 0) {
        key_resp2.keys = _key_resp2_allKeys[_key_resp2_allKeys.length - 1].name;  // just the last key pressed
        key_resp2.rt = _key_resp2_allKeys[_key_resp2_allKeys.length - 1].rt;
        key_resp2.duration = _key_resp2_allKeys[_key_resp2_allKeys.length - 1].duration;
        // was this correct?
        if (key_resp2.keys == correct2) {
            key_resp2.corr = 1;
        } else {
            key_resp2.corr = 0;
        }
        // a response ends the routine
        continueRoutine = false;
      }
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }

    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }

    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of imp_setsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }

    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function imp_setsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'imp_sets' ---
    for (const thisComponent of imp_setsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('imp_sets.stopped', globalClock.getTime());
    // was no response the correct answer?!
    if (key_resp2.keys === undefined) {
      if (['None','none',undefined].includes(correct2)) {
         key_resp2.corr = 1;  // correct non-response
      } else {
         key_resp2.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp2.corr, level);
    }
    psychoJS.experiment.addData('key_resp2.keys', key_resp2.keys);
    psychoJS.experiment.addData('key_resp2.corr', key_resp2.corr);
    if (typeof key_resp2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp2.rt', key_resp2.rt);
        psychoJS.experiment.addData('key_resp2.duration', key_resp2.duration);
        routineTimer.reset();
        }

    key_resp2.stop();
    // the Routine "imp_sets" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();

    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

var EndScreenMaxDurationReached;
var EndScreenMaxDuration;
var EndScreenComponents;
function EndScreenRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

    //--- Prepare to start Routine 'EndScreen' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    EndScreenClock.reset();
    routineTimer.reset();
    EndScreenMaxDurationReached = false;
    // update component parameters for each repeat
    // Prevent default CSV download
    // psychoJS._saveResults = false;

    // Collect all keys from trial data
    const allKeys = [...new Set(psychoJS._experiment._trialsData.flatMap(d => Object.keys(d)))];

    // Convert to CSV rows
    let csvRows = psychoJS._experiment._trialsData.map(row =>
      allKeys.map(k => {
        let val = row[k];
        if (typeof val === 'string') val = '"' + val.replace(/"/g, '""') + '"';
        return (val === undefined || val === null) ? '' : val;
      }).join(',')
    );

    // Compute summary stats
    let accKey = allKeys.find(k => k.endsWith('.corr') || k.toLowerCase().includes('corr'));
    let rtKey = allKeys.find(k => k.endsWith('.rt') || k.toLowerCase().includes('rt'));

    let accVals = psychoJS._experiment._trialsData.map(row => parseFloat(row[accKey])).filter(v => !isNaN(v));
    let rtVals = psychoJS._experiment._trialsData.map(row => parseFloat(row[rtKey])).filter(v => !isNaN(v));

    let meanAcc = accVals.length ? (accVals.reduce((a, b) => a + b, 0) / accVals.length).toFixed(4) : 'NA';
    let meanRT = rtVals.length ? (rtVals.reduce((a, b) => a + b, 0) / rtVals.length).toFixed(4) : 'NA';

    // Append summary to CSV
    csvRows.push(`"SUMMARY","mean_accuracy",${meanAcc}`);
    csvRows.push(`"SUMMARY","mean_rt",${meanRT}`);

    // Final CSV
    let csvData = allKeys.join(',') + '\n' + csvRows.join('\n');

    // Create filename
    let filename = psychoJS._experiment._experimentName + '_' + psychoJS._experiment._datetime + '.csv';

    // Send to DataPipe
    fetch('https://pipe.jspsych.org/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify({
        experimentID: 'DLFoEuJu8PX1',
        filename: filename,
        data: csvData,
      }),
    }).then(response => response.json()).then(data => {
      console.log('DataPipe uploaded:', data);
      quitPsychoJS();
    }).catch(error => {
      console.error('Upload failed:', error);
      quitPsychoJS();
    });
    EndScreenMaxDuration = null
    // keep track of which components have finished
    EndScreenComponents = [];
    EndScreenComponents.push(end_message);

    for (const thisComponent of EndScreenComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function EndScreenRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'EndScreen' ---
    // get current time
    t = EndScreenClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame

    // *end_message* updates
    if (t >= 0.0 && end_message.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      end_message.tStart = t;  // (not accounting for frame time here)
      end_message.frameNStart = frameN;  // exact frame index

      end_message.setAutoDraw(true);
    }


    // if end_message is active this frame...
    if (end_message.status === PsychoJS.Status.STARTED) {
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }

    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      routineForceEnded = true;
      return Scheduler.Event.NEXT;
    }

    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of EndScreenComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }

    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function EndScreenRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'EndScreen' ---
    for (const thisComponent of EndScreenComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "EndScreen" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();

    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});

  return Scheduler.Event.QUIT;
}
