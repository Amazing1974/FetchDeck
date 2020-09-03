import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  Animated, Alert,
} from 'react-native';
import { Palette, GlobalStyles } from '../styles';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const ProgressBar = forwardRef((props, ref) => {
  
  const [progress, setProgress] = useState(0);
  const [isSold, setSold] = useState(false);
  let animation = useRef(new Animated.Value(0));

  useImperativeHandle(ref, () => ({
    resetProgressBar() {
      setProgress(0)
    }
  }));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 0,
      useNativeDriver: false
    }).start();
  },[progress]);

  const width = animation.current.interpolate({
    inputRange: [0, 300],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  });


  useInterval(() => {
    if(props.current_bid < props.price) {
      if(progress < props.reserve) {
        setProgress(progress + 1);
      } else {
        props.onChangeBuyer();
        props.onBid();
        setProgress(0);
      }
    } else {
      if(progress < 300) {
        setProgress(progress + 1);
      } else {
        props.onSold();
        setSold(true);
      }
    }
  }, !isSold ? 200 : null);

  return (    
    <Animated.View style={[styles.progress, {width}, progress > 296 ? { borderBottomRightRadius: 4 } : null ]}/>
  )
});

export default ProgressBar;

const styles = {  
  progress: {
    borderBottomLeftRadius: 4,
    backgroundColor: Palette.purple,
    height: '100%'
  },
}