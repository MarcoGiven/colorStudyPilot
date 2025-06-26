#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2025.1.1),
    on Thu Jun 26 17:01:11 2025
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

# --- Import packages ---
from psychopy import locale_setup
from psychopy import prefs
from psychopy import plugins
plugins.activatePlugins()
prefs.hardware['audioLib'] = 'ptb'
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors, layout, hardware
from psychopy.tools import environmenttools
from psychopy.constants import (
    NOT_STARTED, STARTED, PLAYING, PAUSED, STOPPED, STOPPING, FINISHED, PRESSED, 
    RELEASED, FOREVER, priority
)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

from psychopy.hardware import keyboard

# --- Setup global variables (available in all functions) ---
# create a device manager to handle hardware (keyboards, mice, mirophones, speakers, etc.)
deviceManager = hardware.DeviceManager()
# ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
# store info about the experiment session
psychopyVersion = '2025.1.1'
expName = 'pilot_study'  # from the Builder filename that created this script
expVersion = ''
# a list of functions to run when the experiment ends (starts off blank)
runAtExit = []
# information about this experiment
expInfo = {
    'participant': '',
    'session': '001',
    'date|hid': data.getDateStr(),
    'expName|hid': expName,
    'expVersion|hid': expVersion,
    'psychopyVersion|hid': psychopyVersion,
}

# --- Define some variables which will change depending on pilot mode ---
'''
To run in pilot mode, either use the run/pilot toggle in Builder, Coder and Runner, 
or run the experiment with `--pilot` as an argument. To change what pilot 
#mode does, check out the 'Pilot mode' tab in preferences.
'''
# work out from system args whether we are running in pilot mode
PILOTING = core.setPilotModeFromArgs()
# start off with values from experiment settings
_fullScr = False
_winSize = [1280, 720]
# if in pilot mode, apply overrides according to preferences
if PILOTING:
    # force windowed mode
    if prefs.piloting['forceWindowed']:
        _fullScr = False
        # set window size
        _winSize = prefs.piloting['forcedWindowSize']
    # replace default participant ID
    if prefs.piloting['replaceParticipantID']:
        expInfo['participant'] = 'pilot'

def showExpInfoDlg(expInfo):
    """
    Show participant info dialog.
    Parameters
    ==========
    expInfo : dict
        Information about this experiment.
    
    Returns
    ==========
    dict
        Information about this experiment.
    """
    # show participant info dialog
    dlg = gui.DlgFromDict(
        dictionary=expInfo, sortKeys=False, title=expName, alwaysOnTop=True
    )
    if dlg.OK == False:
        core.quit()  # user pressed cancel
    # return expInfo
    return expInfo


def setupData(expInfo, dataDir=None):
    """
    Make an ExperimentHandler to handle trials and saving.
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    dataDir : Path, str or None
        Folder to save the data to, leave as None to create a folder in the current directory.    
    Returns
    ==========
    psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    """
    # remove dialog-specific syntax from expInfo
    for key, val in expInfo.copy().items():
        newKey, _ = data.utils.parsePipeSyntax(key)
        expInfo[newKey] = expInfo.pop(key)
    
    # data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
    if dataDir is None:
        dataDir = _thisDir
    filename = u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])
    # make sure filename is relative to dataDir
    if os.path.isabs(filename):
        dataDir = os.path.commonprefix([dataDir, filename])
        filename = os.path.relpath(filename, dataDir)
    
    # an ExperimentHandler isn't essential but helps with data saving
    thisExp = data.ExperimentHandler(
        name=expName, version=expVersion,
        extraInfo=expInfo, runtimeInfo=None,
        originPath='/Users/marcogiven/Desktop/projects/S25_SURE/colorStudyPilot/pilot_study_lastrun.py',
        savePickle=True, saveWideText=True,
        dataFileName=dataDir + os.sep + filename, sortColumns='time'
    )
    thisExp.setPriority('thisRow.t', priority.CRITICAL)
    thisExp.setPriority('expName', priority.LOW)
    # return experiment handler
    return thisExp


