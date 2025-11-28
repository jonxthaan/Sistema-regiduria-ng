# Sistema De Gestión de desfiles y eventos en Salina Cruz

Sistema para Gestión de Desfiles, Convocatorias, Avisos y Logística en Mapa

## Requerimientos para la ejecución

Para editar, compilar y ejecutar la aplicación web es necesario contar con los siguientes requisistos:

- Visual Studio Code ( y tener descargadas las extensiones "Spring Boot Extension Pack", "Maven for java", "Extension packs for java" y "Angular language service")
- Un navegador Web
- Mysql Workbench
- JDK 21
  

## ¿Como ejecutar el código?
```bash
PASO 1: Descargar el zip del código.
```
```bash
PASO 2: Descomprimir el archivo.
```
```bash
PASO 3: Abrir la carpeta descomprimida en Visual Studio Code
```
```bash
PASO 4: En Visual Studio Code desplegar la carpeta add, seguido de la carpeta src, después la carpeta main y finalmente la carpeta java\ com\ regiduria\ app, y alli buscar el archivo AppAplication.java, el cual se va a compilar para iniciar el servidor de Srpingboot y consumir la Api.
```
```bash
PASO 5: En el explorador de Visual Studio Code (Donde se encuentran las carpetas), hay que presionar clic derecho, seleccionar el boton de abrir personal, e introducir las siguientes lineas de comandos:
- npm install
- ng serve
De esta manera, se activará el servidor de Angular para mostrar la aplicación web.
```
```bash
PASO 6: Abrir workbench y conectar a mysql para que la base de datos previamente descargada y agregada allí, esté en funcionamiento.
```
```bash
PASO:7 Finalmente hay que abrir el navegador y escribir la siguiente url: http://localhost:4200 (La cuál mostrará a la alicación web en funcionamiento)
Esto se hace de esta manera debido a que es un proyecto en etapa de desarrollo y no cuenta con un dominio y un hosting.
```


## Documentación de Api

Se ha elaborado una documentación de la API utilizada para este proyecto, mientras tenga el servidor de springboot encendido, inserte en el navegador la siguiente url:

```bash
http://localhost:8080/swagger-ui/index.html#/
```


