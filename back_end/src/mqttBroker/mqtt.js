import mqtt from 'mqtt';


const options = {
  protocol: 'mqtts',
  host: '85833738f7d240b29144c046a83534f0.s1.eu.hivemq.cloud',
  port: 8883,
  ca: [fs.readFileSync('/path/to/ca.crt')],
  cert: fs.readFileSync('/path/to/client.crt'),
  key: fs.readFileSync('/path/to/client.key'),
};

const client = mqtt.connect(options);


client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message}`);
});


client.publish('iot_home/led_state', '1', { retain: true }, (err) => {
  if (err) {
    console.error('Failed to publish message:', err);
  } else {
    console.log('Message published with retain flag set to true');
  }
});