#ifndef DHT11_H
#define DHT11_H


#include "DHT.h"


#define DHTPIN 14 // D4 = GPIO14
#define DHTTYPE DHT11   // DHT11


extern DHT dht;
extern float temperature;
extern float humidity;

void readDHT11();

void TaskTemperature(void *pvParameters);

#endif