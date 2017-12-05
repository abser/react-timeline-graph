# React-TimeLine-Graph

This library help you to create Timeline graph Vertically and Horizontally(Comming soon ..).
#Installation:
```sh
  npm i react-timeline-graph --save
 ```

# Use
```sh
import React, { Component } from 'react';
.......
import {VerticalTimeLine} from 'react-timeline-graph';
import {data} from './data'; // Sample data

class App extends Component {
  render() {
    return (
      <div className="App">
       <VerticalTimeLine
        sessions={data} 
        />
      </div>
    );
  }
}

export default App;
```

# Sample Data to test (data.js)
Ideally the data will load from props. Here I am showing sample json with expected data fields.
```sh
const data = [
	{
		"ID": 151,
		"title": "Registration",
		"description": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et magna eget massa faucibus euismod a in turpis. Quisque sit amet risus posuere, ornare nisl facilisis, semper odio. Mauris ullamcorper et eros a malesuada. Pellentesque rutrum ex non aliquet commodo. Proin pharetra est venenatis erat efficitur commodo. Sed eu nulla ante. Curabitur tempus congue lacus. Vivamus enim diam, lacinia sit amet magna eget, efficitur convallis quam.</p>",
		"date": 1477958400,
		"startTime": "09:00",
		"endTime": "09:30"
	},
	{
		"ID": 152,
		"title": "TED Talk",
		"description": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et magna eget massa faucibus euismod a in turpis. Quisque sit amet risus posuere, ornare nisl facilisis, semper odio. Mauris ullamcorper et eros a malesuada. Pellentesque rutrum ex non aliquet commodo. Proin pharetra est venenatis erat efficitur commodo. Sed eu nulla ante. Curabitur tempus congue lacus. Vivamus enim diam, lacinia sit amet magna eget, efficitur convallis quam.</p>",
		"date": 1477958400,
		"startTime": "09:30",
		"endTime": "10:30"
	}
]

export {data};
```

