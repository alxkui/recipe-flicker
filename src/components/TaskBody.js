import React, {Component} from 'react';
import Task from './Task';
import TaskCounter from './TaskCounter';
import firebase from '../firebase';
import Finish from './Finish';
import NoSleep from 'nosleep.js';

var noSleep = new NoSleep();
let synth = window.speechSynthesis;

//Check if its chrome
var is_chrome = ((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) &&(navigator.vendor.toLowerCase().indexOf("google") > -1) && (!navigator.userAgent.match('CriOS')));

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = is_chrome ? new SpeechRecognition() : null;

if(is_chrome) {
    recognition.continuous = true;
}


const taskList = {
    preparing: []
};

const colorList = [
    "linear-gradient(to right, #8e2de2, #4a00e0)",
    "linear-gradient(to right, #ff0099, #493240)"
];

document.addEventListener('click', function enableNoSleep() {
    document.removeEventListener('click', enableNoSleep, false);
    noSleep.enable();
}, false);

class TaskBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            recipeTitle: null,
            bgColor: 0,
            isFinished: false,
            speaking: false,
            voice: false,
            chrome: is_chrome ? true : false
        }
        this.incrementStep = this.incrementStep.bind(this);
        this.decrementStep = this.decrementStep.bind(this);
        this.handleSpeech = this.handleSpeech.bind(this);
        this.handleVoice = this.handleVoice.bind(this);
    }

    // Speech Recognition

    voiceCommands() {
        recognition.onstart = () => {
            console.log('Voice is activated');
        }
        
        recognition.onresult = (e) => {
            const current = e.resultIndex;
            let transcript = e.results[current][0].transcript;
            let mobileRepeatBug = (current === 1 && transcript === e.results[0][0].transcript);

            if(!mobileRepeatBug) {
                if(transcript === 'next' || transcript === ' next') {
                    this.incrementStep();
                }
    
                if(transcript === 'back' || transcript === ' back') {
                    this.decrementStep();
                }
            }

            setTimeout(() => {
                recognition.start();
            }, 50);

        }

        recognition.onspeechend = () => {
            recognition.stop();
            console.log('voice stopped');
        }
    }

    componentDidUpdate() {
        if(this.state.voice) {
            this.voiceCommands();
        }

    }

    speak(utterance) {
        let speech = new SpeechSynthesisUtterance(utterance);
        if(this.state.speaking) {
            synth.speak(speech);
        }
    }

    componentDidMount(props) {
        const id = this.props.match.params.id;
        
        let docRef = firebase.firestore().collection('recipes').doc(id);
        docRef.get().then((doc) => {
            if(doc.exists) {
                let data = doc.data();

                taskList.preparing = data.preparing;

                this.setState({
                    recipeTitle: data.title,
                });
                this.speak(data.preparing[0]);
            }
        });

        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
        
    }

    componentWillUnmount() {
        document.body.style.overflow = "scroll";
        synth.cancel();
    }

    decrementStep = () => {
        this.setState({
            step: this.state.step !== 0 ? this.state.step - 1 : this.state.step = 0,
        });

        synth.cancel();
        this.speak(taskList.preparing[this.state.step - 1]);
        
    }

    incrementStep = () => {
        this.setState({
            step: this.state.step + 1,
        });

        if(this.state.step >= taskList.preparing.length - 1) {
            this.setState({
                isFinished: !this.state.isFinished
            });
        }

        synth.cancel();
        this.speak(taskList.preparing[this.state.step + 1]);
        
    }

    handleSpeech() {
        // CALLBACK FUNCTIONS ARE AWESOME
        this.setState({
            speaking: !this.state.speaking
        },() => {
            if(this.state.speaking) {
                this.speak(taskList.preparing[this.state.step]);
            }
        });
    }

    handleVoice() {
        this.setState({
            voice: !this.state.voice
        }, () => {
            if(this.state.voice) {
                recognition.start();
                console.log("Voice started");
            } else {
                recognition.stop();
            }
        });
    }

    render() {
        return (
            <div>
            <div style={{background: colorList[this.state.bgColor]}} className="task-body">

                <div onClick={this.handleSpeech} className="speak-button">
                    {this.state.speaking ? <i className="fas fa-volume-up"></i> : <i className="fas fa-volume-mute"></i> }
                </div>

                { this.state.chrome ?
                <div onClick={this.handleVoice} className="micrphone-button">
                    {this.state.voice ? <i className="fas fa-microphone"></i> : <i className="fas fa-microphone-slash"></i> }
                </div>
                : null }

                <div className="panel left" onClick={this.decrementStep}></div>
                <div className="panel right" onClick={this.incrementStep}></div>
                
                <span className="current-task">Preparing</span>
                {this.state.voice ? <span className="help">Commands: 'next' or 'back'</span> : ''}

                <TaskCounter taskNo={this.state.step + 1} allTasks={taskList.preparing.length} />
                <Task taskName={taskList.preparing[this.state.step]}/>
            </div>

                {this.state.isFinished ? <Finish /> : null}

            </div>
        );
    }

}

export default TaskBody;
