"use strict";

const hello = () => {
  console.log("Hello world!");
};

const callNTimes = (times, fn) => {
  for (let i = 0; i < times; i++) {
    fn();
  }
};

callNTimes(5, hello);
