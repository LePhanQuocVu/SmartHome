#include "../include/global.h"

DHT dht(DHT_PIN, DHTTYPE);
float gTemperature = 0;
float gHumidity = 0;

void readDHT11(){
    dht.begin();
    if(xSemaphoreTake(xMutex, portMAX_DELAY)) {
        gTemperature= dht.readTemperature();
        gHumidity = dht.readHumidity();
        xSemaphoreGive(xMutex);
        // Check if any reads failed and exit early (to try again).
        if (isnan(gHumidity) || isnan(gTemperature)) {
            Serial.println(F("Failed to read from DHT sensor!"));
            return;
        }   
        Serial.print(F("%\nTemperature: "));
        Serial.print(gTemperature);
        Serial.print(F("\nHumidity: "));
        Serial.print(gHumidity);
    }

}
void autoTempTask(void *pvParameter) {
    float temp;
   while (true)
   {
    Serial.println("\nAtuo TempTask is running!\n");
    if(xSemaphoreTake(xMutex, portMAX_DELAY)) {
        temp = gTemperature;
        xSemaphoreGive(xMutex);
         if(temp < 30) {
            //turn on LED
            digitalWrite(LED_PIN, HIGH);
        } else {
            // turn off 
            digitalWrite(LED_PIN, LOW);
        }
    }
    vTaskDelay(2000/portTICK_PERIOD_MS);
   }
}
/** READ DHT11 SENSOR */
void readSensorTask(void *pvParameters) {
    while (true)
    {   
        Serial.print("\nTask readh dht11 running!\n");
        readDHT11();
        vTaskDelay(10000/portTICK_PERIOD_MS);
    }
    
}