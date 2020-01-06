import React, {useState, useEffect} from 'react';
import {PanResponder, View} from 'react-native';
import styled from 'styled-components';
const HalfHeartBox = styled.View`
  width: ${props => props.size / 2}px;
  overflow: hidden;
  transform: ${props => (props.rotate ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;
const HeartItem = styled.Image`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => (props.active ? '#ababff' : '#dfdfdf')};
`;
const Ratings = props => {
    const maxScore = 3;
    const [size, setSize] = useState(50);
    const [startPosition, setStartPosition] = useState(0);
    const [score, setScore] = useState(0);
    const [boxRef, setBoxRef] = useState(false);
    const [disableRating, setDisableRating] = useState(false);
    useEffect(() => {
        if (props.useGestureState && boxRef) {
            setTimeout(() => {
                boxRef.measure((fx, fy, width, height, px, py) => {
                    setStartPosition(px);
                });
            }, 0);
        }
    }, [props.useGestureState, boxRef]);
    useEffect(() => {
        if (props.already) {
            setScore(props.already.rating);
        }
    }, [props.already]);
    useEffect(() => {
        if (props.readonlyScore) {
            setScore(props.readonlyScore);
        }
    }, [props.readonlyScore]);
    useEffect(() => {
        if (props.size) {
            setSize(props.size);
        }
    }, [props.size]);
    const panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {},
        onPanResponderStart: (evt, gestureState) => {},
        onPanResponderMove: (evt, gestureState) => {
            if (!disableRating) {
                if (!props.readonly) {
                    let dx = 0;
                    if (props.useGestureState) {
                        dx = evt.nativeEvent.pageX - startPosition;
                    } else {
                        dx = evt.nativeEvent.pageX;
                        if (props.evenRow) {
                            dx = evt.nativeEvent.pageX - width / 2;
                        }

                        dx -= 20;
                    }

                    setScore(evaluate(dx));
                }
            }
        },
        onPanResponderRelease: (evt, gestureState) => {},
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderTerminate: (evt, gestureState) => {},
    });
    const evaluate = dx => {
        const distance = size / 2;
        let targetScore = 0;
        if (dx > 0 && dx <= distance) {
            targetScore = 0.5;
        } else if (dx > distance && dx <= distance * 2) {
            targetScore = 1.0;
        } else if (dx > distance * 2 && dx <= distance * 3) {
            targetScore = 1.5;
        } else if (dx > distance * 3 && dx <= distance * 4) {
            targetScore = 2.0;
        } else if (dx > distance * 4 && dx <= distance * 5) {
            targetScore = 2.5;
        } else if (dx > distance * 5) {
            targetScore = 3.0;
        } else {
            targetScore = 0;
        }

        return targetScore;
    };
    const render = () => {
        let items = [];
        for (let i = 1; i <= maxScore * 2; i++) {
            items.push(
                <HalfHeartBox key={i} size={size} rotate={i % 2 === 0}>
                    <HeartItem
                        source={require('../../assets/heart.png')}
                        active={score >= i / 2}
                        size={size}
                    />
                </HalfHeartBox>,
            );
        }

        return items;
    };
    return (
        <View
            style={{flexDirection: 'row'}}
            ref={r => setBoxRef(r)}
            {...panResponder.panHandlers}>
            {render()}
        </View>
    );
};

export default Ratings;
