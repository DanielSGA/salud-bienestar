### Deploy to Heroku using Heroku CLI

Para hacer el deploy de la versión actual del proyecto a Heroku para que se refleje en el servidor y en el dominio es necesario seguir los siguientes pasos:

1. Hacer merge a **master** de todos los nuevos cambios en la **working-branch**
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