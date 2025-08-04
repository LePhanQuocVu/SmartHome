#include "../include/global.h"

DHT dht(DHTPIN, DHTTYPE);
float temperature = 0;
float humidity = 0;

void readDHT11(){
    dht.begin();
    if(xSemaphoreTake(xMutex, portMAX_DELAY)) {
        temperature= dht.readTemperature();
        humidity = dht.readHumidity();
        xSemaphoreGive(xMutex);
        // Check if any reads failed and exit early (to try again).
        if (isnan(humidity) || isnan(temperature)) {
            Serial.println(F("Failed to read from DHT sensor!"));
            return;
        }   
        Serial.print(F("%\nTemperature: "));
        Serial.print(temperature);
        Serial.print(F("\nHumidity: "));
        Serial.print(humidity);
    }

}
void autoTempTask(void *pvParameter) {
   while (true)
   {
    Serial.println("\nAtuo TempTask is running!\n");
     {
        if(temperature < 30) {
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