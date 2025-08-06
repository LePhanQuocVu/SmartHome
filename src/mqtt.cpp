#include "../include/global.h"

const char* mqtt_server = "85833738f7d240b29144c046a83534f0.s1.eu.hivemq.cloud";
const char* mqtt_username = "iot_home";
const char* mqtt_password = "Quocvu2002@";
const int  mqtt_port = 8883;

const char* root_ca PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRGPgu2OCiwAwDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4
WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu
ZXQgU2VjdXJpdHkgUmVzZWFyY2ggR3JvdXAxFTATBgNVBAMTDElTUkcgUm9vdCBY
MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK3oJHP0FDfzm54rVygc
h77ct984kIxuPOZXoHj3dcKi/vVqbvYATyjb3miGbESTtrFj/RQSa78f0uoxmyF+
0TM8ukj13Xnfs7j/EvEhmkvBioZxaUpmZmyPfjxwv60pIgbz5MDmgK7iS4+3mX6U
A5/TR5d8mUgjU+g4rk8Kb4Mu0UlXjIB0ttov0DiNewNwIRt18jA8+o+u3dpjq+sW
T8KOEUt+zwvo/7V3LvSye0rgTBIlDHCNAymg4VMk7BPZ7hm/ELNKjD+Jo2FR3qyH
B5T0Y3HsLuJvW5iB4YlcNHlsdu87kGJ55tukmi8mxdAQ4Q7e2RCOFvu396j3x+UC
B5iPNgiV5+I3lg02dZ77DnKxHZu8A/lJBdiB3QW0KtZB6awBdpUKD9jf1b0SHzUv
KBds0pjBqAlkd25HN7rOrFleaJ1/ctaJxQZBKT5ZPt0m9STJEadao0xAH0ahmbWn
OlFuhjuefXKnEgV4We0+UXgVCwOPjdAvBbI+e0ocS3MFEvzG6uBQE3xDk3SzynTn
jh8BCNAw1FtxNrQHusEwMFxIt4I7mKZ9YIqioymCzLq9gwQbooMDQaHWBfEbwrbw
qHyGO0aoSCqI3Haadr8faqU9GY/rOPNk3sgrDQoo//fb4hVC1CLQJ13hef4Y53CI
rU7m2Ys6xt0nUW7/vGT1M0NPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNV
HRMBAf8EBTADAQH/MB0GA1UdDgQWBBR5tFnme7bl5AFzgAiIyBpY9umbbjANBgkq
hkiG9w0BAQsFAAOCAgEAVR9YqbyyqFDQDLHYGmkgJykIrGF1XIpu+ILlaS/V9lZL
ubhzEFnTIZd+50xx+7LSYK05qAvqFyFWhfFQDlnrzuBZ6brJFe+GnY+EgPbk6ZGQ
3BebYhtF8GaV0nxvwuo77x/Py9auJ/GpsMiu/X1+mvoiBOv/2X/qkSsisRcOj/KK
NFtY2PwByVS5uCbMiogziUwthDyC3+6WVwW6LLv3xLfHTjuCvjHIInNzktHCgKQ5
ORAzI4JMPJ+GslWYHb4phowim57iaztXOoJwTdwJx4nLCgdNbOhdjsnvzqvHu7Ur
TkXWStAmzOVyyghqpZXjFaH3pO3JLF+l+/+sKAIuvtd7u+Nxe5AW0wdeRlN8NwdC
jNPElpzVmbUq4JUagEiuTDkHzsxHpFKVK7q4+63SM1N95R1NbdWhscdCb+ZAJzVc
oyi3B43njTOQ5yOf+1CceWxG1bQVs5ZufpsMljq4Ui0/1lvh+wjChP4kqKOJ2qxq
4RgqsahDYVvTH9w7jXbyLeiNdd8XM2w9U/t7y0Ff/9yi0GE44Za4rF2LN9d11TPA
mRGunUHBcnWEvgJBQl9nJEiU0Zsnvgc/ubhPgXRR4Xq37Z0j4r7g1SgEEzwxA57d
emyPxgcYxn/eR44/KJ4EBs+lVDR3veyJm+kXQ99b21/+jh5Xos1AnX5iItreGCc=
-----END CERTIFICATE-----
)EOF";


PubSubClient client(espclient);

unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE	(50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

/**INIT  MQTTT */
void mqttInit() {
    
    espclient.setCACert(root_ca);
    client.setServer(mqtt_server,8883);
    client.setCallback(callback);

}

bool isMqttConnected() {
  return client.connected() == true;
}

/**CALLBACK MESSAGE*/
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");

  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
  /** LED TEST */
  if(strcmp(topic, "iot_home/led_state") == 0) {
    Serial.print("\nReceive on topic:");
    Serial.print(topic); 
    // push to queue task led
    if ((char)payload[0] == '1') {
      digitalWrite(LED_PIN,LOW);   // Turn the LED on (Note that LOW is the voltage level

    } else {
      digitalWrite(LED_PIN, HIGH);  // Turn the LED off by making the voltage HIGH
    }
  } else if(strcmp(topic, "iot_home/fan_state") == 0)  {
    // push to queue fan 
    if ((char)payload[0] == '1') {
        //turn fan
    } else {
      // off fan
    }
  }
  else if(strcmp(topic, "iot_home/connectMode") == 0)
  {
      Serial.print("Current mode: ");
      Serial.print(currentMode);
      /** convert to Auto Mode */
      BaseType_t xStatus; 
     uint8_t lValueToSend = payload[0] - '0';
      xStatus = xQueueSendToBack(xMqttQueue, &lValueToSend,0);
      if(xStatus != pdPASS) {
        Serial.print("/nErrror\r\n");
      } else {
        Serial.print("\nSuccess send to Queue\r\n");
      }
    }
  }


/*CONNECT TO MQTT */
void reconnect() {
  while (!isMqttConnected()) {
    Serial.print("reconnect...");
    String clientId = "device1";
    clientId += String(random(0xffff), HEX);
    printf("\nClientID: %s", clientId);
    if(client.connect(clientId.c_str(),mqtt_username, mqtt_password)) {
      Serial.println("\nMQTTconnected");
      /* Subscribe to the MQTT TOPIC*/
      client.subscribe("iot_home/led_state");
      client.subscribe("iot_home/fan_state");
      client.subscribe("iot_home/connectMode");
    } else {
      Serial.println(WiFi.localIP());
      Serial.print("failed, rc=");
      Serial.print(client.state());
      vTaskDelay(5000/portTICK_PERIOD_MS);
    }
  }
}
/* RECONNECT WHEN NEEDED*/
void reconnectIfNeed() {
  if(!isMqttConnected()) {
    reconnect();
  }
}
/**PUBLIC MESSAGE */
void publicMessage(const char* topic, String payload,boolean retained) {
  if(client.publish(topic, payload.c_str(),true)) {
    Serial.println("Public success to topic[" + String(topic) + "]: " +payload);
  }
}

/**MQTT TASK */
void mqttConnectTask(void *pvParameter) {
  while(true) {
    reconnectIfNeed();
    vTaskDelay(5000/portTICK_PERIOD_MS); // keep alive with MQTT
  }
}

void mqttCallbackTask(void *pvParamter) {
  while(1) {
    client.loop();
    vTaskDelay(100/portTICK_PERIOD_MS);
  }
}
