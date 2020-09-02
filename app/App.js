import React, { Component } from 'react';
import { StyleSheet,Text,View, TouchableHighlight } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

var message = 'Take A Break!';
var work = true;
var workInterval = 4000;
var breakInterval = 2000;
var numTime = 4000;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimerStart: false,
      workTime: true,
      timerDuration: 4000,
      resetTimer: false,
    };
    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.lowKeyResetTimer = this.lowKeyResetTimer.bind(this);
  }
  startStopTimer() {
    this.setState({isTimerStart: !this.state.isTimerStart, resetTimer: false});
  }
  resetTimer() {
    this.setState({isTimerStart: false, resetTimer: true});
  }
  lowKeyResetTimer() {
    this.setState({isTimerStart: false, resetTimer: true, workTime: !this.state.workTime, timerDuration: numTime});
    if (this.state.workTime == true) {
      message = 'Get Back To Work!'
      numTime = workInterval
    }
    else {
      message = 'Take A Break!'
      numTime = breakInterval
    }
  }
  getFormattedTime(time) {
      this.currentTime = time;
  }
  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize: 50, margin: 50, textAlign: 'center', fontWeight: 'bold'}}>Pomodoro Timer</Text>
        <Text style={{fontSize: 20, marginBottom: 10}}>{this.state.workTime ? "Work Time" : "Break"}</Text>
        <Timer 
          totalDuration={this.state.timerDuration} msecs 
          start={this.state.isTimerStart}
          reset={this.state.resetTimer}
          lowKeyReset={this.state.lowKeyResetTimer}
          options={options}
          handleFinish={handleTimerComplete}
          getTime={this.getFormattedTime} />
        <View style={{flexDirection: 'row'}}><TouchableHighlight onPress={this.startStopTimer} style={options.startButton}>
          <Text style={options.startButtonText}>
             {!this.state.isTimerStart ? "START" : "STOP"}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.resetTimer} style={options.resetButton}>
          <Text style={options.resetButtonText}>RESET</Text>
        </TouchableHighlight></View>
        <TouchableHighlight onPress={this.lowKeyResetTimer} style={options.switchButton}>
          <Text style={options.switchButtonText}>SWITCH</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
 
const handleTimerComplete = () => alert(message);
const options = {
  container: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 20,
    width: 200,
    alignItems:'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
  resetButtonText: {
    fontSize: 20,
    color: 'orange',
    margin: 10
  },
  resetButton: {
    borderWidth: 5,
    borderRadius: 20,
    borderColor: 'orange',
    margin: 10,
    marginTop: 20,
  },
  startButtonText: {
    fontSize: 20,
    color: 'green',
    margin: 10
  },
  startButton: {
    borderWidth: 5,
    borderRadius: 20,
    borderColor: 'green',
    margin: 10,
    marginTop: 20,
  },
  switchButtonText: {
    fontSize: 20,
    color: 'pink',
    margin: 10
  },
  switchButton: {
    borderWidth: 5,
    borderRadius: 20,
    borderColor: 'pink',
    margin: 10,
    marginTop: 20,
  },
};