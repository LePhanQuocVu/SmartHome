#include <Arduino.h>
#include "global.h"

TaskHandle_t autoTempHandle = NULL;
TaskHandle_t readSensorHandle = NULL;

void fsmTask(void *pvParameters) {
    while (true)
    {
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
      vTaskDelay(5000/portTICK_PERIOD_MS);  
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
  xTaskCreate(wifiMonitorTask, "ReconnectWifi", 4096, NULL,2,NULL);
  xTaskCreate(mqttConnectTask, "ConnectMQTT", 8192, NULL,2, NULL);
  xTaskCreate(mqttCallbackTask, "mqttCallback", 2048,NULL, 2, NULL);
  xTaskCreate(readSensorTask, "ReadDHT11", 2048, NULL,1,NULL);
  xTaskCreate(displayOledTask,"Oled",2048, NULL,1,NULL );
  xTaskCreate(fsmTask, "fsmMachine",2048,NULL,3,NULL);
  xTaskCreate(autoTempTask, "autoTemp", 1024, NULL,1,&autoTempHandle);
  }

void loop() {
  
    
}
