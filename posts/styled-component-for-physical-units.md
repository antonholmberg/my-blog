---
path: '/posts/style-components-for physical-units'
date: 2019-05-23:17:25.962Z
title: 'Getting Physical Units With Styled Components'
description: 'Getting percise physical units on the web is no walk in the park but given the right conditions is it possible'
---

Today I came across an interesting problem. I had to draw a React component in the browser and it had to be a specific width and height in centimeters.

So I naively thought that this would be as simple as setting the width and the height in css using the _cm_ unit. I quite quickly found out that this would not work. I found [this answer](https://stackoverflow.com/questions/18483955/web-and-physical-units) on stack overflow, so follow the link if you are interested in finding out why it doesn't work.

### My Initial Code

Lets start out by looking at my initial attempt:

```javascript
const SomeComponent = styled.div`
  background-color: black;
  width: 8.4cm;
  height: 2.2cm;
`;

function App() {
  return <SomeComponent />;
}
```

As previously stated this doesn't work. So let's try to fix it!

### Some Prerequisites

I found a solution that worked for me. It is not perfect but it got the job done. If anyone have a better solution I would love to hear about it!

I will assume that you are familiar with [styled-components](https://www.styled-components.com); if not, you should probably read up a bit and come back later!

A prerequisite for my solution is the fact that I knew what device the code will run on. I started out by measuring the actual screen I had. In this example I will be using a 13.3" MacBook; I was actually able to find the measurements online so no ruler was needed (11.25" x 7").

### The Solution

The first step I took was to define a variable that maps between _vw_ and centimeters. I decided to define it in a [styled-components](https://www.styled-components.com) theme since this will allow me to easily access it from anywhere in the component tree:

```javascript
function App() {
  return (
    <ThemeProvider theme={{ oneCmInVw: 100 / 28.575 }}>
      <SomeComponent />
    </ThemeProvider>
  );
}
```

So my screen is 28.575cm (11.25") wide. If I divide 100 by 28.575 I get how many _vw_ goes into one centimeter (given that the page is full screen on my 13.3" MacBook). I can now access this variable and set the actual width and height for _SomeComponent_ in centimeters.

```javascript
const SomeComponent = styled.div`
  background-color: black;
  width: ${props => props.theme.oneCmInVw * 8.4}vw;
  height: ${props => props.theme.oneCmInVw * 2.2}vw;
`;

function App() {
  return (
    <ThemeProvider theme={{ oneCmInVw: 100 / 28.575 }}>
      <SomeComponent />
    </ThemeProvider>
  );
}
```

The end result is a black box that is 84 x 22 millimeters.
