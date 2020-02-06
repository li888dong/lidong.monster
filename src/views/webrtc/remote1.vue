<template>
    <div class="remote1">
        <div class="shade" v-if="!isJoin">

            <div class="input-container">
                <mt-field state="success" v-model="account" placeholder="请输入你的昵称" @keyup.enter="handleKey"></mt-field>
                <!--<input type="text" v-model="account" placeholder="请输入你的昵称" @keyup.enter="join">-->
                <mt-button type="primary" @click="join">确定</mt-button>
                <!--<button>确定</button>-->
            </div>
        </div>
        <div class="userList">
            <h5>在线用户：{{userList.length}}</h5>
            <p v-for="uname in userList" :key="uname">
                {{uname}}
                <i v-if="uname === myUsername || uname === isCall">
                    {{uname === account ? 'me' : ''}}
                    {{uname === isCall ? 'calling' : ''}}
                </i>
                <span @click="invite(uname)"
                      v-if="uname !== myUsername && uname !== isCall">呼叫 {{uname}}</span>
            </p>
        </div>
        <div class="video-container" v-show="isToPeer">
            <div>
                <video src="" id="rtcA" controls autoplay></video>
                <h5>{{myUsername}}</h5>
                <button @click="hangUpCall">挂断</button>
            </div>
            <div>
                <video src="" id="rtcB" controls autoplay></video>
                <h5>{{targetUsername}}</h5>
            </div>
        </div>

    </div>
