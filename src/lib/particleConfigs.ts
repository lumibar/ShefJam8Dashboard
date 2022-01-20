export const starBackground = {
    background: {
        color: "#0c1445"
    },
    detectRetina: false,
    fpsLimit: 30,
    interactivity: {
        detectsOn: "canvas",
        events: {
            resize: true
        }
    },
    fullScreen: {
        enable: true,
        zIndex: -10
    },
    particles: {
        color: {
            value: "#fff"
        },
        number: {
            density: {
                enable: true,
                area: 1080
            },
            limit: 0,
            value: 400
        },
        opacity: {
            animation: {
                enable: true,
                minimumValue: 0.05,
                speed: 0.5,
                sync: false
            },
            random: {
                enable: true,
                minimumValue: 0.05
            },
            value: 1
        },
        shape: {
            type: "circle"
        },
        size: {
            random: {
                enable: true,
                minimumValue: 0.5
            },
            value: 1
        }
    }
};

export const confettiCorners = {
    fullScreen: {
        zIndex: 20
    },
    particles: {
        bounce: {
            horizontal: {
                value: 0
            },
            vertical: {
                value: 0
            }
        },
        color: {
            value: [
                "#1E00FF",
                "#FF0061",
                "#E1FF00",
                "#00FF9E"
            ],
            animation: {
                h: {
                    enable: true,
                    speed: 30
                }
            }
        },
        move: {
            decay: 0.1,
            direction: "top",
            enable: true,
            gravity: {
                enable: true,
                maxSpeed: 150
            },
            outModes: {
                default: "destroy",
                bottom: "bounce",
                left: "destroy",
                right: "destroy",
                top: "none"
            },
            "speed": {
                "min": 25,
                "max": 75
            },
            "angle": {
                "value": 15
            }
        },
        "number": {
            "limit": 250,
            "value": 0
        },
        "opacity": {
            "animation": {
                "speed": 0.3,
                "sync": true,
                "destroy": "min",
                "startValue": "max"
            }
        },
        "roll": {
            "darken": {
                "enable": true,
                "value": 30
            },
            "enable": true,
            "enlighten": {
                "enable": true,
                "value": 30
            },
            "speed": {
                "min": 15,
                "max": 25
            }
        },
        "rotate": {
            "value": {
                "min": 0,
                "max": 360
            },
            "animation": {
                "enable": true,
                "speed": 60
            },
            "direction": "random"
        },
        "shape": {
            "options": {
                "polygon": [
                    {
                        "sides": 5
                    },
                    {
                        "sides": 6
                    }
                ],
                "character": [
                    {
                        "value": [
                            "💩",
                            "🤡",
                            "🍀",
                            "🍙"
                        ]
                    }
                ]
            },
            "type": [
                "circle",
                "square",
                "polygon",
                "character",
                "character",
                "character"
            ]
        },
        "tilt": {
            "value": {
                "min": 0,
                "max": 360
            },
            "animation": {
                "enable": true,
                "speed": 60
            },
            "direction": "random",
            "enable": true
        },
        "wobble": {
            "distance": 30,
            "enable": true,
            "speed": {
                "min": -15,
                "max": 15
            }
        }
    },
    "emitters": [{
        "autoPlay": true,
        "fill": true,
        "life": {
            "wait": false
        },
        "rate": {
            "quantity": 5,
            "delay": 0.15
        },
        "shape": "square",
        "startCount": 0,
        "size": {
            "mode": "percent",
            "height": 0,
            "width": 0
        },
        "rotate": {
            "value": 45,
            "direction": "clockwise"
        },
        "position": {
            "x": 0,
            "y": 100
        },
        "particles": {
            "move": {
                "angle": {
                    "offset": 50,
                    "direction": "clockwise"
                }
            }
        }
    },
    {
        "autoPlay": true,
        "fill": true,
        "life": {
            "wait": false
        },
        "rate": {
            "quantity": 5,
            "delay": 0.15
        },
        "shape": "square",
        "startCount": 0,
        "size": {
            "mode": "percent",
            "height": 0,
            "width": 0
        },
        "rotate": {
            "value": 45,
        },
        "position": {
            "x": 100,
            "y": 100
        },
        "particles": {
            "move": {
                "angle": {
                    "offset": 310,
                }
            }
        }
    },
    ]
}