---
type: Tech
title: Develop a Custom useTimer Hook in React
date: 24 Jan 2022
thumbnail: https://miro.medium.com/max/1400/1*cN3bcQe15qNX0XW5j3r25w.png
desc: Reading the documentation has been the most missing step in every developer's journey early on. No online course or module ever explicitly mentions that the course-takers should actually take time to read the documentation of the technology they are using.
availableOn:
  - platform: Medium
    src: https://javascript.plainenglish.io/developing-a-custom-usetimer-hook-in-react-18585ea3d24
---

Timers are essential elements to several applications out there like Productivity Apps, Games, Task Management Apps, and many more. I’ve put forth a small example to create a custom `useTimer` Hook for React Applications to responsibly get around the mischievous setInterval/setTimeout function in JavaScript.

Let’s start with our boilerplate tasks:

```
npx create-react-app usetimer-hook
cd usetimer-hook

// Using VSCode for development
code . && exit

// Bash in VSCode
npm start
```

Here I’ve used CRA to set up a standard React app and opened it in VSCode while exiting the bash window. Next, using the inbuilt Bash in VSCode, I’ve started my project, which will open the browser to localhost:3000 where our React App is running. I will clear out the boilerplate stuff from the App.js file.

Next, create a useTimer.js file in our src directory.

![](https://miro.medium.com/max/1400/1*acZPRyTMSfrPffuuIKGnxA.png)

Here is the detailed explanation of our hook:

**Lines 1-10**

We’re using an inbuilt `useState` hook for multiple purposes here.

- id: This will be a state parameter to memorize the ID of the currently running Interval.
- status: This is an indicator variable to check whether the timer is currently On or Off.
- Countdown (hrs, mins, secs): An object which updates each second with the timer to indicate the amount of time left.

**Lines 14–45 (start Function)**

The start function will do just that, ie start our timer. It takes in one argument that is the total duration in seconds. Optionally, you can supply the duration in other units, and call a custom-defined conversion function on it.

For the first if block, it checks if any other timer is running. If it is, it throws an Error stating the same. In the next if block, it checks if the duration is supplied or not, or if the duration is 0, and accordingly throws an error or not.

_Inside the try block_

We define a locally scoped variable that assumes its value from our duration parameter. You can add checks to the parameter to check whether it is an integer or not. Next, we finally call an interval using the inbuilt `setInterval` function in JavaScript. Now, the `setInterval` function returns an id to uniquely identify it. The id is of Number type. Since the setInterval function is asynchronous in nature, after it is called, we directly move onto the following statements. We set our id state to the timer id, and the timer status to “ON”. We return an ‘ok’ flag to verify that the timer successfully started.

Now, inside the setInterval function, we update our countdown state after each second, by supplying the interval duration argument as 1000 milliseconds (or 1 second). We do calculations on the timer variable to obtain the hours, minutes, and seconds remaining and update those values into the countdown state.

On line 34, we first decrement the timer variable by 1 and then check if it is less than 0. If it is less than 0, we call the clear function to clear the timer.

**Lines 47–58**

Inside the clear function, we first check if there is any timer running or not, if there isn’t we simply return.

Next, using the inbuilt `clearInterval` function in JavaScript, and using our stored timer id, we clear the running interval and then refresh our state variables. Finally, we return an ‘ok’ flag again.

We then move on to returning these functions and states so defined.

# Using the Hook

![](https://miro.medium.com/max/1400/1*cN3bcQe15qNX0XW5j3r25w.png)

Using the hook is pretty simple. Simply extract our start, clear functions, and the countdown state from our `useTimer` hook, using destructuring.

In the image above, we have called the timer for 60 seconds, i.e. 1 minute.