</template>
<script>
    // require('webrtc-adapter');

    export default {
        name: 'remote1',
        data() {
            return {
                account: window.sessionStorage.account || '',
                isJoin: false,
                userList: [],
                roomid: 'webrtc_1v1', // 指定房间ID
                isCall: false, // 正在通话的对象
                loading: false,
                loadingText: '呼叫中',
                isToPeer: false, // 是否建立了 P2P 连接
                peer: null,
                offerOption: {
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1
                },
                connection: '',
                clientID: 0,
                mediaConstraints: {
                    audio: true,            // We want an audio track
                    video: {
                        width: 640,
                        height: 480,
                        aspectRatio: {
                            ideal: 1.333333     // 3:2 aspect is preferred
                        }
                    }
                },


                myUsername: '',
                targetUsername: '',   // To store username of other peer
                myPeerConnection: '',// RTCPeerConnection
                transceiver: '',     // RTCRtpTransceiver
                webcamStream: ''     //MediaStream from webcam
            }
        },
        computed: {
            myHostname() {
                return 'lidong.monster' || window.location.hostname || 'localhost'
            }
        },
        methods: {
            join() {
                if (!this.account) return;
                this.isJoin = true;
                window.sessionStorage.account = this.account;
                this.connect()
            },

            // Open and configure the connection to the WebSocket server.
            connect() {
                var serverUrl;
                var scheme = "ws";

                // If this is an HTTPS connection, we have to use a secure WebSocket
                // connection too, so add another "s" to the scheme.

                // if (document.location.protocol === "https:") {
                //     scheme += "s";
                // }
                serverUrl = scheme + "://" + this.myHostname + "/socket";

                this.log(`Connecting to server: ${serverUrl}`);
                this.connection = new WebSocket(serverUrl, "json");

                this.connection.onopen = (evt) => {
                    // document.getElementById("text").disabled = false;
                    // document.getElementById("send").disabled = false;
                };

                this.connection.onerror = (evt) => {
                    console.dir(evt);
                };

                this.connection.onmessage = (evt) => {
                    // var chatBox = document.querySelector(".chatbox");
                    var text = "";
                    var msg = JSON.parse(evt.data);
                    this.log("Message received: ");
                    console.dir(msg);
                    var time = new Date(msg.date);
                    var timeStr = time.toLocaleTimeString();

                    switch (msg.type) {
                        case "id":
                            this.clientID = msg.id;
                            this.setUsername();
                            break;

                        case "username":
                            text = "<b>User <em>" + msg.name + "</em> signed in at " + timeStr + "</b><br>";
                            break;

                        case "message":
                            text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
                            break;

                        case "rejectusername":
                            this.myUsername = msg.name;
                            text = "<b>Your username has been set to <em>" + this.myUsername +
                                "</em> because the name you chose is in use.</b><br>";
                            break;

                        case "userlist":      // Received an updated user list
                            this.handleUserlistMsg(msg);
                            break;

                        // Signaling messages: these messages are used to trade WebRTC
                        // signaling information during negotiations leading up to a video
                        // call.

                        case "video-offer":  // Invitation and offer to chat
                            this.handleVideoOfferMsg(msg);
                            break;

                        case "video-answer":  // Callee has answered our offer
                            this.handleVideoAnswerMsg(msg);
                            break;

                        case "new-ice-candidate": // A new ICE candidate has been received
                            this.handleNewICECandidateMsg(msg);
                            break;

                        case "hang-up": // The other peer has hung up the call
                            this.handleHangUpMsg(msg);
                            break;

                        // Unknown message; output to console for debugging.

                        default:
                            this.log_error("Unknown message received:");
                            this.log_error(msg);
                    }

                    // If there's text to insert into the chat buffer, do so now, then
                    // scroll the chat panel so that the new text is visible.

                    // if (text.length) {
                    //     chatBox.innerHTML += text;
                    //     chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
                    // }
                };
            },

            log(text) {
                var time = new Date();

                console.log("[" + time.toLocaleTimeString() + "] " + text);
            },

            log_error(text) {
                var time = new Date();

                console.trace("[" + time.toLocaleTimeString() + "] " + text);
            },

            // Send a JavaScript object by converting it to JSON and sending
            // it as a message on the WebSocket connection.
            sendToServer(msg) {
                var msgJSON = JSON.stringify(msg);

                this.log("Sending '" + msg.type + "' message: " + msgJSON);
                this.connection.send(msgJSON);
            },

            // Called when the "id" message is received; this message is sent by the
            // server to assign this login session a unique ID number; in response,
            // this function sends a "username" message to set our username for this
            // session.
            setUsername() {
                this.myUsername = this.account;
                this.sendToServer({
                    name: this.myUsername,
                    date: Date.now(),
                    id: this.clientID,
                    type: "username"
                });
            },

            // Handles a click on the Send button (or pressing return/enter) by
            // building a "message" object and sending it to the server.
            handleSendButton() {
                var msg = {
                    text: document.getElementById("text").value,
                    type: "message",
                    id: this.clientID,
                    date: Date.now()
                };
                this.sendToServer(msg);
                document.getElementById("text").value = "";
            },
            // Handler for keyboard events. This is used to intercept the return and
            // enter keys so that we can call send() to transmit the entered text
            // to the server.
            handleKey(evt) {
                if (evt.keyCode === 13 || evt.keyCode === 14) {
                    if (!document.getElementById("send").disabled) {
                        this.handleSendButton();
                    }
                }
            },

            // Create the RTCPeerConnection which knows how to talk to our
            // selected STUN/TURN server and then uses getUserMedia() to find
            // our camera and microphone and add that stream to the connection for
            // use in our video call. Then we configure event handlers to get
            // needed notifications on the call.

            async createPeerConnection() {
                this.log("Setting up a connection...");

                // Create an RTCPeerConnection which knows to use our chosen
                // STUN server.
                this.myPeerConnection = new RTCPeerConnection({
                    iceServers: [     // Information about ICE servers - Use your own!
                        {
                            urls: "turn:" + this.myHostname,  // A TURN server
                            username: "webrtc",
                            credential: "turnserver"
                        }
                    ]
                });

                // Set up event handlers for the ICE negotiation process.

                this.myPeerConnection.onicecandidate = this.handleICECandidateEvent;
                this.myPeerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
                this.myPeerConnection.onicegatheringstatechange = this.handleICEGatheringStateChangeEvent;
                this.myPeerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
                this.myPeerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent;
                this.myPeerConnection.ontrack = this.handleTrackEvent;


                this.isToPeer = true;

            },

            // Called by the WebRTC layer to let us know when it's time to
            // begin, resume, or restart ICE negotiation.

            async handleNegotiationNeededEvent() {
                this.log("*** Negotiation needed");

                try {
                    this.log("---> Creating offer");
                    const offer = await this.myPeerConnection.createOffer();

                    // If the connection hasn't yet achieved the "stable" state,
                    // return to the caller. Another negotiationneeded event
                    // will be fired when the state stabilizes.

                    if (this.myPeerConnection.signalingState != "stable") {
                        this.log("     -- The connection isn't stable yet; postponing...")
                        return;
                    }

                    // Establish the offer as the local peer's current
                    // description.

                    this.log("---> Setting local description to the offer");
                    await this.myPeerConnection.setLocalDescription(offer);

                    // Send the offer to the remote peer.

                    this.log("---> Sending the offer to the remote peer");
                    this.sendToServer({
                        name: this.myUsername,
                        target: this.targetUsername,
                        type: "video-offer",
                        sdp: this.myPeerConnection.localDescription
                    });
                } catch (err) {
                    this.log("*** The following error occurred while handling the negotiationneeded event:");
                    this.reportError(err);
                }
            },

            // Called by the WebRTC layer when events occur on the media tracks
            // on our WebRTC call. This includes when streams are added to and
            // removed from the call.
            //
            // track events include the following fields:
            //
            // RTCRtpReceiver       receiver
            // MediaStreamTrack     track
            // MediaStream[]        streams
            // RTCRtpTransceiver    transceiver
            //
            // In our case, we're just taking the first stream found and attaching
            // it to the <video> element for incoming media.

            handleTrackEvent(event) {
                this.log("*** Track event");
                document.getElementById("rtcB").srcObject = event.streams[0];
            },


            // Handles |icecandidate| events by forwarding the specified
            // ICE candidate (created by our local ICE agent) to the other
            // peer through the signaling server.

            handleICECandidateEvent(event) {
                if (event.candidate) {
                    this.log("*** Outgoing ICE candidate: " + event.candidate.candidate);

                    this.sendToServer({
                        type: "new-ice-candidate",
                        target: this.targetUsername,
                        candidate: event.candidate
                    });
                }
            },

            // Handle |iceconnectionstatechange| events. This will detect
            // when the ICE connection is closed, failed, or disconnected.
            //
            // This is called when the state of the ICE agent changes.

            handleICEConnectionStateChangeEvent(event) {
                this.log("*** ICE connection state changed to " + this.myPeerConnection.iceConnectionState);

                switch (this.myPeerConnection.iceConnectionState) {
                    case "closed":
                    case "failed":
                    case "disconnected":
                        this.closeVideoCall();
                        break;
                }
            },

            // Set up a |signalingstatechange| event handler. This will detect when
            // the signaling connection is closed.
            //
            // NOTE: This will actually move to the new RTCPeerConnectionState enum
            // returned in the property RTCPeerConnection.connectionState when
            // browsers catch up with the latest version of the specification!

            handleSignalingStateChangeEvent(event) {
                this.log("*** WebRTC signaling state changed to: " + this.myPeerConnection.signalingState);
                switch (this.myPeerConnection.signalingState) {
                    case "closed":
                        this.closeVideoCall();
                        break;
                }
            },

            // Handle the |icegatheringstatechange| event. This lets us know what the
            // ICE engine is currently working on: "new" means no networking has happened
            // yet, "gathering" means the ICE engine is currently gathering candidates,
            // and "complete" means gathering is complete. Note that the engine can
            // alternate between "gathering" and "complete" repeatedly as needs and
            // circumstances change.
            //
            // We don't need to do anything when this happens, but we log it to the
            // console so you can see what's going on when playing with the sample.

            handleICEGatheringStateChangeEvent(event) {
                this.log("*** ICE gathering state changed to: " + this.myPeerConnection.iceGatheringState);
            },

            // Given a message containing a list of usernames, this function
            // populates the user list box with those names, making each item
            // clickable to allow starting a video call.

            handleUserlistMsg(msg) {


                // Add member names from the received list.
                this.userList = msg.users;
                // msg.users.forEach(function (username) {
                //     var item = document.createElement("li");
                //     item.appendChild(document.createTextNode(username));
                //     item.addEventListener("click", invite, false);
                //
                //     listElem.appendChild(item);
                // });
            },

            // Close the RTCPeerConnection and reset variables so that the user can
            // make or receive another call if they wish. This is called both
            // when the user hangs up, the other user hangs up, or if a connection
            // failure is detected.

            closeVideoCall() {
                var localVideo = document.getElementById("rtcA");

                this.log("Closing the call");

                // Close the RTCPeerConnection

                if (this.myPeerConnection) {
                    this.log("--> Closing the peer connection");

                    // Disconnect all our event listeners; we don't want stray events
                    // to interfere with the hangup while it's ongoing.

                    this.myPeerConnection.ontrack = null;
                    this.myPeerConnection.onnicecandidate = null;
                    this.myPeerConnection.oniceconnectionstatechange = null;
                    this.myPeerConnection.onsignalingstatechange = null;
                    this.myPeerConnection.onicegatheringstatechange = null;
                    this.myPeerConnection.onnotificationneeded = null;

                    // Stop all transceivers on the connection
                    this.myPeerConnection.getTransceivers().forEach(transceiver => {
                        transceiver.stop();
                    });

                    // Stop the webcam preview as well by pausing the <video>
                    // element, then stopping each of the getUserMedia() tracks
                    // on it.

                    if (localVideo.srcObject) {
                        localVideo.pause();
                        localVideo.srcObject.getTracks().forEach(track => {
                            track.stop();
                        });
                    }

                    // Close the peer connection

                    this.myPeerConnection.close();
                    this.myPeerConnection = null;
                    this.webcamStream = null;
                }

                // Disable the hangup button

                this.targetUsername = null;
            },

            // Handle the "hang-up" message, which is sent if the other peer
            // has hung up the call or otherwise disconnected.

            handleHangUpMsg(msg) {
                this.log("*** Received hang up notification from other peer");
                this.isToPeer = false;
                this.closeVideoCall();
            },

            // Hang up the call by closing our end of the connection, then
            // sending a "hang-up" message to the other peer (keep in mind that
            // the signaling is done on a different connection). This notifies
            // the other peer that the connection should be terminated and the UI
            // returned to the "no call in progress" state.

            hangUpCall() {
                this.closeVideoCall();

                this.sendToServer({
                    name: this.myUsername,
                    target: this.targetUsername,
                    type: "hang-up"
                });
            },

            // Handle a click on an item in the user list by inviting the clicked
            // user to video chat. Note that we don't actually send a message to
            // the callee here -- calling RTCPeerConnection.addTrack() issues
            // a |notificationneeded| event, so we'll let our handler for that
            // make the offer.

            async invite(uname) {
                this.log("Starting to prepare an invitation");
                if (this.myPeerConnection) {
                    alert("You can't start a call because you already have one open!");
                } else {
                    var clickedUsername = uname;

                    // Don't allow users to call themselves, because weird.

                    if (clickedUsername === this.myUsername) {
                        alert("I'm afraid I can't let you talk to yourself. That would be weird.");
                        return;
                    }

                    // Record the username being called for future reference

                    this.targetUsername = clickedUsername;
                    this.log("Inviting user " + this.targetUsername);

                    // Call createPeerConnection() to create the RTCPeerConnection.
                    // When this returns, myPeerConnection is our RTCPeerConnection
                    // and webcamStream is a stream coming from the camera. They are
                    // not linked together in any way yet.

                    this.log("Setting up connection to invite user: " + this.targetUsername);
                    this.createPeerConnection();

                    // Get access to the webcam stream and attach it to the
                    // "preview" box (id "local_video").

                    try {
                        this.webcamStream = await navigator.mediaDevices.getUserMedia(this.mediaConstraints);
                        document.getElementById("rtcA").srcObject = this.webcamStream;
                    } catch (err) {
                        this.handleGetUserMediaError(err);
                        return;
                    }

                    // Add the tracks from the stream to the RTCPeerConnection

                    try {
                        this.webcamStream.getTracks().forEach(
                            this.transceiver = track => this.myPeerConnection.addTransceiver(track, {streams: [this.webcamStream]})
                        );
                    } catch (err) {
                        this.handleGetUserMediaError(err);
                    }
                }
            },

            // Accept an offer to video chat. We configure our local settings,
            // create our RTCPeerConnection, get and attach our local camera
            // stream, then create and send an answer to the caller.

            async handleVideoOfferMsg(msg) {
                this.targetUsername = msg.name;

                // If we're not already connected, create an RTCPeerConnection
                // to be linked to the caller.

                this.log("Received video chat offer from " + this.targetUsername);
                if (!this.myPeerConnection) {
                    this.createPeerConnection();
                }

                // We need to set the remote description to the received SDP offer
                // so that our local WebRTC layer knows how to talk to the caller.

                var desc = new RTCSessionDescription(msg.sdp);

                // If the connection isn't stable yet, wait for it...

                if (this.myPeerConnection.signalingState != "stable") {
                    this.log("  - But the signaling state isn't stable, so triggering rollback");

                    // Set the local and remove descriptions for rollback; don't proceed
                    // until both return.
                    await Promise.all([
                        this.myPeerConnection.setLocalDescription({type: "rollback"}),
                        this.myPeerConnection.setRemoteDescription(desc)
                    ]);
                    return;
                } else {
                    this.log("  - Setting remote description");
                    await this.myPeerConnection.setRemoteDescription(desc);
                }

                // Get the webcam stream if we don't already have it

                if (!this.webcamStream) {
                    try {
                        this.webcamStream = await navigator.mediaDevices.getUserMedia(this.mediaConstraints);
                    } catch (err) {
                        this.handleGetUserMediaError(err);
                        return;
                    }

                    document.getElementById("rtcA").srcObject = this.webcamStream;

                    // Add the camera stream to the RTCPeerConnection

                    try {
                        this.webcamStream.getTracks().forEach(
                            this.transceiver = track => this.myPeerConnection.addTransceiver(track, {streams: [this.webcamStream]})
                        );
                    } catch (err) {
                        this.handleGetUserMediaError(err);
                    }
                }

                this.log("---> Creating and sending answer to caller");

                await this.myPeerConnection.setLocalDescription(await this.myPeerConnection.createAnswer());

                this.sendToServer({
                    name: this.myUsername,
                    target: this.targetUsername,
                    type: "video-answer",
                    sdp: this.myPeerConnection.localDescription
                });
            },

            // Responds to the "video-answer" message sent to the caller
            // once the callee has decided to accept our request to talk.

            async handleVideoAnswerMsg(msg) {
                this.log("*** Call recipient has accepted our call");

                // Configure the remote description, which is the SDP payload
                // in our "video-answer" message.

                var desc = new RTCSessionDescription(msg.sdp);
                await this.myPeerConnection.setRemoteDescription(desc).catch(reportError);
            },

            // A new ICE candidate has been received from the other peer. Call
            // RTCPeerConnection.addIceCandidate() to send it along to the
            // local ICE framework.

            async handleNewICECandidateMsg(msg) {
                var candidate = new RTCIceCandidate(msg.candidate);

                this.log("*** Adding received ICE candidate: " + JSON.stringify(candidate));
                try {
                    await this.myPeerConnection.addIceCandidate(candidate)
                } catch (err) {
                    this.reportError(err);
                }
            },


            // Handle errors which occur when trying to access the local media
            // hardware; that is, exceptions thrown by getUserMedia(). The two most
            // likely scenarios are that the user has no camera and/or microphone
            // or that they declined to share their equipment when prompted. If
            // they simply opted not to share their media, that's not really an
            // error, so we won't present a message in that situation.

            handleGetUserMediaError(e) {
                this.log_error(e);
                switch (e.name) {
                    case "NotFoundError":
                        alert("Unable to open your call because no camera and/or microphone" +
                            "were found.");
                        break;
                    case "SecurityError":
                    case "PermissionDeniedError":
                        // Do nothing; this is the same as the user canceling the call.
                        break;
                    default:
                        alert("Error opening your camera and/or microphone: " + e.message);
                        break;
                }

                // Make sure we shut down our end of the RTCPeerConnection so we're
                // ready to try again.

                this.closeVideoCall();
            },

            // Handles reporting errors. Currently, we just dump stuff to console but
            // in a real-world application, an appropriate (and user-friendly)
            // error message should be displayed.

            reportError(errMessage) {
                this.log_error(`Error ${errMessage.name}: ${errMessage.message}`);
            }


        },
        mounted() {


        }
    }
