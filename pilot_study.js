/******************** 
 * Pilot_Study *
 ********************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2025.1.1.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'pilot_study';  // from the Builder filename that created this script
let expInfo = {
    'participant': '',
    'session': '001',
};
let PILOTING = util.getUrlParameters().has('__pilotToken');

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
const position_loopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(position_loopLoopBegin(position_loopLoopScheduler));
flowScheduler.add(position_loopLoopScheduler);
flowScheduler.add(position_loopLoopEnd);




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
    {'name': 'resources/positions.csv', 'path': 'resources/positions.csv'},
    {'name': 'resources/midLoop.csv', 'path': 'resources/midLoop.csv'},
    {'name': 'resources/images/medium/med_Q1.jpg', 'path': 'resources/images/medium/med_Q1.jpg'},
    {'name': 'resources/images/medium/med_S1_1.jpg', 'path': 'resources/images/medium/med_S1_1.jpg'},
    {'name': 'resources/images/medium/med_S2_1.jpg', 'path': 'resources/images/medium/med_S2_1.jpg'},
    {'name': 'resources/images/medium/med_S3_1.jpg', 'path': 'resources/images/medium/med_S3_1.jpg'},
    {'name': 'resources/images/medium/med_S4_1.jpg', 'path': 'resources/images/medium/med_S4_1.jpg'},
    {'name': 'resources/images/medium/med_S5_1.jpg', 'path': 'resources/images/medium/med_S5_1.jpg'},
    {'name': 'resources/images/medium/med_T1.jpg', 'path': 'resources/images/medium/med_T1.jpg'},
    {'name': 'resources/images/medium/med_Q2.jpg', 'path': 'resources/images/medium/med_Q2.jpg'},
    {'name': 'resources/images/medium/med_S1_2.jpg', 'path': 'resources/images/medium/med_S1_2.jpg'},
    {'name': 'resources/images/medium/med_S2_2.jpg', 'path': 'resources/images/medium/med_S2_2.jpg'},
    {'name': 'resources/images/medium/med_S3_2.jpg', 'path': 'resources/images/medium/med_S3_2.jpg'},
    {'name': 'resources/images/medium/med_S4_2.jpg', 'path': 'resources/images/medium/med_S4_2.jpg'},
    {'name': 'resources/images/medium/med_S5_2.jpg', 'path': 'resources/images/medium/med_S5_2.jpg'},
    {'name': 'resources/images/medium/med_T2.jpg', 'path': 'resources/images/medium/med_T2.jpg'},
    {'name': 'resources/images/medium/med_Q3.jpg', 'path': 'resources/images/medium/med_Q3.jpg'},
    {'name': 'resources/images/medium/med_S1_3.jpg', 'path': 'resources/images/medium/med_S1_3.jpg'},
    {'name': 'resources/images/medium/med_S2_3.jpg', 'path': 'resources/images/medium/med_S2_3.jpg'},
    {'name': 'resources/images/medium/med_S3_3.jpg', 'path': 'resources/images/medium/med_S3_3.jpg'},
    {'name': 'resources/images/medium/med_S4_3.jpg', 'path': 'resources/images/medium/med_S4_3.jpg'},
    {'name': 'resources/images/medium/med_S5_3.jpg', 'path': 'resources/images/medium/med_S5_3.jpg'},
    {'name': 'resources/images/medium/med_T3.jpg', 'path': 'resources/images/medium/med_T3.jpg'},
    {'name': 'resources/images/medium/med_Q4.jpg', 'path': 'resources/images/medium/med_Q4.jpg'},
    {'name': 'resources/images/medium/med_S1_4.jpg', 'path': 'resources/images/medium/med_S1_4.jpg'},
    {'name': 'resources/images/medium/med_S2_4.jpg', 'path': 'resources/images/medium/med_S2_4.jpg'},
    {'name': 'resources/images/medium/med_S3_4.jpg', 'path': 'resources/images/medium/med_S3_4.jpg'},
    {'name': 'resources/images/medium/med_S4_4.jpg', 'path': 'resources/images/medium/med_S4_4.jpg'},
    {'name': 'resources/images/medium/med_S5_4.jpg', 'path': 'resources/images/medium/med_S5_4.jpg'},
    {'name': 'resources/images/medium/med_T4.jpg', 'path': 'resources/images/medium/med_T4.jpg'},
    {'name': 'resources/images/medium/med_Q5.jpg', 'path': 'resources/images/medium/med_Q5.jpg'},
    {'name': 'resources/images/medium/med_S1_5.jpg', 'path': 'resources/images/medium/med_S1_5.jpg'},
    {'name': 'resources/images/medium/med_S2_5.jpg', 'path': 'resources/images/medium/med_S2_5.jpg'},
    {'name': 'resources/images/medium/med_S3_5.jpg', 'path': 'resources/images/medium/med_S3_5.jpg'},
    {'name': 'resources/images/medium/med_S4_5.jpg', 'path': 'resources/images/medium/med_S4_5.jpg'},
    {'name': 'resources/images/medium/med_S5_5.jpg', 'path': 'resources/images/medium/med_S5_5.jpg'},
    {'name': 'resources/images/medium/med_T5.jpg', 'path': 'resources/images/medium/med_T5.jpg'},
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

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var WelcomeScreenClock;
var welcome_message;
var next_key;
var medPilotClock;
var M_query;
var M_top_left;
var M_top_mid;
var M_top_right;
var M_bot_left;
var M_bot_mid;
var M_bot_right;
var key_next_1;
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
    text: "Hello, Welcome the Image Matching study conducted by the VIDAR lab.\n\nIn this study, you will be given a query image of a hotel room, and six similar images. Your task is to select the image that is a match to the query image.\n\nPress 'SPACE' to continue.",
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  next_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "medPilot"
  medPilotClock = new util.Clock();
  M_query = new visual.ImageStim({
    win : psychoJS.window,
    name : 'M_query', units : 'height', 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, 0.3], 
    draggable: false,
    size : 1.0,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  M_top_left = new visual.ImageStim({
    win : psychoJS.window,
    name : 'M_top_left', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, 0], 
    draggable: false,
    size : 1.0,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  M_top_mid = new visual.ImageStim({
    win : psychoJS.window,
    name : 'M_top_mid', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, 0], 
    draggable: false,
    size : 1.0,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  M_top_right = new visual.ImageStim({
    win : psychoJS.window,
    name : 'M_top_right', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, 0], 
    draggable: true,
    size : 1.0,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  M_bot_left = new visual.ImageStim({
    win : psychoJS.window,
    name : 'M_bot_left', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, 0], 
    draggable: false,
    size : 1.0,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  M_bot_mid = new visual.ImageStim({
    win : psychoJS.window,
    name : 'M_bot_mid', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, 0], 
    draggable: false,
    size : 1.0,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  M_bot_right = new visual.ImageStim({
    win : psychoJS.window,
    name : 'M_bot_right', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, 0], 
    draggable: false,
    size : 1.0,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  key_next_1 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
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
      let theseKeys = next_key.getKeys({keyList: 'space', waitRelease: false});
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


var position_loop;
function position_loopLoopBegin(position_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    position_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'resources/positions.csv',
      seed: undefined, name: 'position_loop'
    });
    psychoJS.experiment.addLoop(position_loop); // add the loop to the experiment
    currentLoop = position_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisPosition_loop of position_loop) {
      snapshot = position_loop.getSnapshot();
      position_loopLoopScheduler.add(importConditions(snapshot));
      const medTrialLoopScheduler = new Scheduler(psychoJS);
      position_loopLoopScheduler.add(medTrialLoopBegin(medTrialLoopScheduler, snapshot));
      position_loopLoopScheduler.add(medTrialLoopScheduler);
      position_loopLoopScheduler.add(medTrialLoopEnd);
      position_loopLoopScheduler.add(position_loopLoopEndIteration(position_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var medTrial;
function medTrialLoopBegin(medTrialLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    medTrial = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'resources/midLoop.csv',
      seed: undefined, name: 'medTrial'
    });
    psychoJS.experiment.addLoop(medTrial); // add the loop to the experiment
    currentLoop = medTrial;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisMedTrial of medTrial) {
      snapshot = medTrial.getSnapshot();
      medTrialLoopScheduler.add(importConditions(snapshot));
      medTrialLoopScheduler.add(medPilotRoutineBegin(snapshot));
      medTrialLoopScheduler.add(medPilotRoutineEachFrame());
      medTrialLoopScheduler.add(medPilotRoutineEnd(snapshot));
      medTrialLoopScheduler.add(medTrialLoopEndIteration(medTrialLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function medTrialLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(medTrial);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function medTrialLoopEndIteration(scheduler, snapshot) {
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


async function position_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(position_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function position_loopLoopEndIteration(scheduler, snapshot) {
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


var medPilotMaxDurationReached;
var _key_next_1_allKeys;
var medPilotMaxDuration;
var medPilotComponents;
function medPilotRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'medPilot' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    medPilotClock.reset();
    routineTimer.reset();
    medPilotMaxDurationReached = false;
    // update component parameters for each repeat
    M_query.setSize([img_query_disp_w, img_query_disp_h]);
    M_query.setImage(img_query);
    M_top_left.setPos([pos1_x, pos1_y]);
    M_top_left.setSize([sam_1_disp_w, sam_1_disp_h]);
    M_top_left.setImage(sam_1);
    M_top_mid.setPos([pos2_x, pos2_y]);
    M_top_mid.setSize([sam_2_disp_w, sam_2_disp_h]);
    M_top_mid.setImage(sam_2);
    M_top_right.setPos([pos3_x, pos3_y]);
    M_top_right.setSize([sam_3_disp_w, sam_3_disp_h]);
    M_top_right.setImage(sam_3);
    M_bot_left.setPos([pos4_x, pos4_y]);
    M_bot_left.setSize([sam_4_disp_w, sam_4_disp_h]);
    M_bot_left.setImage(sam_4);
    M_bot_mid.setPos([pos5_x, pos5_y]);
    M_bot_mid.setSize([sam_5_disp_w, sam_5_disp_h]);
    M_bot_mid.setImage(sam_5);
    M_bot_right.setPos([pos6_x, pos6_y]);
    M_bot_right.setSize([targ_disp_w, targ_disp_h]);
    M_bot_right.setImage(img_targ);
    key_next_1.keys = undefined;
    key_next_1.rt = undefined;
    _key_next_1_allKeys = [];
    medPilotMaxDuration = null
    // keep track of which components have finished
    medPilotComponents = [];
    medPilotComponents.push(M_query);
    medPilotComponents.push(M_top_left);
    medPilotComponents.push(M_top_mid);
    medPilotComponents.push(M_top_right);
    medPilotComponents.push(M_bot_left);
    medPilotComponents.push(M_bot_mid);
    medPilotComponents.push(M_bot_right);
    medPilotComponents.push(key_next_1);
    
    for (const thisComponent of medPilotComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function medPilotRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'medPilot' ---
    // get current time
    t = medPilotClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *M_query* updates
    if (t >= 0.0 && M_query.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      M_query.tStart = t;  // (not accounting for frame time here)
      M_query.frameNStart = frameN;  // exact frame index
      
      M_query.setAutoDraw(true);
    }
    
    
    // if M_query is active this frame...
    if (M_query.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *M_top_left* updates
    if (t >= 0.0 && M_top_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      M_top_left.tStart = t;  // (not accounting for frame time here)
      M_top_left.frameNStart = frameN;  // exact frame index
      
      M_top_left.setAutoDraw(true);
    }
    
    
    // if M_top_left is active this frame...
    if (M_top_left.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *M_top_mid* updates
    if (t >= 0.0 && M_top_mid.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      M_top_mid.tStart = t;  // (not accounting for frame time here)
      M_top_mid.frameNStart = frameN;  // exact frame index
      
      M_top_mid.setAutoDraw(true);
    }
    
    
    // if M_top_mid is active this frame...
    if (M_top_mid.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *M_top_right* updates
    if (t >= 0.0 && M_top_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      M_top_right.tStart = t;  // (not accounting for frame time here)
      M_top_right.frameNStart = frameN;  // exact frame index
      
      M_top_right.setAutoDraw(true);
    }
    
    
    // if M_top_right is active this frame...
    if (M_top_right.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *M_bot_left* updates
    if (t >= 0.0 && M_bot_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      M_bot_left.tStart = t;  // (not accounting for frame time here)
      M_bot_left.frameNStart = frameN;  // exact frame index
      
      M_bot_left.setAutoDraw(true);
    }
    
    
    // if M_bot_left is active this frame...
    if (M_bot_left.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *M_bot_mid* updates
    if (t >= 0.0 && M_bot_mid.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      M_bot_mid.tStart = t;  // (not accounting for frame time here)
      M_bot_mid.frameNStart = frameN;  // exact frame index
      
      M_bot_mid.setAutoDraw(true);
    }
    
    
    // if M_bot_mid is active this frame...
    if (M_bot_mid.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *M_bot_right* updates
    if (t >= 0.0 && M_bot_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      M_bot_right.tStart = t;  // (not accounting for frame time here)
      M_bot_right.frameNStart = frameN;  // exact frame index
      
      M_bot_right.setAutoDraw(true);
    }
    
    
    // if M_bot_right is active this frame...
    if (M_bot_right.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *key_next_1* updates
    if (t >= 0.0 && key_next_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_next_1.tStart = t;  // (not accounting for frame time here)
      key_next_1.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_next_1.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_next_1.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_next_1.clearEvents(); });
    }
    
    // if key_next_1 is active this frame...
    if (key_next_1.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_next_1.getKeys({keyList: 'space', waitRelease: false});
      _key_next_1_allKeys = _key_next_1_allKeys.concat(theseKeys);
      if (_key_next_1_allKeys.length > 0) {
        key_next_1.keys = _key_next_1_allKeys[_key_next_1_allKeys.length - 1].name;  // just the last key pressed
        key_next_1.rt = _key_next_1_allKeys[_key_next_1_allKeys.length - 1].rt;
        key_next_1.duration = _key_next_1_allKeys[_key_next_1_allKeys.length - 1].duration;
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
    for (const thisComponent of medPilotComponents)
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


function medPilotRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'medPilot' ---
    for (const thisComponent of medPilotComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_next_1.corr, level);
    }
    psychoJS.experiment.addData('key_next_1.keys', key_next_1.keys);
    if (typeof key_next_1.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_next_1.rt', key_next_1.rt);
        psychoJS.experiment.addData('key_next_1.duration', key_next_1.duration);
        routineTimer.reset();
        }
    
    key_next_1.stop();
    // the Routine "medPilot" was not non-slip safe, so reset the non-slip timer
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
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    EndScreenClock.reset();
    routineTimer.reset();
    EndScreenMaxDurationReached = false;
    // update component parameters for each repeat
    // Prevent default browser CSV download
    //psychoJS._saveResults = 0;
    
    // Generate filename for results
    let filename = psychoJS._experiment._experimentName + '_' + psychoJS._experiment._datetime + '.csv';
    
    // Extract data object from experiment
    let dataObj = psychoJS._experiment._trialsData;
    
    // Convert data object to CSV
    let data = [Object.keys(dataObj[0])].concat(dataObj).map(it => {
        return Object.values(it).toString()
    }).join('\n')
    
    // Send data to OSF via DataPipe
    console.log('Saving data...')
    fetch('https://pipe.jspsych.org/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
        },
        body: JSON.stringify({
            experimentID: 'DLFoEuJu8PX1',
            filename: filename,
            data: data,
        }),
    }).then(response => response.json()).then(data => {
        // Log response and force experiment end
        console.log(data);
        quitPsychoJS();
    })
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
