/********************
 * Pilot_Study *
 ********************/

import {core, data, sound, util, visual, hardware} from './lib/psychojs-2025.1.1.js';

const {PsychoJS} = core;
const {TrialHandler, MultiStairHandler} = data;
const {Scheduler} = util;
//some handy aliases as in the psychopy scripts;
const {abs, sin, cos, PI: pi, sqrt} = Math;
const {round} = util;
//below gets the query string from the search bar of the current window
//Prolific's default one is:
//?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}}
const query_str = new URLSearchParams(window.location.search);
//we will also expect &NUM_IMAGES={NUM_IMAGES}, &NUM_SETS={NUM_SETS}, &DIFFICULTY={DIFFICULTY
var pilot_study_or_not = false;

// store info about the experiment session:
let expName = 'pilot_study';  // from the Builder filename that created this script
let pilotInfo = {
	'number_of_images_shown': query_str.get('NUM_IMAGES'),
	'number_of_sets_shown': query_str.get('NUM_SETS'),
	'image_matching_difficulty': query_str.get('DIFFICULTY'),
};

//the below is commented out for debugging: ctrl+f DEBUG to see all comments
//sets the experimental information equal to the URL parameters in the query string
/*let expInfo = {
    'participant_prolific_id': query_str.get('PROLIFIC_PID'),
    'participant_study_id': query_str.get('STUDY_ID'),
    'participant_session_id': query_str.get('SESSION_ID'),
};*/ //replaced the default stuff with the values from the URL parameters

let expInfo = {
	'participant': '',
	'session': '001',
};

if (pilotInfo.image_matching_difficulty != null || pilotInfo.number_of_sets_shown != null
	|| pilotInfo.number_of_images_shown != null) {
	//the url search parameters for the pilot aren't empty
    console.log(pilotInfo.image_matching_difficulty);
	pilot_study_or_not = true;

	Object.assign(expInfo, pilotInfo);
	console.log(expInfo);
	//merge the pilot info to the experiment info for logging and print to console
}

// Start code blocks for 'Before Experiment'
// init psychoJS:
const psychoJS = new PsychoJS({
	debug: true
});