</script>
<style lang="scss" scoped>
    .remote1 {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
    }

    .shade {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.9);
        .input-container {
            position: absolute;
            left: 50%;
            top: 30%;
            transform: translate(-50%, 50%);
            display: flex;
            justify-content: space-between;
            align-items: center;
            input {
                margin: 0;
            }
        }
    }

    .userList {
        border: 1px solid #ddd;
        width: 100%;
        h5 {
            text-align: left;
            margin-bottom: 5px;
        }
        p {
            border-bottom: 1px solid #ddd;
            line-height: 40px;
            margin: 10px 0;
            width: 100%;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            span {
                position: absolute;
                left: 0;
                top: 100%;
                background-color: #1fbeca;
                color: #fff;
                height: 100%;
                transition: top 0.2s;
                display: block;
                width: 100%;
            }
            i {
                font-style: normal;
                font-size: 11px;
                border: 1px solid #1fbeca;
                color: #27cac7;
                border-radius: 2px;
                line-height: 1;
                display: block;
                position: absolute;
                padding: 1px 2px;
                right: 5px;
                top: 5px;
            }
        }
        p:last-child {
            border-bottom: none;
        }
        p:hover span {
            top: 0;
        }
    }

    .video-container {
        display: flex;
        flex-flow: column;
        justify-content: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;
        button {
            background-color: brown;
        }
        video{
            width: 100%;
        }
        #rtcA {
            width: 100%;
            background-color: #ddd;
        }
    }
</style>