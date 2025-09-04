#include "../include/global.h"

int gasValue = 0;
void readGasAnalogTask(void *pvParameter) {
    while (true) 
    {
         gasValue = analogRead(GAS_SENSOR_PIN);
        float voltage = gasValue * (3.3 / 4095.0); // đổi sang Volt nếu cần
    
         Serial.printf("ADC=%d  Voltage=%.2fV\n", gasValue, voltage);
        BaseType_t xStatus;
        uint8_t value = 1;
        if(gasValue > THRESS_HOLD_GAS) {
            xStatus = xQueueSendToBack(xGasControlQueue, &value,0);
            if(xStatus != pdPASS) {
                Serial.print("/nErrror\r\n");
            } else{ 
                Serial.print("\nSuccess send to Queue\r\n");
            }
        } else {
            // an toan
        }
        vTaskDelay(1000/portTICK_PERIOD_MS);
    }
    
}

void gasNotifyTask(void *pvParameter) {
    BaseType_t xStatus;
    uint8_t xValueReceive;
    TickType_t xTicktoWait = portMAX_DELAY;
    while (true)
    {
        if(uxQueueMessagesWaiting(xGasControlQueue) == 0) {
            Serial.print("Queue empty!");
        } 
        xStatus = xQueueReceive(xGasControlQueue, &xValueReceive, portMAX_DELAY);
         if(xStatus == pdPASS) {
            Serial.print("\nPhat hien khi gas\n");
            Serial.print("\nReceive success value: ");
            Serial.print(xValueReceive);
            Serial.println();
            if(xValueReceive != 0) {
                // control buzzzy 
                BeepBuzzer();  
                // send notify to mqtt

            } else {
                EasyBuzzer.stopBeep();
            }
        }
    }
    
}