def setupLogging(filename):
    """
    Setup a log file and tell it what level to log at.
    
    Parameters
    ==========
    filename : str or pathlib.Path
        Filename to save log file and data files as, doesn't need an extension.
    
    Returns
    ==========
    psychopy.logging.LogFile
        Text stream to receive inputs from the logging system.
    """
    # set how much information should be printed to the console / app
    if PILOTING:
        logging.console.setLevel(
            prefs.piloting['pilotConsoleLoggingLevel']
        )
    else:
        logging.console.setLevel('warning')
    # save a log file for detail verbose info
    logFile = logging.LogFile(filename+'.log')
    if PILOTING:
        logFile.setLevel(
            prefs.piloting['pilotLoggingLevel']
        )
    else:
        logFile.setLevel(
            logging.getLevel('info')
        )
    
    return logFile


def setupWindow(expInfo=None, win=None):
    """
    Setup the Window
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    win : psychopy.visual.Window
        Window to setup - leave as None to create a new window.
    
    Returns
    ==========
    psychopy.visual.Window
        Window in which to run this experiment.
    """
    if win is None:
        # if not given a window to setup, make one
        win = visual.Window(
            size=_winSize, fullscr=_fullScr, screen=0,
            winType='pyglet', allowGUI=True, allowStencil=False,
            monitor='testMonitor', color=[0,0,0], colorSpace='rgb',
            backgroundImage='', backgroundFit='none',
            blendMode='avg', useFBO=True,
            units='height',
            checkTiming=False  # we're going to do this ourselves in a moment
        )
    else:
        # if we have a window, just set the attributes which are safe to set
        win.color = [0,0,0]
        win.colorSpace = 'rgb'
        win.backgroundImage = ''
        win.backgroundFit = 'none'
        win.units = 'height'
    win.hideMessage()
    if PILOTING:
        # show a visual indicator if we're in piloting mode
        if prefs.piloting['showPilotingIndicator']:
            win.showPilotingIndicator()
        # always show the mouse in piloting mode
        if prefs.piloting['forceMouseVisible']:
            win.mouseVisible = True
    
    return win


def setupDevices(expInfo, thisExp, win):
    """
    Setup whatever devices are available (mouse, keyboard, speaker, eyetracker, etc.) and add them to 
    the device manager (deviceManager)
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    win : psychopy.visual.Window
        Window in which to run this experiment.
    Returns
    ==========
    bool
        True if completed successfully.
    """
    # --- Setup input devices ---
    ioConfig = {}
    ioSession = ioServer = eyetracker = None
    
    # store ioServer object in the device manager
    deviceManager.ioServer = ioServer
    
    # create a default keyboard (e.g. to check for escape)
    if deviceManager.getDevice('defaultKeyboard') is None:
        deviceManager.addDevice(
            deviceClass='keyboard', deviceName='defaultKeyboard', backend='ptb'
        )
    if deviceManager.getDevice('next_key') is None:
        # initialise next_key
        next_key = deviceManager.addDevice(
            deviceClass='keyboard',
            deviceName='next_key',
        )
    if deviceManager.getDevice('key_next_1') is None:
        # initialise key_next_1
        key_next_1 = deviceManager.addDevice(
            deviceClass='keyboard',
            deviceName='key_next_1',
        )
    # return True if completed successfully
    return True