// open window:
psychoJS.openWindow({
	fullscr: false,
	color: new util.Color([0, 0, 0]),
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
psychoJS.scheduleCondition(function () {
	return (psychoJS.gui.dialogComponent.button === 'OK');
}, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(WelcomeScreenRoutineBegin());
flowScheduler.add(WelcomeScreenRoutineEachFrame());
flowScheduler.add(WelcomeScreenRoutineEnd());
flowScheduler.add(consentRoutineBegin());
flowScheduler.add(consentRoutineEachFrame());
flowScheduler.add(consentRoutineEnd());
flowScheduler.add(image_matching_1RoutineBegin());
flowScheduler.add(image_matching_1RoutineEachFrame());
flowScheduler.add(image_matching_1RoutineEnd());
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
		{name: 'image_1.png', path: './resources/image_1.png'},
		{name: 'image_2.png', path: './resources/image_2.png'},
		{name: 'image_3.png', path: './resources/image_3.png'},
		{name: 'image_4.png', path: './resources/image_4.png'},
		{name: 'image_5.png', path: './resources/image_5.png'},
		{name: 'image_6.png', path: './resources/image_6.png'},
		{name: 'image_7.png', path: './resources/image_7.png'},
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
	//the below is commented out for debugging: ctrl+f DEBUG to see all comments
	//upon completion, redirects participants to another site
	//psychoJS.setRedirectUrls('http://localhost', '');

	//the below is commented out for debugging: ctrl+f DEBUG to see all comments
	//let file_name_info = `_${expInfo["number_of_images_shown"]}_${expInfo["number_of_sets_shown"]}_${expInfo["image_matching_difficulty"]}`;
	//psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}` + file_name_info);

	psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);
	psychoJS.experiment.field_separator = '\t';


	return Scheduler.Event.NEXT;
}


var consentClock;
var ask_consent;
var consent_key;
var image_matching_1Clock;
var top_left_img;
var ISI_load_images_2;
var top_mid_img;
var top_right_img;
var bott_right_img;
var bott_mid_img;
var bott_left_img;
var pilot_images_created;
var selecting_img_mouse;
var ref_img;
var WelcomeScreenClock;
var welcome_message;
var next_key;
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
		text: "Hello, Welcome the Image Matching study conducted by the VIDAR lab.\n\nIn this study, you will be given a query image of a hotel room, and six similar images. \n\nYour task is to select the image that is a match to the query image.\n\nPress 'SPACE' to continue.",
		font: 'Arial',
		units: undefined,
		pos: [0, 0], draggable: false, height: 0.05, wrapWidth: undefined, ori: 0.0,
		languageStyle: 'LTR',
		color: new util.Color('white'), opacity: undefined,
		depth: 0.0
	});

	next_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});

	// Initialize components for Routine "consent"
	consentClock = new util.Clock();
	ask_consent = new visual.TextStim({
		win: psychoJS.window,
		name: 'ask_consent',
		text: 'Now that you understand what will be expected from you as well as what data will be collected, do you consent? (y/n)',
		font: 'Arial',
		units: undefined,
		pos: [0, 0], draggable: false, height: 0.05, wrapWidth: undefined, ori: 0.0,
		languageStyle: 'LTR',
		color: new util.Color('white'), opacity: undefined,
		depth: 0.0
	});

	consent_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});

	// Initialize components for Routine "image_matching_1"
	image_matching_1Clock = new util.Clock();

	ISI_load_images_2 = new core.MinimalStim({
		name: "ISI_load_images_2",
		win: psychoJS.window,
		autoDraw: false,
		autoLog: true,
	});

	if (pilot_study_or_not) {
		//if it's a pilot, load all the images into an array, otherwise, use the default arrangement
		pilot_images_created = load_pilot_images();
	} else {
		top_left_img = new visual.ImageStim({
			win: psychoJS.window,
			name: 'top_left_img', units: 'height',
			image: 'image_1.png', mask: undefined,
			anchor: 'center',
			ori: 0.0,
			pos: [(-0.3), 0],
			draggable: false,
			size: undefined,
			color: new util.Color([1, 1, 1]), opacity: undefined,
			flipHoriz: false, flipVert: false,
			texRes: 128.0, interpolate: true, depth: 0.0
		});
		top_mid_img = new visual.ImageStim({
			win: psychoJS.window,
			name: 'top_mid_img', units: 'height',
			image: 'image_2.png', mask: undefined,
			anchor: 'center',
			ori: 0.0,
			pos: [0, 0],
			draggable: false,
			size: undefined,
			color: new util.Color([1, 1, 1]), opacity: undefined,
			flipHoriz: false, flipVert: false,
			texRes: 128.0, interpolate: true, depth: -2.0
		});
		top_right_img = new visual.ImageStim({
			win: psychoJS.window,
			name: 'top_right_img', units: 'height',
			image: 'image_3.png', mask: undefined,
			anchor: 'center',
			ori: 0.0,
			pos: [0.3, 0],
			draggable: false,
			size: undefined,
			color: new util.Color([1, 1, 1]), opacity: undefined,
			flipHoriz: false, flipVert: false,
			texRes: 128.0, interpolate: true, depth: -3.0
		});
		bott_right_img = new visual.ImageStim({
			win: psychoJS.window,
			name: 'bott_right_img', units: 'height',
			image: 'image_4.png', mask: undefined,
			anchor: 'center',
			ori: 0.0,
			pos: [0.3, (-0.25)],
			draggable: false,
			size: undefined,
			color: new util.Color([1, 1, 1]), opacity: undefined,
			flipHoriz: false, flipVert: false,
			texRes: 128.0, interpolate: true, depth: -4.0
		});
		bott_mid_img = new visual.ImageStim({
			win: psychoJS.window,
			name: 'bott_mid_img', units: 'height',
			image: 'image_5.png', mask: undefined,
			anchor: 'center',
			ori: 0.0,
			pos: [0, (-0.25)],
			draggable: false,
			size: undefined,
			color: new util.Color([1, 1, 1]), opacity: undefined,
			flipHoriz: false, flipVert: false,
			texRes: 128.0, interpolate: true, depth: -5.0
		});
		bott_left_img = new visual.ImageStim({
			win: psychoJS.window,
			name: 'bott_left_img', units: 'height',
			image: 'image_6.png', mask: undefined,
			anchor: 'center',
			ori: 0.0,
			pos: [(-0.3), (-0.25)],
			draggable: false,
			size: undefined,
			color: new util.Color([1, 1, 1]), opacity: undefined,
			flipHoriz: false, flipVert: false,
			texRes: 128.0, interpolate: true, depth: -6.0
		});
	}

	selecting_img_mouse = new core.Mouse({
		win: psychoJS.window,
	});
	selecting_img_mouse.mouseClock = new util.Clock();

	ref_img = new visual.ImageStim({
		win: psychoJS.window,
		name: 'ref_img', units: undefined,
		image: 'image_7.png', mask: undefined,
		anchor: 'center',
		ori: 0.0,
		pos: [0, 0.3],
		draggable: false,
		size: undefined,
		color: new util.Color([1, 1, 1]), opacity: undefined,
		flipHoriz: false, flipVert: false,
		texRes: 128.0, interpolate: true, depth: -8.0
	});

	// Initialize components for Routine "EndScreen"
	EndScreenClock = new util.Clock();
	end_message = new visual.TextStim({
		win: psychoJS.window,
		name: 'end_message',
		text: 'Thank you for completing! \n\nPlease wait while we save your results...',
		font: 'Arial',
		units: undefined,
		pos: [0, 0], draggable: false, height: 0.05, wrapWidth: undefined, ori: 0.0,
		languageStyle: 'LTR',
		color: new util.Color('white'), opacity: undefined,
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
		if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList: ['escape']}).length > 0) {
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


		// *consent_key* updates
		if (t >= 0.0 && consent_key.status === PsychoJS.Status.NOT_STARTED) {
			// keep track of start time/frame for later
			consent_key.tStart = t;  // (not accounting for frame time here)
			consent_key.frameNStart = frameN;  // exact frame index

			// keyboard checking is just starting
			psychoJS.window.callOnFlip(function () {
				consent_key.clock.reset();
			});  // t=0 on next screen flip
			psychoJS.window.callOnFlip(function () {
				consent_key.start();
			}); // start on screen flip
			psychoJS.window.callOnFlip(function () {
				consent_key.clearEvents();
			});
		}

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
		if (consent_key.keys === 'n' || consent_key.keys === String("n")) {
			return quitPsychoJS('Unconsented through pressing the [n] key. Goodbye!', false);
		}

		// check for quit (typically the Esc key), or if n was pressed for consent
		if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList: ['escape']}).length > 0) {
			return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
		}

		// check if the Routine should terminate
		if (!continueRoutine) {  // a component has requested a forced-end of Routine
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


var image_matching_1MaxDurationReached;
var gotValidClick;
var image_matching_1MaxDuration;
var image_matching_1Components;

function image_matching_1RoutineBegin(snapshot) {
	return async function () {
		TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

		//--- Prepare to start Routine 'image_matching_1' ---
		t = 0;
		frameN = -1;
		continueRoutine = true; // until we're told otherwise
		image_matching_1Clock.reset();
		routineTimer.reset();
		image_matching_1MaxDurationReached = false;
		// update component parameters for each repeat
		// setup some python lists for storing info about the selecting_img_mouse
		// current position of the mouse:
		selecting_img_mouse.x = [];
		selecting_img_mouse.y = [];
		selecting_img_mouse.leftButton = [];
		selecting_img_mouse.midButton = [];
		selecting_img_mouse.rightButton = [];
		selecting_img_mouse.time = [];
		selecting_img_mouse.corr = [];
		selecting_img_mouse.clicked_name = [];
		gotValidClick = false; // until a click is received
		psychoJS.experiment.addData('image_matching_1.started', globalClock.getTime());
		image_matching_1MaxDuration = null
		// keep track of which components have finished
		image_matching_1Components = [];

		image_matching_1Components.push(ISI_load_images_2);
		image_matching_1Components.push(selecting_img_mouse);
		image_matching_1Components.push(ref_img);

		if (pilot_study_or_not) {
			//if it's a pilot study, only push the images you've created for it.
			image_matching_1Components.push(pilot_images_created);
		} else {
			//otherwise, push the default images
			image_matching_1Components.push(top_left_img);
			image_matching_1Components.push(top_mid_img);
			image_matching_1Components.push(top_right_img);
			image_matching_1Components.push(bott_right_img);
			image_matching_1Components.push(bott_mid_img);
			image_matching_1Components.push(bott_left_img);
		}

		for (const thisComponent of image_matching_1Components)
			if ('status' in thisComponent)
				thisComponent.status = PsychoJS.Status.NOT_STARTED;
		return Scheduler.Event.NEXT;
	}
}


var prevButtonState;
var _mouseButtons;
var corr;
var corrAns;
var _mouseXYs;
var frameRemains;

function image_matching_1RoutineEachFrame() {
	return async function () {
		//--- Loop for each frame of Routine 'image_matching_1' ---
		// get current time
		t = image_matching_1Clock.getTime();
		frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
		// update/draw components on each frame

		if (pilot_study_or_not) {
			//if it's a pilot, update all the images in it
			for (let update_pilot_img_num = 0; update_pilot_img_num < pilot_images_created.length(); update_pilot_img_num++) {
				let curr_img = pilot_images_created[update_pilot_img_num];

				if (t >= 0.5 && curr_img.status === PsychoJS.Status.NOT_STARTED) {
					// keep track of start time/frame for later
					curr_img.tStart = t;  // (not accounting for frame time here)
					curr_img.frameNStart = frameN;  // exact frame index

					curr_img.setAutoDraw(true);
				}
			}
		} else {
			//let the default images update in a default way
			// *top_left_img* updates
			if (t >= 0.5 && top_left_img.status === PsychoJS.Status.NOT_STARTED) {
				// keep track of start time/frame for later
				top_left_img.tStart = t;  // (not accounting for frame time here)
				top_left_img.frameNStart = frameN;  // exact frame index

				top_left_img.setAutoDraw(true);
			}

			// *top_mid_img* updates
			if (t >= 0.5 && top_mid_img.status === PsychoJS.Status.NOT_STARTED) {
				// keep track of start time/frame for later
				top_mid_img.tStart = t;  // (not accounting for frame time here)
				top_mid_img.frameNStart = frameN;  // exact frame index

				top_mid_img.setAutoDraw(true);
			}

			// *top_right_img* updates
			if (t >= 0.5 && top_right_img.status === PsychoJS.Status.NOT_STARTED) {
				// keep track of start time/frame for later
				top_right_img.tStart = t;  // (not accounting for frame time here)
				top_right_img.frameNStart = frameN;  // exact frame index

				top_right_img.setAutoDraw(true);
			}

			// *bott_right_img* updates
			if (t >= 0.5 && bott_right_img.status === PsychoJS.Status.NOT_STARTED) {
				// keep track of start time/frame for later
				bott_right_img.tStart = t;  // (not accounting for frame time here)
				bott_right_img.frameNStart = frameN;  // exact frame index

				bott_right_img.setAutoDraw(true);
			}

			// *bott_mid_img* updates
			if (t >= 0.5 && bott_mid_img.status === PsychoJS.Status.NOT_STARTED) {
				// keep track of start time/frame for later
				bott_mid_img.tStart = t;  // (not accounting for frame time here)
				bott_mid_img.frameNStart = frameN;  // exact frame index

				bott_mid_img.setAutoDraw(true);
			}

			// *bott_left_img* updates
			if (t >= 0.5 && bott_left_img.status === PsychoJS.Status.NOT_STARTED) {
				// keep track of start time/frame for later
				bott_left_img.tStart = t;  // (not accounting for frame time here)
				bott_left_img.frameNStart = frameN;  // exact frame index

				bott_left_img.setAutoDraw(true);
			}
		}

		//the mouse, reference image, and weird ISI load thing will happen regardless of pilot or not
		// *selecting_img_mouse* updates
		if (t >= 0.5 && selecting_img_mouse.status === PsychoJS.Status.NOT_STARTED) {
			// keep track of start time/frame for later
			selecting_img_mouse.tStart = t;  // (not accounting for frame time here)
			selecting_img_mouse.frameNStart = frameN;  // exact frame index

			selecting_img_mouse.status = PsychoJS.Status.STARTED;
			selecting_img_mouse.mouseClock.reset();
			prevButtonState = selecting_img_mouse.getPressed();  // if button is down already this ISN'T a new click
		}
		if (selecting_img_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
			_mouseButtons = selecting_img_mouse.getPressed();
			if (!_mouseButtons.every((e, i,) => (e == prevButtonState[i]))) { // button state changed?
				prevButtonState = _mouseButtons;
				if (_mouseButtons.reduce((e, acc) => (e + acc)) > 0) { // state changed to a new click
					// check if the mouse was inside our 'clickable' objects
					gotValidClick = false;
					selecting_img_mouse.clickableObjects = eval([top_left_img, top_mid_img, top_right_img, bott_right_img, bott_mid_img, bott_left_img])
					;// make sure the mouse's clickable objects are an array
					if (!Array.isArray(selecting_img_mouse.clickableObjects)) {
						selecting_img_mouse.clickableObjects = [selecting_img_mouse.clickableObjects];
					}
					// iterate through clickable objects and check each
					for (const obj of selecting_img_mouse.clickableObjects) {
						if (obj.contains(selecting_img_mouse)) {
							gotValidClick = true;
							selecting_img_mouse.clicked_name.push(obj.name);
						}
					}
					if (!gotValidClick) {
						selecting_img_mouse.clicked_name.push(null);
					}
					// check whether click was in correct object
					if (gotValidClick) {
						corr = 0;
						corrAns = eval(bott_left_img);
						for (let obj of [corrAns]) {
							if (obj.contains(selecting_img_mouse)) {
								corr = 1;
							}
							;
						}
						;
						selecting_img_mouse.corr.push(corr);
					}
					;
					_mouseXYs = selecting_img_mouse.getPos();
					selecting_img_mouse.x.push(_mouseXYs[0]);
					selecting_img_mouse.y.push(_mouseXYs[1]);
					selecting_img_mouse.leftButton.push(_mouseButtons[0]);
					selecting_img_mouse.midButton.push(_mouseButtons[1]);
					selecting_img_mouse.rightButton.push(_mouseButtons[2]);
					selecting_img_mouse.time.push(selecting_img_mouse.mouseClock.getTime());
					if (gotValidClick === true) { // end routine on response
						continueRoutine = false;
					}
				}
			}
		}

		// *ref_img* updates
		if (t >= 0.5 && ref_img.status === PsychoJS.Status.NOT_STARTED) {
			// keep track of start time/frame for later
			ref_img.tStart = t;  // (not accounting for frame time here)
			ref_img.frameNStart = frameN;  // exact frame index

			ref_img.setAutoDraw(true);
		}

		if (t >= 0 && ISI_load_images_2.status === PsychoJS.Status.NOT_STARTED) {
			// keep track of start time/frame for later
			ISI_load_images_2.tStart = t;  // (not accounting for frame time here)
			ISI_load_images_2.frameNStart = frameN;  // exact frame index

			ISI_load_images_2.status = PsychoJS.Status.STARTED;
		}
		frameRemains = 0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
		if (ISI_load_images_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
			ISI_load_images_2.status = PsychoJS.Status.FINISHED;
		}
		// check for quit (typically the Esc key)
		if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList: ['escape']}).length > 0) {
			return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
		}

		// check if the Routine should terminate
		if (!continueRoutine) {  // a component has requested a forced-end of Routine
			return Scheduler.Event.NEXT;
		}

		continueRoutine = false;  // reverts to True if at least one component still running
		for (const thisComponent of image_matching_1Components)
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


