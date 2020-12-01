# App de Salud y Bienestar

El proyecto es una aplicación web responsiva con el propósito de brindar a comunidades de bajos recursos servicios de consulta del sector de la salud. Además de información relacionada al cuidado de la salud y bienestar utilizando contenido multimedia y artículos informativos. El objetivo principal de la plataforma web es la de proporcionar tanto a los profesionales de la salud como a los pacientes la oportunidad de agendar consultas médicas por videollamada a precios accesibles. Esta aplicación permitirá a los usuarios consultar médicos de diferentes áreas, seleccionar el que mejor se ajuste a sus necesidades y agendar citas con ellos en base a la disponibilidad del profesional de salud. 


### Client Details

| Name               | Email                     | Role     |
| ------------------ | ------------------------- | -------- |
| Adrian Alvarez     | alvarezprosalud@gmail.com | Fundador |


### The team

| Name           | Email             | Role        |
| -------------- | ----------------- | ----------- |
| Jorge Arturo Méndez Vargas | a01176369@itesm.mx | Scrum Master |
| Daniel Alejandro Saldaña García | a00818923@itesm.mx | Product Owner Proxy |
| Albán Aguilar Campos  | a00818811@itesm.mx | Admin de Proyecto |

### Technology Stack
| Technology    | Version      |
| ------------- | -------------|
| HTML          | 5.2          |
| CSS           | 2.1          |
| JavaScript    | 1.8.5        |
| NodeJS        | 12.18.4      |
| MongoDB       | 4.4.1        |
| Express       | 4.17.1       |
| jQuery        | 3.5.1        |
| body-parser   | 1.19.0       |
| bcrypt        | 5.0.0        |
| Bootstrap     | 4.4          |
| Calendly      | Pro          |

### Management tools

* [Github repo](https://github.com/ProyectoIntegrador2018/salud-bienestar)
* [Trello](https://trello.com/b/euxPNbrG/balance-innovation)
* [Heroku](https://dashboard.heroku.com/apps/med-conecta)
* [Documentation](https://teams.microsoft.com/_#/school/files/Equipo%202.05%20-%20Balance%20Innovation?threadId=19:e25d83dca1fe4c4ebd22f7dfbcfbe300@thread.tacv2&ctx=channel)

## Development

### Setup del proyecto

Para instalar y hacer el setup del proyecto sigue los pasos de instalación y clonación:

1. Instala npm en tu computadora:
```bash
$ brew install npm
```

2. Clona este repositorio a tu computadora

```bash
$ gh repo clone ProyectoIntegrador2018/salud-bienestar
```

3. Abre la terminal y corre el siguiente comando para instalar las librerías necesitadas para el proyecto

```bash
$ npm install
```

4. Ahora corre el siguiente comando para comenzar el proyecto en localhost:8080

```
% npm start
```


### Detener el proyecto

Para detener todo el proyecto corriendo en localhost:8080 es necesario pulsar la combinación de teclas **ctrl + c** o **command + c**

```
% ctrl + c
```


### Deploy to Heroku using Heroku CLI

Para hacer el deploy de la versión actual del proyecto a Heroku para que se refleje en el servidor y en el dominio es necesario seguir los siguientes pasos:

1. Hacer merge a master de todos los nuevos cambios en la working-branch
2. Instalar Heroku CLI de la página de Heroku
3. Cambiar de branch a Master
```bash
$ git checkout master
```
4. Agregar los cambios a la branch Heroku Master
```bash
$ git add .
```
5. Hacer commit de los cambios con su comentario
```bash
$ git commit -am "Comentario"
```
6. Hacer deploy a Heroku
```bash
$ git push heroku master
```

### Debugging

Si ya se tiene instalado npm y ya se hizo el install, sólo corre el siguiente comando para ver errores en el sistema que se desplegarán en la terminal:

```
% npm start
```