def pauseExperiment(thisExp, win=None, timers=[], currentRoutine=None):
    """
    Pause this experiment, preventing the flow from advancing to the next routine until resumed.
    
    Parameters
    ==========
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    win : psychopy.visual.Window
        Window for this experiment.
    timers : list, tuple
        List of timers to reset once pausing is finished.
    currentRoutine : psychopy.data.Routine
        Current Routine we are in at time of pausing, if any. This object tells PsychoPy what Components to pause/play/dispatch.
    """
    # if we are not paused, do nothing
    if thisExp.status != PAUSED:
        return
    
    # start a timer to figure out how long we're paused for
    pauseTimer = core.Clock()
    # pause any playback components
    if currentRoutine is not None:
        for comp in currentRoutine.getPlaybackComponents():
            comp.pause()
    # make sure we have a keyboard
    defaultKeyboard = deviceManager.getDevice('defaultKeyboard')
    if defaultKeyboard is None:
        defaultKeyboard = deviceManager.addKeyboard(
            deviceClass='keyboard',
            deviceName='defaultKeyboard',
            backend='PsychToolbox',
        )
    # run a while loop while we wait to unpause
    while thisExp.status == PAUSED:
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=['escape']):
            endExperiment(thisExp, win=win)
        # dispatch messages on response components
        if currentRoutine is not None:
            for comp in currentRoutine.getDispatchComponents():
                comp.device.dispatchMessages()
        # sleep 1ms so other threads can execute
        clock.time.sleep(0.001)
    # if stop was requested while paused, quit
    if thisExp.status == FINISHED:
        endExperiment(thisExp, win=win)
    # resume any playback components
    if currentRoutine is not None:
        for comp in currentRoutine.getPlaybackComponents():
            comp.play()
    # reset any timers
    for timer in timers:
        timer.addTime(-pauseTimer.getTime())


