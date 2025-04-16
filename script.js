const ros = new ROSLIB.Ros({
    url: 'ws://127.0.0.1:9090'
  });
  
  ros.on('connection', () => {
    document.getElementById('status').innerText = '✅ Connected to TurtleBot3!';
    log('Connected to ROSBridge WebSocket');
  });
  
  ros.on('error', (error) => {
    document.getElementById('status').innerText = '❌ Connection error';
    log('Connection error: ' + error);
  });
  
  ros.on('close', () => {
    document.getElementById('status').innerText = '🔌 Disconnected';
    log('Connection closed');
  });
  
  const cmdVel = new ROSLIB.Topic({
    ros: ros,
    name: '/cmd_vel',
    messageType: 'geometry_msgs/msg/Twist'
  });
  
  const odomListener = new ROSLIB.Topic({
    ros: ros,
    name: '/odom',
    messageType: 'nav_msgs/msg/Odometry'
  });
  
  odomListener.subscribe((message) => {
    const pos = message.pose.pose.position;
    document.getElementById('odomStatus').innerText =
      `Position: x=${pos.x.toFixed(2)}, y=${pos.y.toFixed(2)}`;
  });
  
  let linearSpeed = parseFloat(document.getElementById('linearSpeed').value);
  let angularSpeed = parseFloat(document.getElementById('angularSpeed').value);
  
  function updateSpeedInputs() {
    linearSpeed = parseFloat(document.getElementById('linearSpeed').value);
    angularSpeed = parseFloat(document.getElementById('angularSpeed').value);
  }
  
  function move(direction) {
    let linear = 0.0;
    let angular = 0.0;
  
    linearSpeed = parseFloat(document.getElementById('linearSpeed').value);
    angularSpeed = parseFloat(document.getElementById('angularSpeed').value);
  
    switch (direction) {
      case 'forward': linear = linearSpeed; break;
      case 'backward': linear = -linearSpeed; break;
      case 'left': angular = angularSpeed; break;
      case 'right': angular = -angularSpeed; break;
      case 'stop': linear = 0.0; angular = 0.0; break;
    }
  
    const twist = new ROSLIB.Message({
      linear: { x: linear, y: 0.0, z: 0.0 },
      angular: { x: 0.0, y: 0.0, z: angular }
    });
  
    cmdVel.publish(twist);
    log(`Command: ${direction} | Linear: ${linear.toFixed(2)}, Angular: ${angular.toFixed(2)}`);
  }
  
  function log(msg) {
    const logBox = document.getElementById('log');
    const timestamp = new Date().toLocaleTimeString();
    logBox.textContent += `[${timestamp}] ${msg}\n`;
    logBox.scrollTop = logBox.scrollHeight;
  }
  
  document.addEventListener('keydown', (e) => {
    switch (e.key.toLowerCase()) {
      case 'arrowup':
      case 'w': move('forward'); break;
      case 'arrowdown':
      case 's': move('backward'); break;
      case 'arrowleft':
      case 'a': move('left'); break;
      case 'arrowright':
      case 'd': move('right'); break;
      case ' ':
      case 'x': move('stop'); break;
    }
  });
  