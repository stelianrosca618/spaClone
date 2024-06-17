import { useState, useEffect } from "react";
import mqtt from "mqtt";

const MqttServe = () => {
  const [mqttClient, setMqttClient] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState({
    device_id: '12345',
    device_status: 'off',
    temperature: 50.0,
  });
  const [tempSliderValue, setTempSliderValue] = useState(50.0);
  const [inputDeviceId, setInputDeviceId] = useState('');

  useEffect(() => {
    const brokerUrl = 'wss://broker.emqx.io:8084/mqtt';
    const client = mqtt.connect(brokerUrl);

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      setMqttClient(client);
    });

    client.on('message', (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);

      if (topic === '/device_info') {
        const newDeviceInfo = JSON.parse(message.toString());
        setDeviceInfo((prevDeviceInfo) => {

          return prevDeviceInfo.device_id === inputDeviceId ? newDeviceInfo : prevDeviceInfo;
        });

      
        setTempSliderValue((prevTemp) => {
          return deviceInfo.device_id === inputDeviceId ? newDeviceInfo.temperature : prevTemp;
        });
      }

      if (topic === '/device_control') {
        const controlData = JSON.parse(message.toString());
        setDeviceInfo(controlData);
        setTempSliderValue(controlData.temperature);
      }
    });

    client.subscribe('/device_info');
    client.subscribe('/device_control');

    return () => {
      if (client) {
        client.end();
        console.log('Disconnected from MQTT broker');
      }
    };
  }, [inputDeviceId]); 

  const handleTurnOnDevice = () => {
    if (mqttClient) {
      const topic = '/device_info';
      const newDeviceInfo = { ...deviceInfo, device_status: 'on' };

      mqttClient.publish(topic, JSON.stringify(newDeviceInfo));
      console.log(`Published message on topic ${topic}: ${JSON.stringify(newDeviceInfo)}`);

      const controlTopic = '/device_control';
      mqttClient.publish(controlTopic, JSON.stringify(newDeviceInfo));
      console.log(`Published message on topic ${controlTopic}: ${JSON.stringify(newDeviceInfo)}`);
    }
  };

  const handleTurnOffDevice = () => {
    if (mqttClient) {
      const topic = '/device_info';
      const newDeviceInfo = { ...deviceInfo, device_status: 'off' };

      mqttClient.publish(topic, JSON.stringify(newDeviceInfo));
      console.log(`Published message on topic ${topic}: ${JSON.stringify(newDeviceInfo)}`);

      const controlTopic = '/device_control';
      mqttClient.publish(controlTopic, JSON.stringify(newDeviceInfo));
      console.log(`Published message on topic ${controlTopic}: ${JSON.stringify(newDeviceInfo)}`);
    }
  };

  const handleTemperatureChange = (e) => {
    setTempSliderValue(parseFloat(e.target.value));
  };

  const handleTemperaturePublish = () => {
    if (mqttClient) {
      const topic = '/device_control';
      const newDeviceInfo = { ...deviceInfo, temperature: tempSliderValue };
      mqttClient.publish(topic, JSON.stringify(newDeviceInfo));
      console.log(`Published message on topic ${topic}: ${JSON.stringify(newDeviceInfo)}`);
    }
  };

  const handleConnectToDevice = () => {

    if (mqttClient && inputDeviceId === deviceInfo.device_id) {
      console.log('Connected to device with ID:', inputDeviceId);
    } else {
      console.log('Device ID does not match current device.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <p>Device ID: {deviceInfo.device_id}</p>

      <div>
        <input
          type="text"
          value={inputDeviceId}
          onChange={(e) => setInputDeviceId(e.target.value)}
          placeholder="Enter Device ID"
          style={{ margin: '10px', padding: '10px' }}
        />
        <button onClick={handleConnectToDevice} style={{ margin: '10px', padding: '10px' }}>
          Connect to Device
        </button>
      </div>

      <div>
        <button
          onClick={handleTurnOnDevice}
          style={{
            margin: '10px',
            padding: '10px',
            backgroundColor: deviceInfo.device_status === 'on' ? 'green' : 'white',
            color: deviceInfo.device_status === 'on' ? 'white' : 'black',
            borderRadius: '8px',
          }}
        >
          Turn On Device
        </button>
        <button
          onClick={handleTurnOffDevice}
          style={{
            margin: '10px',
            padding: '10px',
            backgroundColor: deviceInfo.device_status === 'off' ? 'red' : 'white',
            color: deviceInfo.device_status === 'off' ? 'white' : 'black',
            borderRadius: '8px',
          }}
        >
          Turn Off Device
        </button>
      </div>

      <div>
        <label>Temperature: {tempSliderValue} °C</label>
        <br />
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={tempSliderValue}
          onChange={handleTemperatureChange}
          onMouseUp={handleTemperaturePublish}
        />
      </div>
    </div>
  );
}

export default MqttServe;