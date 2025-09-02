#include <Arduino.h>
#include "global.h"

TaskHandle_t autoTempHandle = NULL;
TaskHandle_t readSensorHandle = NULL;

void fsmTask(void *pvParameters) {
    uint8_t xValueReceive;
    BaseType_t xStatus;
    const TickType_t xTicksToWait = portMAX_DELAY;
    while (true)
    { 
      if(uxQueueMessagesWaiting(xMqttQueue) != 0) {
        Serial.print("Queue empty!");
      }
      xStatus = xQueueReceive(xMqttQueue, &xValueReceive, xTicksToWait);
      if(xStatus == pdPASS) {
            Serial.print("Receive:  ");
            Serial.print(xValueReceive);
            currentMode = (xValueReceive == 0) ? NORMAL : AUTO;
            Serial.printf("\nfsmTaskRunning!\n");
            switch (currentMode)
            {
              case NORMAL:
              Serial.print("\nRunning on Normal Mode\r\n");
                if (autoTempHandle != NULL)
                  vTaskSuspend(autoTempHandle);
                break;
              case AUTO:
                Serial.print("\nRunning on Auto Mode\r\n");
                if (autoTempHandle != NULL)
                  vTaskResume(autoTempHandle);
                break;
              default:
                break;
            }
      } else {
          Serial.print("Could'n receive from queue!");
      }
    }
}

void vTestTask(void *pvParameters) {
  const char* pvTaskName = "Task Test";
  const int data = (int) pvParameters;
      for(;;) {
        Serial.print("\nData: ");
        Serial.print(data);
        Serial.println();
        vTaskDelay(2000/portTICK_PERIOD_MS);
  }
}

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);
  initOled();
  connectWifi();
  mqttInit();
  initServo;
  xTaskCreate(wifiMonitorTask, "ReconnectWifi", 4096, NULL,2,NULL);
  xTaskCreate(mqttConnectTask, "ConnectMQTT", 8192, NULL,2, NULL);
  xTaskCreate(mqttCallbackTask, "mqttCallback", 2048,NULL, 2, NULL);
  xTaskCreate(readSensorTask, "ReadDHT11", 2048, NULL,1,NULL);
  xTaskCreate(displayOledTask,"Oled",2048, NULL,1,NULL );
  xTaskCreate(fsmTask, "fsmMachine",2048,NULL,3,NULL);
  xTaskCreate(autoTempTask, "autoTemp", 1024, NULL,1,&autoTempHandle);
  xTaskCreate(servoControlTask, "controlServo", 2048, NULL,2, NULL);
  xTaskCreate(handleDistanceTask, "ulSensorTask", 2048, NULL, 2, NULL);
  }

void loop() {
  
}
