#ifndef DHT11_H
#define DHT11_H

#include "DHT.h"
#include "../include/global.h"
#define DHTTYPE DHT11   // DHT11

extern DHT dht;
extern float gTemperature;
extern float gHumidity;

void readDHT11();

void autoTempTask(void *pvParameters);
void handleTemperatureTask(void * pvParameters);
void readSensorTask(void *pvParameter);

#endif