function image_matching_1RoutineEnd(snapshot) {
	return async function () {
		//--- Ending Routine 'image_matching_1' ---
		for (const thisComponent of image_matching_1Components) {
			//since the pilot images would have been pushed to this, the rest of this function is unchanged
			if (typeof thisComponent.setAutoDraw === 'function') {
				thisComponent.setAutoDraw(false);
			}
		}
		psychoJS.experiment.addData('image_matching_1.stopped', globalClock.getTime());
		// store data for psychoJS.experiment (ExperimentHandler)
		psychoJS.experiment.addData('selecting_img_mouse.x', selecting_img_mouse.x);
		psychoJS.experiment.addData('selecting_img_mouse.y', selecting_img_mouse.y);
		psychoJS.experiment.addData('selecting_img_mouse.leftButton', selecting_img_mouse.leftButton);
		psychoJS.experiment.addData('selecting_img_mouse.midButton', selecting_img_mouse.midButton);
		psychoJS.experiment.addData('selecting_img_mouse.rightButton', selecting_img_mouse.rightButton);
		psychoJS.experiment.addData('selecting_img_mouse.time', selecting_img_mouse.time);
		psychoJS.experiment.addData('selecting_img_mouse.corr', selecting_img_mouse.corr);
		psychoJS.experiment.addData('selecting_img_mouse.clicked_name', selecting_img_mouse.clicked_name);

		// the Routine "image_matching_1" was not non-slip safe, so reset the non-slip timer
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
		//the below is commented out for debugging: ctrl+f DEBUG to see all comments
		// Prevent default browser CSV download
		//psychoJS._saveResults = 0;

		//the below is commented out for debugging: ctrl+f DEBUG to see all comments
		//you can also just use the file name in psychoJS.experiment.dataFileName and add .csv
		//let filename = psychoJS.dataFileName + `.csv`;
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
		if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList: ['escape']}).length > 0) {
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

function load_pilot_images() {
	let imgs_to_create = pilotInfo.number_of_images_shown;
	//assume the number of images shown is [5, 8]
	//for 5, 3 above 2 under, for 6 3 and 3, for 7 4 and 3, for 8 4 and 4.
	//or 2 and 3, 3 and 3, 3 2 2/3 4, and 3 3 2/2 2 3
	let pilot_imgs = [];
	//default is rn [.3, -.3] and [-.25, 0] where each image is [.3, .25] apart
	//will change to .25 since .25*8 is perfectly 2. -1 -> 0 -> 1
	let leftDist = imgs_to_create * .25; //total amount of space needed for these images
	let centerDist = leftDist / 2;
	let xPos = 0;
	let yPos = 0;


	for (let num_img_created = 1; num_img_created <= imgs_to_create; num_img_created++) {
		//create dynamically named variables of image stimuli
		xPos = centerDist - ((num_img_created-1) * .25);
		if (num_img_created <= (imgs_to_create / 2)) {
			//so if it's the first half images, display them above bc when odd, the odd index will be below
			//like 3 images above and 2 on the second row.
			yPos = -0.25;
		}

		this[`image_created_` + num_img_created] = new visual.ImageStim({
			win: psychoJS.window,
			name: this[`img_` + num_img_created], units: 'height',
			image: 'image_' + num_img_created + '.png', mask: undefined,
			anchor: 'center',
			ori: 0.0,
			pos: [xPos, yPos],
			draggable: false,
			size: undefined,
			color: new util.Color([1, 1, 1]), opacity: undefined,
			flipHoriz: false, flipVert: false,
			texRes: 128.0, interpolate: true, depth: -5.0
		});
        console.log((this[`image_created_` + num_img_created]).image);

		//add the dynamically named image stimuli to the array for returning
		pilot_imgs.push(this['image_created_' + num_img_created]);
	}

	return pilot_imgs;
}


function testingLoad(numImages) {
	pilotInfo.number_of_images_shown = numImages;

	let tempArr = load_pilot_images();

	console.log(testingLoad());
}

testingLoad(5);