#include "../include/Sensor/dht11.h"


DHT dht(DHTPIN, DHTTYPE);
float temperature = 0;
float humidity = 0;

void readDHT11(){
    dht.begin();
    temperature= dht.readTemperature();
    humidity = dht.readHumidity();

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
/** READ DHT11 SENSOR */
void TaskTemperature(void *pvParameters) {
    while (true)
    {
        readDHT11();
        vTaskDelay(10000/portTICK_PERIOD_MS);
    }
    
}