def run(expInfo, thisExp, win, globalClock=None, thisSession=None):
    """
    Run the experiment flow.
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    psychopy.visual.Window
        Window in which to run this experiment.
    globalClock : psychopy.core.clock.Clock or None
        Clock to get global time from - supply None to make a new one.
    thisSession : psychopy.session.Session or None
        Handle of the Session object this experiment is being run from, if any.
    """
    # mark experiment as started
    thisExp.status = STARTED
    # make sure window is set to foreground to prevent losing focus
    win.winHandle.activate()
    # make sure variables created by exec are available globally
    exec = environmenttools.setExecEnvironment(globals())
    # get device handles from dict of input devices
    ioServer = deviceManager.ioServer
    # get/create a default keyboard (e.g. to check for escape)
    defaultKeyboard = deviceManager.getDevice('defaultKeyboard')
    if defaultKeyboard is None:
        deviceManager.addDevice(
            deviceClass='keyboard', deviceName='defaultKeyboard', backend='PsychToolbox'
        )
    eyetracker = deviceManager.getDevice('eyetracker')
    # make sure we're running in the directory for this experiment
    os.chdir(_thisDir)
    # get filename from ExperimentHandler for convenience
    filename = thisExp.dataFileName
    frameTolerance = 0.001  # how close to onset before 'same' frame
    endExpNow = False  # flag for 'escape' or other condition => quit the exp
    # get frame duration from frame rate in expInfo
    if 'frameRate' in expInfo and expInfo['frameRate'] is not None:
        frameDur = 1.0 / round(expInfo['frameRate'])
    else:
        frameDur = 1.0 / 60.0  # could not measure, so guess
    
    # Start Code - component code to be run after the window creation
    
    # --- Initialize components for Routine "WelcomeScreen" ---
    welcome_message = visual.TextStim(win=win, name='welcome_message',
        text="Hello, Welcome the Image Matching study conducted by the VIDAR lab.\n\nIn this study, you will be given a query image of a hotel room, and six similar images. Your task is to select the image that is a match to the query image.\n\nPress 'SPACE' to continue.",
        font='Arial',
        pos=(0, 0), draggable=False, height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=0.0);
    next_key = keyboard.Keyboard(deviceName='next_key')
    
    # --- Initialize components for Routine "medPilot" ---
    M_query = visual.ImageStim(
        win=win,
        name='M_query', units='height', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0, 0.3), draggable=False, size=1.0,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=0.0)
    M_top_left = visual.ImageStim(
        win=win,
        name='M_top_left', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=[0,0], draggable=False, size=1.0,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-1.0)
    M_top_mid = visual.ImageStim(
        win=win,
        name='M_top_mid', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=[0,0], draggable=False, size=1.0,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-2.0)
    M_top_right = visual.ImageStim(
        win=win,
        name='M_top_right', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=[0,0], draggable=True, size=1.0,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-3.0)
    M_bot_left = visual.ImageStim(
        win=win,
        name='M_bot_left', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=[0,0], draggable=False, size=1.0,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-4.0)
    M_bot_mid = visual.ImageStim(
        win=win,
        name='M_bot_mid', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=[0,0], draggable=False, size=1.0,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-5.0)
    M_bot_right = visual.ImageStim(
        win=win,
        name='M_bot_right', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=[0,0], draggable=False, size=1.0,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-6.0)
    key_next_1 = keyboard.Keyboard(deviceName='key_next_1')
    
    # --- Initialize components for Routine "EndScreen" ---
    end_message = visual.TextStim(win=win, name='end_message',
        text='Thank you for completing! \n\nPlease wait while we save your results...',
        font='Arial',
        pos=(0, 0), draggable=False, height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=0.0);
    
    # create some handy timers
    
    # global clock to track the time since experiment started
    if globalClock is None:
        # create a clock if not given one
        globalClock = core.Clock()
    if isinstance(globalClock, str):
        # if given a string, make a clock accoridng to it
        if globalClock == 'float':
            # get timestamps as a simple value
            globalClock = core.Clock(format='float')
        elif globalClock == 'iso':
            # get timestamps in ISO format
            globalClock = core.Clock(format='%Y-%m-%d_%H:%M:%S.%f%z')
        else:
            # get timestamps in a custom format
            globalClock = core.Clock(format=globalClock)
    if ioServer is not None:
        ioServer.syncClock(globalClock)
    logging.setDefaultClock(globalClock)
    # routine timer to track time remaining of each (possibly non-slip) routine
    routineTimer = core.Clock()
    win.flip()  # flip window to reset last flip timer
    # store the exact time the global clock started
    expInfo['expStart'] = data.getDateStr(
        format='%Y-%m-%d %Hh%M.%S.%f %z', fractionalSecondDigits=6
    )
    
    # --- Prepare to start Routine "WelcomeScreen" ---
    # create an object to store info about Routine WelcomeScreen
    WelcomeScreen = data.Routine(
        name='WelcomeScreen',
        components=[welcome_message, next_key],
    )
    WelcomeScreen.status = NOT_STARTED
    continueRoutine = True
    # update component parameters for each repeat
    # create starting attributes for next_key
    next_key.keys = []
    next_key.rt = []
    _next_key_allKeys = []
    # store start times for WelcomeScreen
    WelcomeScreen.tStartRefresh = win.getFutureFlipTime(clock=globalClock)
    WelcomeScreen.tStart = globalClock.getTime(format='float')
    WelcomeScreen.status = STARTED
    WelcomeScreen.maxDuration = None
    # keep track of which components have finished
    WelcomeScreenComponents = WelcomeScreen.components
    for thisComponent in WelcomeScreen.components:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "WelcomeScreen" ---
    WelcomeScreen.forceEnded = routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *welcome_message* updates
        
        # if welcome_message is starting this frame...
        if welcome_message.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            welcome_message.frameNStart = frameN  # exact frame index
            welcome_message.tStart = t  # local t and not account for scr refresh
            welcome_message.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(welcome_message, 'tStartRefresh')  # time at next scr refresh
            # update status
            welcome_message.status = STARTED
            welcome_message.setAutoDraw(True)
        
        # if welcome_message is active this frame...
        if welcome_message.status == STARTED:
            # update params
            pass
        
        # *next_key* updates
        
        # if next_key is starting this frame...
        if next_key.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            next_key.frameNStart = frameN  # exact frame index
            next_key.tStart = t  # local t and not account for scr refresh
            next_key.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(next_key, 'tStartRefresh')  # time at next scr refresh
            # update status
            next_key.status = STARTED
            # keyboard checking is just starting
            next_key.clock.reset()  # now t=0
        if next_key.status == STARTED:
            theseKeys = next_key.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
            _next_key_allKeys.extend(theseKeys)
            if len(_next_key_allKeys):
                next_key.keys = _next_key_allKeys[-1].name  # just the last key pressed
                next_key.rt = _next_key_allKeys[-1].rt
                next_key.duration = _next_key_allKeys[-1].duration
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, win=win)
            return
        # pause experiment here if requested
        if thisExp.status == PAUSED:
            pauseExperiment(
                thisExp=thisExp, 
                win=win, 
                timers=[routineTimer, globalClock], 
                currentRoutine=WelcomeScreen,
            )
            # skip the frame we paused on
            continue
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            WelcomeScreen.forceEnded = routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in WelcomeScreen.components:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "WelcomeScreen" ---
    for thisComponent in WelcomeScreen.components:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # store stop times for WelcomeScreen
    WelcomeScreen.tStop = globalClock.getTime(format='float')
    WelcomeScreen.tStopRefresh = tThisFlipGlobal
    thisExp.nextEntry()
    # the Routine "WelcomeScreen" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    position_loop = data.TrialHandler2(
        name='position_loop',
        nReps=1.0, 
        method='random', 
        extraInfo=expInfo, 
        originPath=-1, 
        trialList=data.importConditions('resources/positions.csv'), 
        seed=None, 
    )
    thisExp.addLoop(position_loop)  # add the loop to the experiment
    thisPosition_loop = position_loop.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisPosition_loop.rgb)
    if thisPosition_loop != None:
        for paramName in thisPosition_loop:
            globals()[paramName] = thisPosition_loop[paramName]
    if thisSession is not None:
        # if running in a Session with a Liaison client, send data up to now
        thisSession.sendExperimentData()
    
    for thisPosition_loop in position_loop:
        position_loop.status = STARTED
        if hasattr(thisPosition_loop, 'status'):
            thisPosition_loop.status = STARTED
        currentLoop = position_loop
        thisExp.timestampOnFlip(win, 'thisRow.t', format=globalClock.format)
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
        # abbreviate parameter names if possible (e.g. rgb = thisPosition_loop.rgb)
        if thisPosition_loop != None:
            for paramName in thisPosition_loop:
                globals()[paramName] = thisPosition_loop[paramName]
        
        # set up handler to look after randomisation of conditions etc
        medTrial = data.TrialHandler2(
            name='medTrial',
            nReps=1.0, 
            method='random', 
            extraInfo=expInfo, 
            originPath=-1, 
            trialList=data.importConditions('resources/midLoop.csv'), 
            seed=None, 
        )
        thisExp.addLoop(medTrial)  # add the loop to the experiment
        thisMedTrial = medTrial.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisMedTrial.rgb)
        if thisMedTrial != None:
            for paramName in thisMedTrial:
                globals()[paramName] = thisMedTrial[paramName]
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
        
        for thisMedTrial in medTrial:
            medTrial.status = STARTED
            if hasattr(thisMedTrial, 'status'):
                thisMedTrial.status = STARTED
            currentLoop = medTrial
            thisExp.timestampOnFlip(win, 'thisRow.t', format=globalClock.format)
            if thisSession is not None:
                # if running in a Session with a Liaison client, send data up to now
                thisSession.sendExperimentData()
            # abbreviate parameter names if possible (e.g. rgb = thisMedTrial.rgb)
            if thisMedTrial != None:
                for paramName in thisMedTrial:
                    globals()[paramName] = thisMedTrial[paramName]
            
            # --- Prepare to start Routine "medPilot" ---
            # create an object to store info about Routine medPilot
            medPilot = data.Routine(
                name='medPilot',
                components=[M_query, M_top_left, M_top_mid, M_top_right, M_bot_left, M_bot_mid, M_bot_right, key_next_1],
            )
            medPilot.status = NOT_STARTED
            continueRoutine = True
            # update component parameters for each repeat
            M_query.setSize([img_query_disp_w, img_query_disp_h])
            M_query.setImage(img_query)
            M_top_left.setPos([pos1_x, pos1_y])
            M_top_left.setSize([sam_1_disp_w, sam_1_disp_h])
            M_top_left.setImage(sam_1)
            M_top_mid.setPos([pos2_x, pos2_y])
            M_top_mid.setSize([sam_2_disp_w, sam_2_disp_h])
            M_top_mid.setImage(sam_2)
            M_top_right.setPos([pos3_x, pos3_y])
            M_top_right.setSize([sam_3_disp_w, sam_3_disp_h])
            M_top_right.setImage(sam_3)
            M_bot_left.setPos([pos4_x, pos4_y])
            M_bot_left.setSize([sam_4_disp_w, sam_4_disp_h])
            M_bot_left.setImage(sam_4)
            M_bot_mid.setPos([pos5_x, pos5_y])
            M_bot_mid.setSize([sam_5_disp_w, sam_5_disp_h])
            M_bot_mid.setImage(sam_5)
            M_bot_right.setPos([pos6_x, pos6_y])
            M_bot_right.setSize([targ_disp_w, targ_disp_h])
            M_bot_right.setImage(img_targ)
            # create starting attributes for key_next_1
            key_next_1.keys = []
            key_next_1.rt = []
            _key_next_1_allKeys = []
            # store start times for medPilot
            medPilot.tStartRefresh = win.getFutureFlipTime(clock=globalClock)
            medPilot.tStart = globalClock.getTime(format='float')
            medPilot.status = STARTED
            medPilot.maxDuration = None
            # keep track of which components have finished
            medPilotComponents = medPilot.components
            for thisComponent in medPilot.components:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "medPilot" ---
            medPilot.forceEnded = routineForceEnded = not continueRoutine
            while continueRoutine:
                # if trial has changed, end Routine now
                if hasattr(thisMedTrial, 'status') and thisMedTrial.status == STOPPING:
                    continueRoutine = False
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *M_query* updates
                
                # if M_query is starting this frame...
                if M_query.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    M_query.frameNStart = frameN  # exact frame index
                    M_query.tStart = t  # local t and not account for scr refresh
                    M_query.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(M_query, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    M_query.status = STARTED
                    M_query.setAutoDraw(True)
                
                # if M_query is active this frame...
                if M_query.status == STARTED:
                    # update params
                    pass
                
                # *M_top_left* updates
                
                # if M_top_left is starting this frame...
                if M_top_left.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    M_top_left.frameNStart = frameN  # exact frame index
                    M_top_left.tStart = t  # local t and not account for scr refresh
                    M_top_left.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(M_top_left, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    M_top_left.status = STARTED
                    M_top_left.setAutoDraw(True)
                
                # if M_top_left is active this frame...
                if M_top_left.status == STARTED:
                    # update params
                    pass
                
                # *M_top_mid* updates
                
                # if M_top_mid is starting this frame...
                if M_top_mid.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    M_top_mid.frameNStart = frameN  # exact frame index
                    M_top_mid.tStart = t  # local t and not account for scr refresh
                    M_top_mid.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(M_top_mid, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    M_top_mid.status = STARTED
                    M_top_mid.setAutoDraw(True)
                
                # if M_top_mid is active this frame...
                if M_top_mid.status == STARTED:
                    # update params
                    pass
                
                # *M_top_right* updates
                
                # if M_top_right is starting this frame...
                if M_top_right.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    M_top_right.frameNStart = frameN  # exact frame index
                    M_top_right.tStart = t  # local t and not account for scr refresh
                    M_top_right.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(M_top_right, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    M_top_right.status = STARTED
                    M_top_right.setAutoDraw(True)
                
                # if M_top_right is active this frame...
                if M_top_right.status == STARTED:
                    # update params
                    pass
                
                # *M_bot_left* updates
                
                # if M_bot_left is starting this frame...
                if M_bot_left.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    M_bot_left.frameNStart = frameN  # exact frame index
                    M_bot_left.tStart = t  # local t and not account for scr refresh
                    M_bot_left.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(M_bot_left, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    M_bot_left.status = STARTED
                    M_bot_left.setAutoDraw(True)
                
                # if M_bot_left is active this frame...
                if M_bot_left.status == STARTED:
                    # update params
                    pass
                
                # *M_bot_mid* updates
                
                # if M_bot_mid is starting this frame...
                if M_bot_mid.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    M_bot_mid.frameNStart = frameN  # exact frame index
                    M_bot_mid.tStart = t  # local t and not account for scr refresh
                    M_bot_mid.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(M_bot_mid, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    M_bot_mid.status = STARTED
                    M_bot_mid.setAutoDraw(True)
                
                # if M_bot_mid is active this frame...
                if M_bot_mid.status == STARTED:
                    # update params
                    pass
                
                # *M_bot_right* updates
                
                # if M_bot_right is starting this frame...
                if M_bot_right.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    M_bot_right.frameNStart = frameN  # exact frame index
                    M_bot_right.tStart = t  # local t and not account for scr refresh
                    M_bot_right.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(M_bot_right, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    M_bot_right.status = STARTED
                    M_bot_right.setAutoDraw(True)
                
                # if M_bot_right is active this frame...
                if M_bot_right.status == STARTED:
                    # update params
                    pass
                
                # *key_next_1* updates
                waitOnFlip = False
                
                # if key_next_1 is starting this frame...
                if key_next_1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    key_next_1.frameNStart = frameN  # exact frame index
                    key_next_1.tStart = t  # local t and not account for scr refresh
                    key_next_1.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(key_next_1, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'key_next_1.started')
                    # update status
                    key_next_1.status = STARTED
                    # keyboard checking is just starting
                    waitOnFlip = True
                    win.callOnFlip(key_next_1.clock.reset)  # t=0 on next screen flip
                    win.callOnFlip(key_next_1.clearEvents, eventType='keyboard')  # clear events on next screen flip
                if key_next_1.status == STARTED and not waitOnFlip:
                    theseKeys = key_next_1.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
                    _key_next_1_allKeys.extend(theseKeys)
                    if len(_key_next_1_allKeys):
                        key_next_1.keys = _key_next_1_allKeys[-1].name  # just the last key pressed
                        key_next_1.rt = _key_next_1_allKeys[-1].rt
                        key_next_1.duration = _key_next_1_allKeys[-1].duration
                        # a response ends the routine
                        continueRoutine = False
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, win=win)
                    return
                # pause experiment here if requested
                if thisExp.status == PAUSED:
                    pauseExperiment(
                        thisExp=thisExp, 
                        win=win, 
                        timers=[routineTimer, globalClock], 
                        currentRoutine=medPilot,
                    )
                    # skip the frame we paused on
                    continue
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    medPilot.forceEnded = routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in medPilot.components:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "medPilot" ---
            for thisComponent in medPilot.components:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # store stop times for medPilot
            medPilot.tStop = globalClock.getTime(format='float')
            medPilot.tStopRefresh = tThisFlipGlobal
            # check responses
            if key_next_1.keys in ['', [], None]:  # No response was made
                key_next_1.keys = None
            medTrial.addData('key_next_1.keys',key_next_1.keys)
            if key_next_1.keys != None:  # we had a response
                medTrial.addData('key_next_1.rt', key_next_1.rt)
                medTrial.addData('key_next_1.duration', key_next_1.duration)
            # the Routine "medPilot" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
            # mark thisMedTrial as finished
            if hasattr(thisMedTrial, 'status'):
                thisMedTrial.status = FINISHED
            # if awaiting a pause, pause now
            if medTrial.status == PAUSED:
                thisExp.status = PAUSED
                pauseExperiment(
                    thisExp=thisExp, 
                    win=win, 
                    timers=[globalClock], 
                )
                # once done pausing, restore running status
                medTrial.status = STARTED
            thisExp.nextEntry()
            
        # completed 1.0 repeats of 'medTrial'
        medTrial.status = FINISHED
        
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
        # mark thisPosition_loop as finished
        if hasattr(thisPosition_loop, 'status'):
            thisPosition_loop.status = FINISHED
        # if awaiting a pause, pause now
        if position_loop.status == PAUSED:
            thisExp.status = PAUSED
            pauseExperiment(
                thisExp=thisExp, 
                win=win, 
                timers=[globalClock], 
            )
            # once done pausing, restore running status
            position_loop.status = STARTED
        thisExp.nextEntry()
        
    # completed 1.0 repeats of 'position_loop'
    position_loop.status = FINISHED
    
    if thisSession is not None:
        # if running in a Session with a Liaison client, send data up to now
        thisSession.sendExperimentData()
    
    # --- Prepare to start Routine "EndScreen" ---
    # create an object to store info about Routine EndScreen
    EndScreen = data.Routine(
        name='EndScreen',
        components=[end_message],
    )
    EndScreen.status = NOT_STARTED
    continueRoutine = True
    # update component parameters for each repeat
    # store start times for EndScreen
    EndScreen.tStartRefresh = win.getFutureFlipTime(clock=globalClock)
    EndScreen.tStart = globalClock.getTime(format='float')
    EndScreen.status = STARTED
    EndScreen.maxDuration = None
    # keep track of which components have finished
    EndScreenComponents = EndScreen.components
    for thisComponent in EndScreen.components:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "EndScreen" ---
    EndScreen.forceEnded = routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *end_message* updates
        
        # if end_message is starting this frame...
        if end_message.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            end_message.frameNStart = frameN  # exact frame index
            end_message.tStart = t  # local t and not account for scr refresh
            end_message.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(end_message, 'tStartRefresh')  # time at next scr refresh
            # update status
            end_message.status = STARTED
            end_message.setAutoDraw(True)
        
        # if end_message is active this frame...
        if end_message.status == STARTED:
            # update params
            pass
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, win=win)
            return
        # pause experiment here if requested
        if thisExp.status == PAUSED:
            pauseExperiment(
                thisExp=thisExp, 
                win=win, 
                timers=[routineTimer, globalClock], 
                currentRoutine=EndScreen,
            )
            # skip the frame we paused on
            continue
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            EndScreen.forceEnded = routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in EndScreen.components:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "EndScreen" ---
    for thisComponent in EndScreen.components:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # store stop times for EndScreen
    EndScreen.tStop = globalClock.getTime(format='float')
    EndScreen.tStopRefresh = tThisFlipGlobal
    thisExp.nextEntry()
    # the Routine "EndScreen" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # mark experiment as finished
    endExperiment(thisExp, win=win)


def saveData(thisExp):
    """
    Save data from this experiment
    
    Parameters
    ==========
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    """
    filename = thisExp.dataFileName
    # these shouldn't be strictly necessary (should auto-save)
    thisExp.saveAsWideText(filename + '.csv', delim='auto')
    thisExp.saveAsPickle(filename)


def endExperiment(thisExp, win=None):
    """
    End this experiment, performing final shut down operations.
    
    This function does NOT close the window or end the Python process - use `quit` for this.
    
    Parameters
    ==========
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    win : psychopy.visual.Window
        Window for this experiment.
    """
    if win is not None:
        # remove autodraw from all current components
        win.clearAutoDraw()
        # Flip one final time so any remaining win.callOnFlip() 
        # and win.timeOnFlip() tasks get executed
        win.flip()
    # return console logger level to WARNING
    logging.console.setLevel(logging.WARNING)
    # mark experiment handler as finished
    thisExp.status = FINISHED
    # run any 'at exit' functions
    for fcn in runAtExit:
        fcn()
    logging.flush()


def quit(thisExp, win=None, thisSession=None):
    """
    Fully quit, closing the window and ending the Python process.
    
    Parameters
    ==========
    win : psychopy.visual.Window
        Window to close.
    thisSession : psychopy.session.Session or None
        Handle of the Session object this experiment is being run from, if any.
    """
    thisExp.abort()  # or data files will save again on exit
    # make sure everything is closed down
    if win is not None:
        # Flip one final time so any remaining win.callOnFlip() 
        # and win.timeOnFlip() tasks get executed before quitting
        win.flip()
        win.close()
    logging.flush()
    if thisSession is not None:
        thisSession.stop()
    # terminate Python process
    core.quit()


# if running this experiment as a script...
if __name__ == '__main__':
    # call all functions in order
    expInfo = showExpInfoDlg(expInfo=expInfo)
    thisExp = setupData(expInfo=expInfo)
    logFile = setupLogging(filename=thisExp.dataFileName)
    win = setupWindow(expInfo=expInfo)
    setupDevices(expInfo=expInfo, thisExp=thisExp, win=win)
    run(
        expInfo=expInfo, 
        thisExp=thisExp, 
        win=win,
        globalClock='float'
    )
    saveData(thisExp=thisExp)
    quit(thisExp=thisExp, win=win)
