# 🐢 TurtleBot3 Web Control Interface

A responsive web-based interface to control a TurtleBot3 robot using ROS 2 and ROSBridge. This dashboard allows you to drive the robot, view its camera feed, monitor odometry, and adjust speed settings—all from a browser.

## 🎥 Demo Video

<a href="https://www.youtube.com/watch?v=_MS_qQtVF6o" target="_blank">
  <img src="https://github.com/SV1208/Web-based-control-of-simulated-Turtlebot3-in-Gazebo/blob/main/web-based-controller.png" alt="Web Control of Simulated Turtlebot3 in Gazebo"/>
</a>

---

## 📦 Tech Stack

- **Frontend:**  
  - HTML5, CSS3, Vanilla JavaScript  
  - Responsive design using Flexbox
  
- **Backend / ROS Integration:**  
  - ROS 2 (Tested on Humble Hawksbill)  
  - `rosbridge_server` for WebSocket communication  
  - `roslibjs` for interacting with ROS topics over WebSockets  
  - TurtleBot3-specific topics: `/cmd_vel`, `/odom`, `/camera/image_raw`

---

## 🖥 Features

- ✅ Directional control buttons (⬆️⬅️⏹➡️⬇️)
- ✅ Adjustable linear and angular velocity
- ✅ Live odometry data (`/odom`)
- ✅ MJPEG camera stream (`/camera/image_raw`)
---

## 🚀 To Set it up

- **Ubuntu 22.04** (or compatible) with **ROS 2 Humble**
- **TurtleBot3 Gazebo** properly set up
  Launch Turtlebot3 in your desired world
  
  ```bash
  ros2 launch turtlebot3_gazebo turtlebot3_house.launch.py
  ```
  
- Setup the **rosbridge_server** :
  If you do not have rosbridge-server package, install it via following command
  ```bash
  sudo apt install ros-humble-rosbridge-server
  ```
  and then start the rosbridge-server
  ```bash
  ros2 launch rosbridge_server rosbridge_websocket.launch.xml
  ```
  
- Setup the **web_video_server**:
   If you do not have web_video_server package, install it via following command
  ```bash
  sudo apt install ros-humble-web-video-server
  ```
  and then run the web_video_server node
  ```bash
  ros2 run web_video_server web_video_server
  ```
- And then open **index.html** in your browser
